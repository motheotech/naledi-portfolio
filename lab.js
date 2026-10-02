/* Naledi Motheo portfolio — simulation engine.
 * Depends on lab-data.js (TICKETS, CONSOLE, LIFECYCLE, NETWORK), i18n.js and site.js. */

(function () {
  'use strict';
  var t = NM.t, esc = NM.esc;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(id) { return document.getElementById(id); }
  function fmt(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  /* ============================================================ tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function show(id, focus) {
    tabs.forEach(function (tb) {
      var on = tb.getAttribute('aria-controls') === id;
      tb.setAttribute('aria-selected', on); tb.tabIndex = on ? 0 : -1;
      $(tb.getAttribute('aria-controls')).hidden = !on;
      if (on && focus) tb.focus();
    });
    if (history.replaceState) history.replaceState(null, '', '#' + id);
    if (id === 'console') setTimeout(function () { var i = $('con-input'); if (i) i.focus({ preventScroll: true }); }, 30);
  }
  tabs.forEach(function (tb, i) {
    tb.addEventListener('click', function () { show(tb.getAttribute('aria-controls')); });
    tb.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return; e.preventDefault();
      show(tabs[(i + d + tabs.length) % tabs.length].getAttribute('aria-controls'), true);
    });
  });
  var start = location.hash.replace('#', '');
  show($(start) && $(start).classList.contains('tabpanel') ? start : 'triage');

  /* ============================================================ triage */
  (function () {
    var root = $('triage-sim'); if (!root) return;
    var S = { i: 0, phase: 'q', pri: null, act: null, sec: 0, res: [] }, timer;
    var PRI = ['P1', 'P2', 'P3', 'P4'];

    function clock() {
      clearInterval(timer);
      if (S.phase !== 'q') return;
      timer = setInterval(function () { S.sec++; var c = $('tr-clock'); if (c) c.textContent = fmt(S.sec); }, 1000);
    }

    function render() {
      if (S.phase === 'end') return renderEnd();
      var k = TICKETS[S.i], fb = S.phase === 'fb';
      var priOk = S.pri === k.priority, actOk = S.act === k.correct;
      var h = '<div class="sim-bar"><span><span class="mono">' + k.id + '</span> &nbsp; ' + t('tr.count', { i: S.i + 1, n: TICKETS.length }) +
        '</span><span class="clock" id="tr-clock" aria-label="Elapsed">' + fmt(S.sec) + '</span></div><div class="sim-body">' +
        '<div class="sim-from">' + esc(k.from) + '</div><h4>' + esc(k.summary) + '</h4><p class="sim-detail">' + esc(k.detail) + '</p>' +
        '<fieldset><legend>' + t('tr.pri') + '</legend><div class="opts two">' +
        PRI.map(function (p) {
          var n = p.toLowerCase(), cls = '', mark = '';
          if (fb && p === k.priority) { cls = ' right'; mark = t('tr.right'); }
          else if (fb && p === S.pri) { cls = ' wrong'; mark = t('tr.pick'); }
          return '<button type="button" class="opt' + cls + '" data-pri="' + p + '" aria-pressed="' + (S.pri === p) + '"' + (fb ? ' disabled' : '') +
            '><span>' + t(n) + '<small>' + t(n + '.h') + '</small></span><span class="mark">' + mark + '</span></button>';
        }).join('') + '</div></fieldset>' +
        '<fieldset><legend>' + t('tr.act') + '</legend><div class="opts">' +
        k.actions.map(function (a) {
          var cls = '', mark = '';
          if (fb && a.id === k.correct) { cls = ' right'; mark = t('tr.right'); }
          else if (fb && a.id === S.act) { cls = ' wrong'; mark = t('tr.pick'); }
          return '<button type="button" class="opt' + cls + '" data-act="' + a.id + '" aria-pressed="' + (S.act === a.id) + '"' + (fb ? ' disabled' : '') +
            '><span>' + esc(a.text) + '</span><span class="mark">' + mark + '</span></button>';
        }).join('') + '</div></fieldset>';
      if (fb) h += '<div class="feedback" role="status"><div><b>' + (priOk ? t('tr.pri.ok') : t('tr.pri.no', { p: k.priority })) +
        '</b><p>' + esc(k.priorityWhy) + '</p></div><div><b>' + (actOk ? t('tr.act.ok') : t('tr.act.no')) + '</b><p>' + esc(k.actionWhy) + '</p></div></div>';
      h += '<div class="sim-actions">' + (fb
        ? '<button type="button" class="btn btn-solid" data-go="next">' + (S.i === TICKETS.length - 1 ? t('tr.results') : t('tr.next')) + '</button>'
        : '<button type="button" class="btn btn-solid" data-go="commit"' + (S.pri && S.act ? '' : ' disabled') + '>' + t('tr.commit') + '</button>') + '</div></div>';
      root.innerHTML = h;
    }

    function renderEnd() {
      var good = S.res.reduce(function (n, r) { return n + r.p + r.a; }, 0), total = S.res.length * 2;
      var times = S.res.map(function (r) { return r.s; }).sort(function (a, b) { return a - b; });
      var med = times[Math.floor(times.length / 2)] || 0;
      var v = good === total ? 'tr.v4' : good >= total * .75 ? 'tr.v3' : good >= total * .5 ? 'tr.v2' : 'tr.v1';
      root.innerHTML = '<div class="sim-bar"><span>' + t('tr.done') + '</span></div><div class="sim-body">' +
        '<div class="result-big"><div><strong>' + good + '/' + total + '</strong>' + t('tr.score') + '</div><div><strong>' + fmt(med) + '</strong>' + t('tr.median') + '</div></div>' +
        '<p class="sim-detail">' + t(v) + '</p><ul class="result-list">' +
        S.res.map(function (r, i) {
          return '<li><span><span class="mono">' + TICKETS[i].id + '</span>' + esc(TICKETS[i].summary) + '</span><span class="small">' +
            '<span class="tag ' + (r.p ? 'ok' : 'plan') + '">' + t('tr.priority') + '</span> <span class="tag ' + (r.a ? 'ok' : 'plan') + '">' + t('tr.action') + '</span></span></li>';
        }).join('') + '</ul><div class="sim-actions"><button type="button" class="btn btn-solid" data-go="again">' + t('tr.again') + '</button></div></div>';
    }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || b.disabled) return;
      if (b.dataset.pri) { S.pri = b.dataset.pri; render(); root.querySelector('[data-pri="' + S.pri + '"]').focus(); return; }
      if (b.dataset.act) { S.act = b.dataset.act; render(); root.querySelector('[data-act="' + S.act + '"]').focus(); return; }
      var go = b.dataset.go;
      if (go === 'commit') {
        var k = TICKETS[S.i];
        S.res.push({ p: S.pri === k.priority ? 1 : 0, a: S.act === k.correct ? 1 : 0, s: S.sec });
        S.phase = 'fb'; clock(); render();
        var f = root.querySelector('.feedback'); if (f) f.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
      } else if (go === 'next') {
        if (S.i === TICKETS.length - 1) S.phase = 'end';
        else { S.i++; S.pri = S.act = null; S.sec = 0; S.phase = 'q'; }
        clock(); render(); root.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
      } else if (go === 'again') {
        S = { i: 0, phase: 'q', pri: null, act: null, sec: 0, res: [] }; clock(); render();
      }
    });
    document.addEventListener('langchange', render);
    render(); clock();
  })();

  /* ============================================================ console */
  (function () {
    var body = $('con-body'), input = $('con-input'), chips = $('con-chips'); if (!body || !input) return;
    var hist = [], hi = -1, busy = false;
    var names = Object.keys(CONSOLE.commands).concat(['clear', 'history']);

    function line(text, cls) {
      var d = document.createElement('div'); d.className = 'ln' + (cls ? ' ' + cls : '');
      d.textContent = text === '' ? '\u00a0' : text;
      body.insertBefore(d, body.lastElementChild); body.scrollTop = body.scrollHeight;
    }
    function sleep(ms) { return new Promise(function (r) { setTimeout(r, reduced ? 0 : ms); }); }
    async function emit(out) {
      busy = true; input.disabled = true;
      for (var i = 0; i < out.length; i++) {
        var o = out[i], obj = typeof o === 'object';
        var txt = obj ? o.t : o;
        await sleep(obj && o.w ? o.w : txt === '' ? 10 : 38);
        line(txt, obj ? o.c : '');
      }
      busy = false; input.disabled = false; input.focus({ preventScroll: true });
    }
    async function run(raw) {
      var cmd = raw.trim(); line('naledi@motheo:~$ ' + cmd, 'cmd');
      hi = -1; if (!cmd) return;
      hist.unshift(cmd); hist = hist.slice(0, 40);
      var parts = cmd.split(/\s+/), name = parts[0].toLowerCase();
      name = CONSOLE.aliases[name] || name;
      if (name === 'clear') { Array.prototype.slice.call(body.querySelectorAll('.ln')).forEach(function (n) { n.remove(); }); return; }
      if (name === 'history') return emit(hist.slice(1).reverse().map(function (h, i) { return '  ' + (i + 1) + '  ' + h; }).concat(['']));
      if (name === 'lang') {
        var l = (parts[1] || '').toLowerCase();
        if (['en', 'st', 'zu'].indexOf(l) < 0) return emit([{ t: 'usage: lang en | st | zu', c: 'err' }, '']);
        NM.setLang(l); return emit([{ t: 'Language set: ' + { en: 'English', st: 'Sesotho', zu: 'isiZulu' }[l], c: 'ok' }, '']);
      }
      if (name === 'ping') {
        var host = parts[1] || 'outlook.office365.com';
        return emit([{ w: 200, t: 'Pinging ' + host + ' with 32 bytes of data:' },
          { w: 380, t: 'Reply from 52.97.146.' + (100 + host.length) + ': time=21ms TTL=116' },
          { w: 380, t: 'Reply from 52.97.146.' + (100 + host.length) + ': time=19ms TTL=116' },
          { w: 380, t: 'Reply from 52.97.146.' + (100 + host.length) + ': time=20ms TTL=116' },
          { t: '0% loss, average 20ms. (Simulated: no packets left your browser.)', c: 'ok' }, '']);
      }
      var fn = CONSOLE.commands[name];
      if (!fn) {
        var near = names.filter(function (n) { return n[0] === name[0]; })[0];
        return emit([{ t: 'command not found: ' + parts[0], c: 'err' }, near ? "did you mean '" + near + "'? Or type 'help'." : "type 'help' for the list", '']);
      }
      return emit(fn(parts.slice(1)));
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { if (busy) return; var v = input.value; input.value = ''; run(v); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (!hist.length) return; hi = Math.min(hi + 1, hist.length - 1); input.value = hist[hi]; }
      else if (e.key === 'ArrowDown') { e.preventDefault(); hi--; if (hi < 0) { hi = -1; input.value = ''; } else input.value = hist[hi]; }
      else if (e.key === 'Tab') {
        var p = input.value.trim().toLowerCase(); if (!p) return; e.preventDefault();
        var m = names.filter(function (n) { return n.indexOf(p) === 0; });
        if (m.length === 1) input.value = m[0];
        else if (m.length > 1) { line('naledi@motheo:~$ ' + p, 'cmd'); line('  ' + m.join('   ')); }
      } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); run('clear'); }
    });
    body.addEventListener('click', function () { if (!window.getSelection().toString()) input.focus(); });
    if (chips) chips.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || busy) return; run(b.textContent);
    });
    CONSOLE.boot.forEach(function (l) { line(l); });
  })();

  /* ============================================================ lifecycle */
  (function () {
    var root = $('lc-sim'); if (!root) return;
    var S;
    function reset(mode) {
      var flow = LIFECYCLE[mode];
      S = { mode: mode, done: [], warns: [], order: shuffle(flow.steps.map(function (s) { return s.id; })), msg: null };
      render();
    }
    function step(id) { return LIFECYCLE[S.mode].steps.filter(function (s) { return s.id === id; })[0]; }
    function render() {
      var flow = LIFECYCLE[S.mode], total = flow.steps.length, fin = S.done.length === total;
      var left = S.order.filter(function (id) { return S.done.indexOf(id) < 0; });
      var h = '<div class="sim-bar"><span class="lc-mode" role="group">' +
        '<button type="button" data-mode="join" aria-pressed="' + (S.mode === 'join') + '">' + t('lc.join') + '</button>' +
        '<button type="button" data-mode="leave" aria-pressed="' + (S.mode === 'leave') + '">' + t('lc.leave') + '</button></span>' +
        '<span class="mono">' + S.done.length + '/' + total + '</span></div><div class="sim-body">' +
        '<h4>' + esc(flow.name) + '</h4><div class="lc-progress"><i style="width:' + (S.done.length / total * 100) + '%"></i></div>' +
        '<div class="lc-grid"><div class="lc-col"><h5>' + (fin ? t('lc.fin') : t('lc.next')) + '</h5>';
      if (fin) {
        h += '<div class="lc-msg ' + (S.warns.length ? 'warn' : 'ok') + '" role="status"><b>' + t('lc.result', { n: total, m: S.warns.length }) + '</b>' +
          (S.warns.length ? t('lc.messy') : t('lc.clean')) + '</div>';
        if (S.warns.length) h += '<ul class="lc-done">' + S.warns.map(function (w) { return '<li><span>!</span>' + esc(w) + '</li>'; }).join('') + '</ul>';
        h += '<div class="sim-actions"><button type="button" class="btn btn-solid" data-go="restart">' + t('lc.restart') + '</button></div>';
      } else {
        h += '<div class="opts">' + left.map(function (id) {
          return '<button type="button" class="opt" data-step="' + id + '"><span>' + esc(step(id).t) + '</span></button>';
        }).join('') + '</div>';
        if (S.msg) h += '<div class="lc-msg ' + S.msg.k + '" role="status"><b>' + (S.msg.k === 'ok' ? t('lc.ok') : t('lc.no')) + '</b>' + esc(S.msg.t) + '</div>';
      }
      h += '</div><div class="lc-col"><h5>' + t('lc.done') + '</h5><ol class="lc-done">' +
        (S.done.length ? S.done.map(function (id, i) { return '<li><span>' + (i + 1) + '</span>' + esc(step(id).t) + '</li>'; }).join('')
          : '<li class="empty">' + t('lc.empty') + '</li>') + '</ol></div></div></div>';
      root.innerHTML = h;
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.mode) return reset(b.dataset.mode);
      if (b.dataset.go === 'restart') return reset(S.mode);
      var id = b.dataset.step; if (!id) return;
      var s = step(id), missing = s.needs.filter(function (n) { return S.done.indexOf(n) < 0; });
      if (missing.length) {
        S.msg = { k: 'warn', t: s.why };
        if (S.warns.indexOf(s.why) < 0) S.warns.push(s.why);
      } else { S.done.push(id); S.msg = null; }
      render();
      var first = root.querySelector('[data-step]') || root.querySelector('[data-go]'); if (first) first.focus({ preventScroll: true });
    });
    document.addEventListener('langchange', render);
    reset('join');
  })();

  /* ============================================================ network */
  (function () {
    var root = $('net-sim'); if (!root) return;
    var N = NETWORK, S;
    function newFault(avoid) {
      var keys = Object.keys(N.faults).filter(function (k) { return k !== avoid; });
      S = { key: keys[Math.floor(Math.random() * keys.length)], min: 0, marks: {}, run: [], log: [], fixed: false, link: null };
      S.log.push({ c: 'cmd', t: '# ' + t('net.start') });
      render();
    }
    function topo() {
      var w = 700;
      var h = '<svg viewBox="0 0 ' + w + ' 110" role="img" aria-label="Network path from lab PC to internet">';
      for (var i = 0; i < N.nodes.length - 1; i++) {
        var a = N.nodes[i], b = N.nodes[i + 1], id = a.id + '-' + b.id;
        var bad = S.link === id;
        h += '<line class="link' + (bad ? ' bad' : '') + '" x1="' + (a.x + 100) + '" y1="55" x2="' + b.x + '" y2="55"/>';
      }
      N.nodes.forEach(function (n) {
        var st = S.marks[n.id] || '';
        h += '<g class="node ' + st + '"><rect x="' + n.x + '" y="30" width="100" height="50" rx="6"/>' +
          '<text x="' + (n.x + 50) + '" y="52" text-anchor="middle">' + esc(n.label) + '</text>' +
          '<text class="sub" x="' + (n.x + 50) + '" y="68" text-anchor="middle">' + esc(n.sub) + '</text></g>';
      });
      return h + '</svg>';
    }
    function render() {
      var h = '<div class="sim-bar"><span>' + esc(N.title) + '</span><span>' + t('net.elapsed') + ' <span class="clock">' + S.min + ' min</span></span></div>' +
        '<div class="sim-body"><div class="topo">' + topo() + '</div><div class="net-grid"><div>' +
        '<div class="netlog" id="netlog" aria-live="polite">' + S.log.map(function (l) { return '<div class="' + (l.c || '') + '">' + esc(l.t) + '</div>'; }).join('') + '</div>' +
        (S.fixed ? '<div class="lc-msg ok" role="status"><b>' + t('net.fixed', { t: S.min + ' min', n: S.run.length }) + '</b>' + esc(N.faults[S.key].story) + '</div>' +
          '<div class="sim-actions"><button type="button" class="btn btn-solid" data-go="new">' + t('net.new') + '</button></div>' : '') +
        '</div><div><h5 style="margin-bottom:.6rem">' + t('net.tests') + '</h5><div class="tools">' +
        N.tests.map(function (x) {
          return '<button type="button" class="opt" data-test="' + x.id + '"' + (S.fixed ? ' disabled' : '') + (S.run.indexOf(x.id) > -1 ? ' aria-pressed="true"' : '') +
            '><span>' + esc(x.t) + '</span><span class="cost">' + x.min + ' min</span></button>';
        }).join('') + '</div><h5 style="margin:1.2rem 0 .6rem">' + t('net.fixes') + '</h5><div class="tools">' +
        N.fixes.map(function (x) {
          return '<button type="button" class="opt" data-fix="' + x.id + '"' + (S.fixed ? ' disabled' : '') + '><span>' + esc(x.t) + '</span><span class="cost">' + x.min + ' min</span></button>';
        }).join('') + '</div></div></div></div>';
      root.innerHTML = h;
      var lg = $('netlog'); if (lg) lg.scrollTop = lg.scrollHeight;
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || b.disabled) return;
      var f = N.faults[S.key];
      if (b.dataset.go === 'new') return newFault(S.key);
      if (b.dataset.test) {
        var x = N.tests.filter(function (q) { return q.id === b.dataset.test; })[0];
        S.min += x.min; if (S.run.indexOf(x.id) < 0) S.run.push(x.id);
        S.log.push({ c: 'cmd', t: '> ' + x.t });
        (f.r[x.id] || []).forEach(function (l) { S.log.push(typeof l === 'string' ? { t: l } : { t: l[0], c: l[1] }); });
        var mk = f.marks[x.id] || {}; Object.keys(mk).forEach(function (n) { S.marks[n] = mk[n]; });
        if (x.id === 'lights' && f.link === 'sw-core') S.link = 'sw-core';
        if (x.id === 'dash' && f.link === 'fw-isp') S.link = 'fw-isp';
      } else if (b.dataset.fix) {
        var fx = N.fixes.filter(function (q) { return q.id === b.dataset.fix; })[0];
        S.min += fx.min; S.log.push({ c: 'cmd', t: '> ' + fx.t });
        if (fx.id === f.fix) {
          S.fixed = true; S.link = null;
          N.nodes.forEach(function (n) { S.marks[n.id] = 'good'; });
          S.log.push({ c: 'good', t: 'Lab PCs pick up addresses and load pages. Ticket resolved.' });
        } else S.log.push({ c: 'bad', t: t('net.wrong', { t: fx.min + ' min' }) });
      }
      var key = b.dataset.test ? '[data-test="' + b.dataset.test + '"]' : '[data-go="new"]';
      render();
      if (window.matchMedia('(max-width:980px)').matches) { var lg2 = $('netlog'); if (lg2) lg2.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' }); }
      var again = root.querySelector(key) || root.querySelector('[data-go]'); if (again) again.focus({ preventScroll: true });
    });
    document.addEventListener('langchange', render);
    newFault();
  })();
})();
