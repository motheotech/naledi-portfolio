/* Naledi Motheo portfolio — shared behaviour.
 * Mobile menu, the live queue on the home page, credential copy buttons, the
 * work-history filter and the contact form. No frameworks, no build step. */

(function () {
  'use strict';
  var t = function (k, v) { return window.NM && NM.t ? NM.t(k, v) : k; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ------------------------------------------------------------ menu */
  var b = document.getElementById('burger'), m = document.getElementById('menu');
  if (b && m) b.addEventListener('click', function () {
    var open = m.classList.toggle('open');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* ------------------------------------------------------------ toast */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast'; toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }
  window.NM = window.NM || {}; NM.toast = toast; NM.esc = esc;

  /* ------------------------------------------------------------ live queue */
  var POOL = [
    { id: 'INC-4471', p: 'P1', sla: 60,
      en: ['SharePoint access denied, Finance (12 users)', 'Check Service Health and recent permission changes before touching the site. Twelve users with the same error is a scope question first.'],
      st: ['Phihlello ya SharePoint e hanwa, Ditjhelete (basebedisi ba 12)', 'Hlahloba Service Health le diphetoho tsa morao tjena tsa ditumello pele o ama saete. Basebedisi ba 12 ba nang le phoso e tshwanang ke potso ya bophara pele.'],
      zu: ['Ukufinyelela kwe-SharePoint kwenqatshiwe, Ezezimali (abasebenzisi abayi-12)', 'Hlola i-Service Health nezinguquko zakamuva zezimvume ngaphambi kokuthinta isayithi. Abasebenzisi abayi-12 abanephutha elifanayo kuwumbuzo wobubanzi kuqala.'] },
    { id: 'INC-4468', p: 'P2', sla: 240,
      en: ['Entra sign-in loop, 3 users', 'Read the sign-in logs for the failure reason. Three users at once usually points to a Conditional Access or MFA change, not three broken laptops.'],
      st: ['Ho kena ho Entra ho ipheta, basebedisi ba 3', 'Bala di-sign-in log ho fumana lebaka la ho hloleha. Basebedisi ba bararo ka nako e le nngwe hangata ba supa phetoho ya Conditional Access kapa MFA, e seng dilaptop tse tharo tse senyehileng.'],
      zu: ['Ukungena ku-Entra kuyaziphinda, abasebenzisi abayi-3', 'Funda ama-sign-in log ukuze uthole isizathu sokwehluleka. Abasebenzisi abathathu ngesikhathi esisodwa ngokuvamile bakhomba ushintsho lwe-Conditional Access noma lwe-MFA, hhayi amalaptop amathathu aphukile.'] },
    { id: 'INC-4463', p: 'P3', sla: 480,
      en: ['3CX handset not registering, reception', 'Check the switch port and PoE, then re-provision the extension. Reception stays on the softphone meanwhile, so nobody misses a call.'],
      st: ['Fono ya 3CX ha e ngodise, resepsheneng', 'Hlahloba port ya switch le PoE, ebe o hlophisa extension botjha. Resepsheneng ba sebedisa softphone nakong ena, ka hona ha ho ya fetwang ke mohala.'],
      zu: ['Ifoni ye-3CX ayibhalisi, e-reception', 'Hlola i-port ye-switch ne-PoE, bese uhlela kabusha i-extension. I-reception isebenzisa i-softphone okwamanje, ngakho akekho ophuthelwa ucingo.'] },
    { id: 'INC-4479', p: 'P2', sla: 240,
      en: ['Payroll mailbox at 96% of quota', 'Enable the online archive and set a retention policy. Raising the quota only moves the same ticket to next quarter.'],
      st: ['Mailbox ya Payroll e fihlile 96% ya quota', 'Bulela online archive mme o bee retention policy. Ho phahamisa quota ho mpa ho sutumetsetsa tekete yona eo kotareng e latelang.'],
      zu: ['I-mailbox ye-Payroll isifike ku-96% we-quota', 'Vula i-online archive bese usetha i-retention policy. Ukukhuphula i-quota kumane kudlulisela ithikithi elifanayo kwikota elandelayo.'] },
    { id: 'INC-4485', p: 'P3', sla: 480,
      en: ['New starter in Cape Town, laptop and account', 'Account, groups and licence first, then Intune enrolment, then the courier. The asset tag goes into the register before the box leaves.'],
      st: ['Mohiruwa e motjha Kapa, laptop le akhaonto', 'Akhaonto, dihlopha le laesense pele, ebe ho ngodiswa ho Intune, ebe khuriere. Nomoro ya asete e kenngwa rejisetareng pele lebokose le tsamaya.'],
      zu: ['Isisebenzi esisha eKapa, i-laptop ne-akhawunti', 'I-akhawunti, amaqembu nelayisensi kuqala, bese kubhaliswa ku-Intune, bese kuba yi-courier. Inombolo ye-asethi ifakwa kurejista ngaphambi kokuba ibhokisi lihambe.'] }
  ];

  var qEl = document.getElementById('queue');
  if (qEl) {
    var slots = [0, 1, 2].map(function (i) {
      return { idx: i, elapsed: Math.round(POOL[i].sla * (0.12 + i * 0.2)), done: false, hold: 0, open: false };
    });
    var paused = reduced, timer = null;
    var stateEl = document.getElementById('q-state'), pauseBtn = document.getElementById('q-pause');

    var render = function () {
      var lang = (window.NM && NM.lang) ? NM.lang() : 'en';
      qEl.innerHTML = slots.map(function (s, i) {
        var it = POOL[s.idx], txt = it[lang] || it.en;
        var pct = Math.min(100, Math.round(s.elapsed / it.sla * 100));
        var tight = pct >= 70 && !s.done;
        var label = s.done ? t('q.resolved') : tight ? t('q.tight') : pct + '%';
        return '<button type="button" class="q-row' + (s.done ? ' done' : '') + '" data-slot="' + i + '" aria-expanded="' + s.open + '">' +
          '<span class="q-top"><span><span class="q-id">' + it.id + '</span><span class="q-pri">' + it.p + '</span>' +
          '<span class="q-title">' + esc(txt[0]) + '</span></span>' +
          '<span class="q-state' + (s.done ? ' done' : tight ? ' tight' : '') + '">' + label + '</span></span>' +
          '<span class="q-meter"><i style="width:' + (s.done ? 100 : pct) + '%"></i></span>' +
          '<span class="q-note">' + esc(txt[1]) + '</span></button>';
      }).join('');
      if (stateEl) stateEl.textContent = paused ? t('q.paused') : t('q.live');
      if (pauseBtn) pauseBtn.textContent = paused ? t('q.resume') : t('q.pause');
      var dot = document.getElementById('q-dot'); if (dot) dot.classList.toggle('live', !paused);
    };

    var tick = function () {
      slots = slots.map(function (s) {
        if (s.open) return s;                        // someone is reading it: hold still
        if (s.done) {
          if (s.hold > 0) return Object.assign(s, { hold: s.hold - 1 });
          var used = slots.map(function (x) { return x.idx; });
          var next = s.idx; do { next = (next + 1) % POOL.length; } while (used.indexOf(next) > -1);
          return { idx: next, elapsed: Math.round(POOL[next].sla * 0.05), done: false, hold: 0, open: false };
        }
        var it = POOL[s.idx];
        var el = s.elapsed + Math.max(1, Math.round(it.sla / 60));
        if (el / it.sla >= 0.84) return Object.assign(s, { elapsed: el, done: true, hold: 3 });
        return Object.assign(s, { elapsed: el });
      });
      render();
    };
    var run = function () { clearInterval(timer); if (!paused) timer = setInterval(tick, 1500); };

    qEl.addEventListener('click', function (e) {
      var row = e.target.closest('.q-row'); if (!row) return;
      var s = slots[+row.dataset.slot]; s.open = !s.open; render();
      var again = qEl.querySelector('[data-slot="' + row.dataset.slot + '"]'); if (again) again.focus();
    });
    if (pauseBtn) pauseBtn.addEventListener('click', function () { paused = !paused; run(); render(); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer); else run();
    });
    document.addEventListener('langchange', render);
    render(); run();
  }

  /* ------------------------------------------------------------ copy IDs */
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-copy]'); if (!c) return;
    var v = c.getAttribute('data-copy');
    var done = function () { toast(t('copied') + ': ' + v); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(done, done);
    else {
      var ta = document.createElement('textarea'); ta.value = v; document.body.appendChild(ta);
      ta.select(); try { document.execCommand('copy'); } catch (er) { /* ignore */ }
      ta.remove(); done();
    }
  });

  /* ------------------------------------------------------------ work filter */
  var roles = document.getElementById('roles'), chips = document.querySelectorAll('.chip[data-f]');
  if (roles && chips.length) {
    var countEl = document.getElementById('filter-count'), activeF = 'all';
    var applyF = function () {
      var n = 0;
      roles.classList.toggle('filtering', activeF !== 'all');
      roles.querySelectorAll('.role').forEach(function (r) {
        var any = false;
        r.querySelectorAll('li[data-tags]').forEach(function (li) {
          var hit = activeF !== 'all' && li.getAttribute('data-tags').split(' ').indexOf(activeF) > -1;
          li.classList.toggle('hit', hit); if (hit) { any = true; n++; }
        });
        r.classList.toggle('none', activeF !== 'all' && !any);
      });
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.f === activeF ? 'true' : 'false'); });
      if (countEl) countEl.textContent = activeF === 'all' ? '' : t('filter.count', { n: n });
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { activeF = c.dataset.f; applyF(); }); });
    document.addEventListener('langchange', applyF);
    var h = location.hash.replace('#', ''); if (h && document.querySelector('.chip[data-f="' + h + '"]')) activeF = h;
    applyF();
  }

  /* ------------------------------------------------------------ contact form */
  var f = document.getElementById('msg-form');
  if (f) {
    var WA = '27638763337', MAIL = 'motheomnaledi@gmail.com';
    var v = function (id) { return (document.getElementById(id).value || '').trim(); };
    var body = function () {
      var sel = document.getElementById('f-about');
      return 'Hi Naledi,\n\n' + v('f-msg') + '\n\n' + v('f-name') + (v('f-org') ? ', ' + v('f-org') : '') +
        '\n(' + sel.options[sel.selectedIndex].text + ')';
    };
    var ok = function () { if (f.checkValidity()) return true; f.reportValidity(); return false; };
    f.addEventListener('submit', function (e) {
      e.preventDefault(); if (!ok()) return;
      var sel = document.getElementById('f-about');
      location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(sel.options[sel.selectedIndex].text + ': ' + v('f-name')) +
        '&body=' + encodeURIComponent(body());
    });
    var w = document.getElementById('f-wa');
    if (w) w.addEventListener('click', function () {
      if (!ok()) return;
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(body()), '_blank', 'noopener');
    });
  }
})();
