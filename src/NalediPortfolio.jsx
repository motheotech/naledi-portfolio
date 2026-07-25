import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Terminal, ArrowUpRight, Mail, Linkedin, Github, MapPin,
  Clock, Ticket, ShieldCheck, Wrench, Globe, GraduationCap, Copy, Check,
} from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Shared
 * ------------------------------------------------------------------ */

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'servicedesk', label: 'Service Desk' },
  { id: 'cafe', label: 'Digital Cafe' },
  { id: 'contact', label: 'Contact' },
];

const SIMULATOR_URL = 'https://servicedesk-simulator.com/';
const CAFE_URL = 'https://motheotech.github.io/MotheoDigitalCafe/';
const EMAIL = 'naledi@motheodigitalcafe.co.za';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function Eyebrow({ children, tone = 'dark' }) {
  return (
    <div
      className={`font-mono text-[11px] uppercase tracking-widest2 ${
        tone === 'light' ? 'text-brand-300' : 'text-brand-600'
      }`}
    >
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, lead }) {
  return (
    <header className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-slateink">{lead}</p>}
    </header>
  );
}

/* ------------------------------------------------------------------ *
 * Shell
 * ------------------------------------------------------------------ */

export default function NalediPortfolio() {
  const [section, setSection] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  const go = useCallback((id) => {
    setSection(id);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <TopBar section={section} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        {section === 'overview' && <Overview go={go} />}
        {section === 'capabilities' && <Capabilities />}
        {section === 'servicedesk' && <ServiceDesk />}
        {section === 'cafe' && <Cafe go={go} />}
        {section === 'contact' && <Contact />}
      </main>

      <SiteFooter />
    </div>
  );
}

function TopBar({ section, go, menuOpen, setMenuOpen }) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <button onClick={() => go('overview')} className="text-left">
          <div className="text-[17px] font-bold uppercase tracking-tight text-ink">Naledi Motheo</div>
          <div className="font-mono text-[10px] uppercase tracking-widest2 text-brand-500">
            IT Operations · Johannesburg
          </div>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`border-b-2 px-3 py-2 text-sm transition ${
                  active
                    ? 'border-brand-600 font-semibold text-ink'
                    : 'border-transparent text-slateink hover:border-brand-200 hover:text-brand-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          className="rounded p-2 text-ink md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-brand-100 bg-white md:hidden">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`block w-full border-b border-brand-50 px-5 py-3 text-left text-sm ${
                section === item.id ? 'font-semibold text-brand-600' : 'text-slateink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ *
 * Overview
 * ------------------------------------------------------------------ */

const CREDENTIALS = [
  'MS-900 Microsoft 365 Fundamentals',
  'Google IT Support Certificate',
  'CompTIA A+ — in progress',
  'AZ-900 — target 2026',
  'Higher Certificate IT (NQF 5) — Richfield',
];

function Overview({ go }) {
  return (
    <>
      <section className="border-b border-brand-100">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.05fr_1fr] md:py-20">
          <div className="self-center">
            <Eyebrow>IT Officer · Afrika Tikkun Services</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl">
              I keep three sites signed in, connected and working.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slateink">
              Microsoft 365 and Entra ID administration, ITIL-aligned incident management, and the
              unglamorous hands-on work that sits underneath both. Around a hundred tickets a month,
              across offices, remote users and the phone system.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => go('servicedesk')}
                className="inline-flex items-center gap-2 bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <Ticket className="h-4 w-4" />
                Try the triage simulator
              </button>
              <button
                onClick={() => go('contact')}
                className="inline-flex items-center gap-2 border border-brand-300 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-600 hover:bg-brand-50"
              >
                Get in touch
              </button>
            </div>
          </div>

          <LiveBoard />
        </div>
      </section>

      <section className="border-b border-brand-100 bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <Eyebrow>Certification</Eyebrow>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {CREDENTIALS.map((c) => (
              <li key={c} className="font-mono text-xs text-slateink">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionHead
          eyebrow="How I work"
          title="Diagnose before you fix. Communicate while you do."
          lead="Most escalations I inherit were not hard problems. They were problems where nobody confirmed the scope, and nobody told the user anything for two days."
        />

        <div className="mt-10 grid gap-px overflow-hidden border border-brand-100 bg-brand-100 md:grid-cols-3">
          {[
            {
              icon: <ShieldCheck className="h-5 w-5" />,
              title: 'Establish scope first',
              body: 'One user or forty? Service Health before settings. The answer changes whether this is a fix or an announcement.',
            },
            {
              icon: <Clock className="h-5 w-5" />,
              title: 'Restore, then resolve',
              body: 'A workaround that gets someone into their meeting counts. The root cause can be found after the business is running again.',
            },
            {
              icon: <Terminal className="h-5 w-5" />,
              title: 'Leave a record',
              body: 'Every action in the ticket, in plain language. The next person to touch it should not have to reconstruct what happened.',
            },
          ].map((c) => (
            <div key={c.title} className="bg-white p-6">
              <div className="text-brand-600">{c.icon}</div>
              <h3 className="mt-4 font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slateink">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Live incident board (hero panel)
 * ------------------------------------------------------------------ */

const BOARD_POOL = [
  { id: 'INC-4471', title: 'SharePoint unreachable — Finance', priority: 'P1', sla: 60 },
  { id: 'INC-4468', title: 'Entra sign-in loop — 3 users', priority: 'P2', sla: 240 },
  { id: 'INC-4463', title: '3CX handset not registering', priority: 'P3', sla: 480 },
  { id: 'INC-4479', title: 'Mailbox quota exceeded — Payroll', priority: 'P2', sla: 240 },
  { id: 'INC-4482', title: 'Shared drive mapping fails on login', priority: 'P3', sla: 480 },
  { id: 'INC-4485', title: 'MFA re-enrolment — new starter', priority: 'P3', sla: 480 },
];

function LiveBoard() {
  const reduced = usePrefersReducedMotion();
  const [slots, setSlots] = useState(() =>
    [0, 1, 2].map((i) => ({
      poolIdx: i,
      elapsed: Math.round(BOARD_POOL[i].sla * (0.1 + i * 0.18)),
      resolved: false,
      hold: 0,
    }))
  );

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setSlots((prev) =>
        prev.map((s) => {
          if (s.resolved) {
            if (s.hold > 0) return { ...s, hold: s.hold - 1 };
            const next = (s.poolIdx + 3) % BOARD_POOL.length;
            return {
              poolIdx: next,
              elapsed: Math.round(BOARD_POOL[next].sla * 0.06),
              resolved: false,
              hold: 0,
            };
          }
          const item = BOARD_POOL[s.poolIdx];
          const elapsed = s.elapsed + Math.max(1, Math.round(item.sla / 70));
          if (elapsed / item.sla >= 0.86) return { ...s, elapsed, resolved: true, hold: 3 };
          return { ...s, elapsed };
        })
      );
    }, 1400);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="terminal bg-ink p-5 md:p-6">
      <div className="flex items-baseline justify-between border-b border-ink-700 pb-3">
        <Eyebrow tone="light">Active queue</Eyebrow>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-brand-400">
          {reduced ? 'static' : 'live'}
        </span>
      </div>

      <ul className="mt-4 space-y-4">
        {slots.map((slot, i) => {
          const item = BOARD_POOL[slot.poolIdx];
          const pct = Math.min(100, Math.round((slot.elapsed / item.sla) * 100));
          const tight = pct >= 70 && !slot.resolved;
          return (
            <li key={i}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-brand-400">{item.id}</span>
                    <span className="border border-brand-700 px-1.5 py-px font-mono text-[10px] text-brand-200">
                      {item.priority}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-sm text-brand-100">{item.title}</div>
                </div>
                <div className="shrink-0 text-right">
                  {slot.resolved ? (
                    <span className="font-mono text-[10px] uppercase tracking-widest2 text-brand-200">
                      Resolved
                    </span>
                  ) : (
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest2 ${
                        tight ? 'text-brand-100' : 'text-brand-400'
                      }`}
                    >
                      {tight ? 'SLA tight' : `${pct}%`}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 h-[3px] w-full bg-ink-700">
                <div
                  className={`h-full transition-all duration-700 ${
                    slot.resolved ? 'bg-brand-200' : tight ? 'bg-brand-300' : 'bg-brand-500'
                  }`}
                  style={{ width: `${slot.resolved ? 100 : pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 border-t border-ink-700 pt-3 font-mono text-[10px] leading-relaxed text-brand-400">
        Illustrative board. Ticket data is simulated.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Capabilities
 * ------------------------------------------------------------------ */

const CAPABILITIES = [
  {
    group: 'Identity & directory',
    items: ['Active Directory', 'Entra ID', 'Group Policy', 'Conditional Access basics', 'Joiner / mover / leaver'],
  },
  {
    group: 'Microsoft 365',
    items: ['Exchange Online', 'SharePoint Online', 'Teams administration', 'Licensing', 'Service Health'],
  },
  {
    group: 'Service management',
    items: ['Incident & request handling', 'Priority matrix and SLA', 'Escalation paths', 'MS Dynamics 365', 'Ticket documentation'],
  },
  {
    group: 'Infrastructure & endpoint',
    items: ['3CX phone system', 'Networking fundamentals', 'Remote support (AnyDesk, RDP)', 'Hardware diagnostics', 'Multi-site rollout'],
  },
];

function Capabilities() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <SectionHead
        eyebrow="Capabilities"
        title="What I administer day to day"
        lead="Three sites, roughly a hundred tickets a month, and the systems behind them."
      />

      <dl className="mt-12 divide-y divide-brand-100 border-y border-brand-100">
        {CAPABILITIES.map((c) => (
          <div key={c.group} className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-10">
            <dt className="font-mono text-[11px] uppercase tracking-widest2 text-brand-600">{c.group}</dt>
            <dd className="flex flex-wrap gap-2">
              {c.items.map((item) => (
                <span key={item} className="border border-brand-100 bg-mist px-2.5 py-1 text-sm text-slateink">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <Eyebrow>Currently studying</Eyebrow>
          <ul className="mt-4 space-y-3">
            {[
              ['CompTIA A+', 'In progress'],
              ['Higher Certificate in IT (NQF 5)', 'Richfield · Jul 2026 – Jun 2027'],
              ['AZ-900 Azure Fundamentals', 'Target 2026'],
            ].map(([name, when]) => (
              <li key={name} className="flex items-start gap-3 border-l-2 border-brand-500 pl-4">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <div>
                  <div className="text-sm font-semibold text-ink">{name}</div>
                  <div className="font-mono text-[11px] text-slateink">{when}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-mist p-6">
          <Eyebrow>The honest gap</Eyebrow>
          <p className="mt-3 text-sm leading-relaxed text-slateink">
            My certifications are vendor-side and strong for Microsoft 365 environments. The formal
            NQF qualification in IT is the piece I am still completing, which is exactly why it is on
            the calendar rather than on a wish list.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Service Desk
 * ------------------------------------------------------------------ */

function ServiceDesk() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <SectionHead
        eyebrow="Service desk"
        title="Triage is the skill. Everything else is lookup."
        lead="Anyone can find the setting. Deciding what to touch first, what to leave alone, and who to tell is the part that separates a service desk that works from one that does not."
      />

      <a
        href={SIMULATOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-10 flex flex-col justify-between gap-4 border border-brand-200 bg-brand-50 p-6 transition hover:border-brand-600 sm:flex-row sm:items-center"
      >
        <div>
          <Eyebrow>Full training platform</Eyebrow>
          <div className="mt-2 text-lg font-semibold text-ink">servicedesk-simulator.com</div>
          <p className="mt-1 max-w-xl text-sm text-slateink">
            The full simulator I practise on — realistic ticket queues, escalation and SLA pressure.
            Worth an hour if you are moving into first-line support.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand-700">
          Open site
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>

      <div className="mt-14">
        <Eyebrow>Interactive</Eyebrow>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Triage six live tickets</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slateink">
          Set a priority, choose a first action. The clock runs while you decide. There is no score
          for speed — the point is whether the call was right.
        </p>
        <div className="mt-6">
          <TriageSimulator />
        </div>
      </div>

      <div className="mt-16">
        <Eyebrow>Interactive</Eyebrow>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Admin console</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slateink">
          A simulated shell against a fictional tenant. Type{' '}
          <span className="font-mono text-brand-700">help</span> to start. Arrow keys walk your
          history, Tab completes a command.
        </p>
        <div className="mt-6">
          <Console />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Triage simulator
 * ------------------------------------------------------------------ */

const PRIORITIES = [
  { id: 'P1', label: 'P1 · Critical', hint: 'Business stopped, no workaround' },
  { id: 'P2', label: 'P2 · High', hint: 'Blocked user or degraded service' },
  { id: 'P3', label: 'P3 · Medium', hint: 'Workaround exists' },
  { id: 'P4', label: 'P4 · Low', hint: 'Nuisance, schedule it' },
];

const TICKETS = [
  {
    id: 'INC-4471',
    from: 'Thandi M. · Finance',
    summary: 'Nobody on the finance floor can open the SharePoint site',
    detail:
      'Twelve users affected. The payroll run is due to be signed off this afternoon. Users get "You need permission to access this site" on a site that worked yesterday.',
    priority: 'P1',
    priorityWhy:
      'Twelve users, a business-critical deadline today, and no workaround. That is a critical incident regardless of how easy the fix turns out to be.',
    actions: [
      { id: 'a', text: 'Reset the affected users\u2019 passwords' },
      { id: 'b', text: 'Check Service Health in the Microsoft 365 admin centre' },
      { id: 'c', text: 'Restore the SharePoint site from a previous version' },
      { id: 'd', text: 'Ask everyone to clear their browser cache' },
    ],
    correctAction: 'b',
    actionWhy:
      'Confirm scope before you change anything. If Microsoft has an advisory open, your job is communication rather than configuration — and you have just avoided restoring a site that was never broken.',
  },
  {
    id: 'INC-4474',
    from: 'Executive assistant',
    summary: 'CEO camera not detected, board call starts in 20 minutes',
    detail:
      'Teams launches normally and audio works. The camera does not appear in device settings. One user, high visibility, hard deadline.',
    priority: 'P2',
    priorityWhy:
      'One user with a hard deadline. Seniority raises urgency, not impact — a single laptop is not a P1. Log it as P2 and respond immediately.',
    actions: [
      { id: 'a', text: 'Get them onto the call from their phone, then diagnose the laptop' },
      { id: 'b', text: 'Reimage the laptop now' },
      { id: 'c', text: 'Raise a support case with Microsoft' },
      { id: 'd', text: 'Reinstall Teams and restart' },
    ],
    correctAction: 'a',
    actionWhy:
      'Restore the service, then fix the fault. The board call is the business outcome; the camera driver is a ticket you can work at 3pm once nobody is waiting on you.',
  },
  {
    id: 'INC-4477',
    from: 'HR · onboarding',
    summary: 'New starter cannot sign in on day one',
    detail:
      'The account exists in Entra ID but sign-in returns a licensing error, and there is no mailbox. They start in an hour and cannot do anything.',
    priority: 'P2',
    priorityWhy:
      'One person, but completely blocked with no workaround. That is a high-priority incident even though it never threatens the wider business.',
    actions: [
      { id: 'a', text: 'Have them share a colleague\u2019s login for the first day' },
      { id: 'b', text: 'Assign the correct licence and force a directory sync' },
      { id: 'c', text: 'Delete the account and recreate it' },
      { id: 'd', text: 'Wait for the overnight sync to pick it up' },
    ],
    correctAction: 'b',
    actionWhy:
      'Assign the licence, sync, done. Sharing credentials is the answer that ends up in an audit finding — never solve an access problem by breaking accountability.',
  },
  {
    id: 'INC-4480',
    from: 'Reception',
    summary: '3CX handset showing "Not Registered"',
    detail:
      'One handset at the front desk. Every other extension on site is registered and taking calls normally. Reception can still use the softphone on their PC.',
    priority: 'P3',
    priorityWhy:
      'Single device, and a workaround is already in place through the softphone. Real, but not urgent.',
    actions: [
      { id: 'a', text: 'Reboot the 3CX server' },
      { id: 'b', text: 'Order a replacement handset' },
      { id: 'c', text: 'Check the network port and PoE, then re-provision the extension' },
      { id: 'd', text: 'Escalate to the telephony provider' },
    ],
    correctAction: 'c',
    actionWhy:
      'Change the smallest thing that could explain it. Rebooting the PBX during business hours to fix one handset turns a P3 into an outage you caused.',
  },
  {
    id: 'INC-4483',
    from: 'Sipho N. · Programmes',
    summary: 'User entered their password into a fake Microsoft login page',
    detail:
      'They received an email about a mailbox quota, clicked the link, and typed their credentials. They realised afterwards and reported it. The account is still active.',
    priority: 'P1',
    priorityWhy:
      'Confirmed credential compromise. One user, but an attacker inside a tenant does not stay one user for long. Security incidents are judged on potential impact.',
    actions: [
      { id: 'a', text: 'Reset the password, revoke active sessions, review sign-in logs' },
      { id: 'b', text: 'Delete the phishing email and remind them to be careful' },
      { id: 'c', text: 'Run a full antivirus scan on their laptop first' },
      { id: 'd', text: 'Ask them to change their password when convenient' },
    ],
    correctAction: 'a',
    actionWhy:
      'A password reset alone is not enough — an existing session token stays valid until it is revoked. Reset, revoke, then read the sign-in logs to see whether anyone else has already signed in.',
  },
  {
    id: 'INC-4486',
    from: 'Second floor · shared',
    summary: 'Printer is slower than it used to be',
    detail:
      'Jobs still complete. Users estimate it takes about thirty seconds longer than last month. No deadline attached, nobody blocked.',
    priority: 'P4',
    priorityWhy:
      'Nothing is broken and nobody is blocked. Logging it honestly as low priority is what protects your capacity for the P1 that arrives at 16:45.',
    actions: [
      { id: 'a', text: 'Drop the current ticket and investigate now' },
      { id: 'b', text: 'Log it and schedule it into the next site visit' },
      { id: 'c', text: 'Rebuild the print server' },
      { id: 'd', text: 'Request budget for a replacement printer' },
    ],
    correctAction: 'b',
    actionWhy:
      'Log it, schedule it, and tell them when you will be there. Low priority does not mean ignored — it means planned.',
  },
];

function fmtClock(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function TriageSimulator() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('triage'); // triage | feedback | done
  const [priority, setPriority] = useState(null);
  const [action, setAction] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [results, setResults] = useState([]);

  const ticket = TICKETS[index];

  useEffect(() => {
    if (phase !== 'triage') return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase, index]);

  const submit = () => {
    if (!priority || !action) return;
    setResults((r) => [
      ...r,
      {
        id: ticket.id,
        priorityOk: priority === ticket.priority,
        actionOk: action === ticket.correctAction,
        seconds,
      },
    ]);
    setPhase('feedback');
  };

  const next = () => {
    if (index === TICKETS.length - 1) {
      setPhase('done');
      return;
    }
    setIndex(index + 1);
    setPriority(null);
    setAction(null);
    setSeconds(0);
    setPhase('triage');
  };

  const restart = () => {
    setIndex(0);
    setPriority(null);
    setAction(null);
    setSeconds(0);
    setResults([]);
    setPhase('triage');
  };

  if (phase === 'done') {
    const correct = results.reduce((n, r) => n + (r.priorityOk ? 1 : 0) + (r.actionOk ? 1 : 0), 0);
    const total = results.length * 2;
    const times = results.map((r) => r.seconds).sort((a, b) => a - b);
    const median = times.length ? times[Math.floor(times.length / 2)] : 0;
    const verdict =
      correct === total
        ? 'Clean sweep. You are triaging the way a mature service desk expects.'
        : correct >= total * 0.75
        ? 'Solid. The calls you missed are the ones worth re-reading below.'
        : correct >= total * 0.5
        ? 'Reasonable instincts, inconsistent method. Scope first, workaround second.'
        : 'Worth another pass. Almost every answer here follows from one rule: confirm impact before you touch anything.';

    return (
      <div className="border border-brand-200">
        <div className="border-b border-brand-100 bg-mist px-6 py-4">
          <Eyebrow>Shift complete</Eyebrow>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-10">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
                Correct calls
              </div>
              <div className="mt-1 text-3xl font-bold text-ink">
                {correct}
                <span className="text-lg font-medium text-slateink">/{total}</span>
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
                Median triage time
              </div>
              <div className="mt-1 text-3xl font-bold text-ink">{fmtClock(median)}</div>
            </div>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slateink">{verdict}</p>

          <ul className="mt-6 divide-y divide-brand-100 border-y border-brand-100">
            {results.map((r) => {
              const t = TICKETS.find((x) => x.id === r.id);
              return (
                <li key={r.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <span className="font-mono text-[11px] text-brand-600">{r.id}</span>
                    <span className="ml-3 text-sm text-slateink">{t.summary}</span>
                  </div>
                  <div className="flex shrink-0 gap-3 font-mono text-[10px] uppercase tracking-widest2">
                    <span className={r.priorityOk ? 'text-brand-600' : 'text-slateink line-through'}>
                      Priority
                    </span>
                    <span className={r.actionOk ? 'text-brand-600' : 'text-slateink line-through'}>
                      Action
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={restart}
              className="bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Run the shift again
            </button>
            <a
              href={SIMULATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand-300 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Try the full simulator
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const feedback = phase === 'feedback';
  const priorityOk = priority === ticket.priority;
  const actionOk = action === ticket.correctAction;

  return (
    <div className="border border-brand-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-100 bg-mist px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-brand-600">{ticket.id}</span>
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
            {index + 1} of {TICKETS.length}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-slateink">
          <Clock className="h-3.5 w-3.5" />
          {fmtClock(seconds)}
        </div>
      </div>

      <div className="p-6">
        <div className="font-mono text-[11px] uppercase tracking-widest2 text-brand-600">
          {ticket.from}
        </div>
        <h4 className="mt-2 text-lg font-semibold text-ink">{ticket.summary}</h4>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slateink">{ticket.detail}</p>

        <fieldset className="mt-8" disabled={feedback}>
          <legend className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
            1 · Set the priority
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {PRIORITIES.map((p) => {
              const picked = priority === p.id;
              const isAnswer = feedback && p.id === ticket.priority;
              const wrongPick = feedback && picked && !priorityOk;
              return (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`border px-4 py-3 text-left transition ${
                    isAnswer
                      ? 'border-brand-600 bg-brand-50'
                      : wrongPick
                      ? 'border-slateink bg-white'
                      : picked
                      ? 'border-brand-600 bg-brand-50'
                      : 'border-brand-100 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-ink">{p.label}</span>
                    {isAnswer && <Check className="h-4 w-4 shrink-0 text-brand-600" />}
                    {wrongPick && <X className="h-4 w-4 shrink-0 text-slateink" />}
                  </div>
                  <div className="mt-0.5 text-xs text-slateink">{p.hint}</div>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-8" disabled={feedback}>
          <legend className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
            2 · Choose your first action
          </legend>
          <div className="mt-3 space-y-2">
            {ticket.actions.map((a) => {
              const picked = action === a.id;
              const isAnswer = feedback && a.id === ticket.correctAction;
              const wrongPick = feedback && picked && !actionOk;
              return (
                <button
                  key={a.id}
                  onClick={() => setAction(a.id)}
                  className={`flex w-full items-center justify-between gap-3 border px-4 py-3 text-left text-sm transition ${
                    isAnswer
                      ? 'border-brand-600 bg-brand-50 font-semibold text-ink'
                      : wrongPick
                      ? 'border-slateink text-slateink'
                      : picked
                      ? 'border-brand-600 bg-brand-50 text-ink'
                      : 'border-brand-100 text-slateink hover:border-brand-300'
                  }`}
                >
                  <span>{a.text}</span>
                  {isAnswer && <Check className="h-4 w-4 shrink-0 text-brand-600" />}
                  {wrongPick && <X className="h-4 w-4 shrink-0 text-slateink" />}
                </button>
              );
            })}
          </div>
        </fieldset>

        {feedback && (
          <div className="mt-8 animate-risein space-y-4 border-l-2 border-brand-500 bg-mist p-5">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest2 text-brand-600">
                Priority — {priorityOk ? 'correct' : `${ticket.priority} was the call`}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slateink">{ticket.priorityWhy}</p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest2 text-brand-600">
                First action — {actionOk ? 'correct' : 'not the strongest move'}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slateink">{ticket.actionWhy}</p>
            </div>
          </div>
        )}

        <div className="mt-8">
          {feedback ? (
            <button
              onClick={next}
              className="bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {index === TICKETS.length - 1 ? 'See results' : 'Next ticket'}
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!priority || !action}
              className="bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-200"
            >
              Commit triage
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Console
 * ------------------------------------------------------------------ */

const COMMANDS = {
  help: () => [
    'Available commands',
    '',
    '  whoami            current operator and role',
    '  ticket-stats      queue summary for the current month',
    '  sla               service level targets by priority',
    '  m365-status       tenant service health',
    '  get-mailbox       mailbox size and quota',
    '  ad-users          recent directory activity',
    '  3cx-status        phone system extensions',
    '  sites             managed locations',
    '  certs             certifications and study plan',
    '  contact           how to reach me',
    '  clear             clear the console',
    '',
  ],
  whoami: () => [
    'operator : naledi.motheo',
    'role     : IT Officer',
    'org      : Afrika Tikkun Services',
    'scope    : 3 sites · ~100 tickets/month · M365 + Entra + 3CX',
    'shell    : simulated. nothing here touches a real tenant.',
    '',
  ],
  'ticket-stats': () => [
    { wait: 320, text: 'Querying incident records...' },
    '',
    '  PRIORITY   RAISED   RESOLVED   WITHIN SLA',
    '  P1              4          4         100%',
    '  P2             19         19          95%',
    '  P3             52         50          98%',
    '  P4             27         21          n/a',
    '',
    '  first-contact resolution : 71%',
    '  reopened                 : 2',
    '',
  ],
  sla: () => [
    '  PRIORITY   RESPONSE   RESOLUTION   DEFINITION',
    '  P1              15m          4h    business stopped, no workaround',
    '  P2              30m          8h    blocked user or degraded service',
    '  P3               4h          3d    workaround available',
    '  P4               1d         10d    scheduled work',
    '',
  ],
  'm365-status': () => [
    { wait: 380, text: 'Connecting to Microsoft 365 admin centre...' },
    { wait: 420, text: 'Authenticated. Reading Service Health...' },
    '',
    '  SERVICE                STATUS',
    '  Exchange Online        Healthy',
    '  SharePoint Online      Healthy',
    '  Microsoft Teams        Healthy',
    '  Entra ID               Healthy',
    '  Microsoft Purview      Advisory MO_ADV_4417',
    '',
    '  1 advisory open. Users may see delayed audit log entries.',
    '',
  ],
  'get-mailbox': () => [
    { wait: 300, text: 'Connecting to Exchange Online...' },
    '',
    '  MAILBOX            SIZE      QUOTA    ARCHIVE',
    '  Finance Shared     41.2 GB   50 GB    Enabled',
    '  Payroll            47.9 GB   50 GB    Enabled   <-- approaching quota',
    '  Reception           8.4 GB   50 GB    Disabled',
    '',
  ],
  'ad-users': () => [
    { wait: 300, text: 'Reading directory...' },
    '',
    '  USER            LAST SIGN-IN   MFA       STATUS',
    '  t.mabaso        2h ago         Enabled   Active',
    '  s.nkosi         14m ago        Enabled   Active',
    '  j.venter        6d ago         Enabled   Disabled (leaver)',
    '  new.starter     never          Pending   Licence assigned',
    '',
  ],
  '3cx-status': () => [
    { wait: 280, text: 'Polling PBX...' },
    '',
    '  EXT    DEVICE            STATE',
    '  100    Reception         Registered',
    '  101    Finance           Registered',
    '  102    Programmes        Registered',
    '  110    Meeting room      Not registered',
    '',
    '  3 of 4 extensions registered.',
    '',
  ],
  sites: () => [
    '  SITE            USERS   CONNECTIVITY   NOTES',
    '  Head office       60+    Fibre          Primary support base',
    '  Site two          25+    Fibre + LTE    Weekly on-site',
    '  Site three        20+    LTE            Remote-first, monthly visit',
    '',
  ],
  certs: () => [
    '  HELD',
    '    MS-900  Microsoft 365 Fundamentals',
    '    Google IT Support Certificate',
    '',
    '  IN PROGRESS',
    '    CompTIA A+',
    '    Higher Certificate in IT (NQF 5), Richfield',
    '',
    '  NEXT',
    '    AZ-900  ->  Network+  ->  Security+',
    '',
  ],
  contact: () => [
    `  email     ${EMAIL}`,
    '  linkedin  Naledi Motheo',
    '  based     Johannesburg, South Africa',
    '  business  Motheo Digital Cafe',
    '',
  ],
};

const COMMAND_NAMES = Object.keys(COMMANDS).concat('clear');

const BOOT = [
  'Motheo admin console — simulated environment',
  'No real tenant is reachable from this shell.',
  "Type 'help' to see what is available.",
  '',
];

function Console() {
  const reduced = usePrefersReducedMotion();
  const [lines, setLines] = useState(BOOT);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, busy]);

  const emit = useCallback(
    async (out) => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
      setBusy(true);
      for (const entry of out) {
        if (!alive.current) return;
        const isObj = typeof entry === 'object' && entry !== null;
        const text = isObj ? entry.text : entry;
        await sleep(isObj && entry.wait ? entry.wait : text.trim() === '' ? 12 : 45);
        if (!alive.current) return;
        setLines((l) => [...l, text]);
      }
      if (alive.current) setBusy(false);
    },
    [reduced]
  );

  const run = useCallback(
    async (raw) => {
      const cmd = raw.trim();
      setLines((l) => [...l, `naledi@motheo:~$ ${cmd}`]);
      if (cmd) setHistory((h) => [cmd, ...h].slice(0, 40));
      setHistIdx(-1);

      if (!cmd) return;
      if (cmd === 'clear') {
        setLines([]);
        return;
      }

      const name = cmd.split(' ')[0];
      const fn = COMMANDS[name];
      if (!fn) {
        await emit([`command not found: ${name}`, "type 'help' for the list", '']);
        return;
      }
      await emit(fn());
    },
    [emit]
  );

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (busy) return;
      const value = input;
      setInput('');
      run(value);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const i = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(i);
      setInput(history[i]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = histIdx - 1;
      if (i < 0) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(i);
        setInput(history[i]);
      }
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.trim();
      if (!partial) return;
      const match = COMMAND_NAMES.find((c) => c.startsWith(partial));
      if (match) setInput(match);
    }
  };

  return (
    <div className="terminal bg-ink" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center gap-3 border-b border-ink-700 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
        </div>
        <span className="font-mono text-[11px] text-brand-400">naledi@motheo — admin console</span>
      </div>

      <div
        ref={bodyRef}
        className="h-[340px] overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-[1.7] md:text-[13px]"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.startsWith('naledi@motheo') ? 'text-brand-200' : 'text-brand-300'
            }`}
          >
            {line || '\u00A0'}
          </div>
        ))}

        {busy && <div className="text-brand-500">…</div>}

        <div className="mt-1 flex items-center gap-2">
          <span className="shrink-0 text-brand-200">naledi@motheo:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={busy}
            spellCheck="false"
            autoComplete="off"
            aria-label="Console input"
            placeholder={busy ? '' : 'help'}
            className="min-w-0 flex-1 bg-transparent font-mono text-brand-100 caret-brand-200 outline-none placeholder:text-brand-700 disabled:opacity-50"
          />
          {!busy && <span className="h-4 w-2 animate-blink bg-brand-300" aria-hidden="true" />}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-ink-700 px-4 py-3">
        {['help', 'ticket-stats', 'm365-status', '3cx-status', 'sla', 'clear'].map((c) => (
          <button
            key={c}
            disabled={busy}
            onClick={(e) => {
              e.stopPropagation();
              setInput('');
              run(c);
              inputRef.current?.focus();
            }}
            className="border border-ink-700 px-2.5 py-1 font-mono text-[11px] text-brand-300 transition hover:border-brand-500 hover:text-brand-100 disabled:opacity-40"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Motheo Digital Cafe
 * ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: <Wrench className="h-5 w-5" />,
    title: 'PC repairs and setup',
    body: 'Hardware diagnostics, clean installs, upgrades, and the tune-up that makes an older machine usable again.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Websites for small business',
    body: 'A straightforward site that loads fast on a phone and tells customers what you do, where you are and how to reach you.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Microsoft 365 for small teams',
    body: 'Email on your own domain, shared files that do not live on one person\u2019s laptop, and backups you can actually restore from.',
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: 'Practical training',
    body: 'Short hands-on sessions on Microsoft 365, staying safe online, and fixing the everyday problems yourself.',
  },
];

function Cafe({ go }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
        <div>
          <SectionHead
            eyebrow="Motheo Digital Cafe"
            title="Tech support for Orange Farm and greater Johannesburg"
            lead="The day job is enterprise. This is the same standard of work for the shops, churches, small offices and individuals who normally have to make do with whoever is available."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CAFE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Visit Motheo Digital Cafe
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => go('contact')}
              className="border border-brand-300 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Discuss a job
            </button>
          </div>
        </div>

        <div className="bg-ink p-6">
          <Eyebrow tone="light">How it works</Eyebrow>
          <ol className="mt-4 space-y-4">
            {[
              ['Tell me what is wrong', 'A message with the symptom is enough. No jargon needed.'],
              ['You get a straight quote', 'A fixed price where I can give one, an honest range where I cannot.'],
              ['On-site or remote', 'Whichever is faster for the problem. Remote is usually same day.'],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 font-mono text-xs text-brand-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="text-sm font-semibold text-brand-100">{title}</div>
                  <div className="mt-0.5 text-sm text-brand-300">{body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-14 grid gap-px border border-brand-100 bg-brand-100 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.title} className="bg-white p-6">
            <div className="text-brand-600">{s.icon}</div>
            <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slateink">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border-l-2 border-brand-500 bg-mist p-6">
        <p className="max-w-2xl text-sm leading-relaxed text-slateink">
          Based in Drieziek, Orange Farm, and travelling by public transport across Johannesburg. If
          you are outside easy reach, remote support covers most software problems on the same day.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Contact
 * ------------------------------------------------------------------ */

function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <SectionHead
        eyebrow="Contact"
        title="Open to IT support and ITSM roles, and to Digital Cafe work"
        lead="On-site, hybrid or remote. The fastest reply is by email."
      />

      <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr]">
        <div className="divide-y divide-brand-100 border-y border-brand-100">
          <div className="flex items-center justify-between gap-4 py-5">
            <div className="flex min-w-0 items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 text-brand-600" />
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
                  Email
                </div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="block truncate font-semibold text-ink hover:text-brand-600"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
            <button
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 border border-brand-200 px-3 py-1.5 font-mono text-[11px] text-brand-700 transition hover:border-brand-600"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'copied' : 'copy'}
            </button>
          </div>

          <a
            href="https://linkedin.com/in/naledi-motheo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 py-5 hover:text-brand-600"
          >
            <Linkedin className="h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
                LinkedIn
              </div>
              <div className="font-semibold text-ink">Naledi Motheo</div>
            </div>
          </a>

          <a
            href="https://github.com/motheotech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 py-5 hover:text-brand-600"
          >
            <Github className="h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
                GitHub
              </div>
              <div className="font-semibold text-ink">motheotech</div>
            </div>
          </a>

          <div className="flex items-center gap-4 py-5">
            <MapPin className="h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest2 text-slateink">
                Based in
              </div>
              <div className="font-semibold text-ink">Drieziek, Orange Farm · Johannesburg</div>
            </div>
          </div>
        </div>

        <div className="bg-mist p-6">
          <Eyebrow>What I am looking for</Eyebrow>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slateink">
            {[
              'IT support and service desk roles, first or second line',
              'ITSM and Microsoft 365 administration positions',
              'Cloud-focused work as the Azure certifications land',
              'Motheo Digital Cafe projects for small businesses',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Footer
 * ------------------------------------------------------------------ */

function SiteFooter() {
  return (
    <footer className="border-t border-brand-100 bg-mist">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-slateink">
          © {new Date().getFullYear()} Naledi Motheo · Built with React and Tailwind
        </p>
        <div className="flex gap-5 font-mono text-[11px]">
          <a
            href={CAFE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slateink transition hover:text-brand-600"
          >
            Motheo Digital Cafe
          </a>
          <a
            href="https://github.com/motheotech/naledi-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slateink transition hover:text-brand-600"
          >
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}
