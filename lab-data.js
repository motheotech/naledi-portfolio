/* Naledi Motheo portfolio — simulation content.
 *
 * This is the file to edit. lab.js is the engine and should not need touching
 * to add a ticket, a console command, a lifecycle step or a network fault.
 * Every name, number and ticket here is fictional.
 */

/* ================================================================ TRIAGE
 * priority: P1-P4. correct: the id of the strongest first action. */
var TICKETS = [
  {
    id: 'INC-4471', from: 'Thandi M., Finance',
    summary: 'Nobody on the finance floor can open the SharePoint site',
    detail: 'Twelve users affected. Payroll has to be signed off this afternoon. Everyone gets "You need permission to access this site" on a site that worked yesterday.',
    priority: 'P1',
    priorityWhy: 'Twelve users, a business-critical deadline today and no workaround. That is a critical incident however easy the fix turns out to be.',
    actions: [
      { id: 'a', text: 'Reset the affected users\u2019 passwords' },
      { id: 'b', text: 'Check Service Health and the site\u2019s recent permission changes' },
      { id: 'c', text: 'Restore the SharePoint site from a previous version' },
      { id: 'd', text: 'Ask everyone to clear their browser cache' }
    ],
    correct: 'b',
    actionWhy: 'Confirm scope before you change anything. If Microsoft has an advisory open, the job is communication rather than configuration, and you have just avoided restoring a site that was never broken.'
  },
  {
    id: 'INC-4474', from: 'Executive assistant',
    summary: 'CEO\u2019s camera not detected, board call starts in 20 minutes',
    detail: 'Teams opens and audio works. The camera does not appear in device settings. One user, high visibility, hard deadline.',
    priority: 'P2',
    priorityWhy: 'One user with a hard deadline. Seniority raises urgency, not impact. A single laptop is not a P1, so log it as P2 and respond straight away.',
    actions: [
      { id: 'a', text: 'Get them onto the call from their phone, then look at the laptop' },
      { id: 'b', text: 'Reimage the laptop now' },
      { id: 'c', text: 'Raise a support case with Microsoft' },
      { id: 'd', text: 'Reinstall Teams and restart' }
    ],
    correct: 'a',
    actionWhy: 'Restore the service, then fix the fault. The board call is the business outcome. The camera driver is a ticket you can work at 15:00 once nobody is waiting on you.'
  },
  {
    id: 'INC-4477', from: 'HR, onboarding',
    summary: 'New starter cannot sign in on day one',
    detail: 'The account exists in Entra ID but sign-in returns a licensing error and there is no mailbox. They start in an hour.',
    priority: 'P2',
    priorityWhy: 'One person, completely blocked, no workaround. High priority, even though the wider business is fine.',
    actions: [
      { id: 'a', text: 'Let them use a colleague\u2019s login for the first day' },
      { id: 'b', text: 'Assign the correct licence and confirm the mailbox provisions' },
      { id: 'c', text: 'Delete the account and create it again' },
      { id: 'd', text: 'Wait for the overnight sync to pick it up' }
    ],
    correct: 'b',
    actionWhy: 'Assign the licence and check the mailbox appears. Sharing credentials ends up as an audit finding: never fix an access problem by breaking accountability.'
  },
  {
    id: 'INC-4480', from: 'Reception, Orange Farm',
    summary: '3CX handset showing "Not registered"',
    detail: 'One handset at the front desk. Every other extension on site is registered and taking calls. Reception can still use the softphone on the PC.',
    priority: 'P3',
    priorityWhy: 'Single device, and a workaround is already in place through the softphone. Real, but not urgent.',
    actions: [
      { id: 'a', text: 'Restart the 3CX server' },
      { id: 'b', text: 'Order a replacement handset' },
      { id: 'c', text: 'Check the switch port and PoE, then re-provision the extension' },
      { id: 'd', text: 'Escalate to the telephony provider' }
    ],
    correct: 'c',
    actionWhy: 'Change the smallest thing that could explain it. Restarting the PBX in business hours to fix one handset turns a P3 into an outage you caused.'
  },
  {
    id: 'INC-4483', from: 'Sipho N., Programmes',
    summary: 'User typed their password into a fake Microsoft sign-in page',
    detail: 'An email warned their mailbox was full. They clicked, entered their credentials, then realised and reported it. The account is still active.',
    priority: 'P1',
    priorityWhy: 'Confirmed credential compromise. One user, but an attacker inside a tenant does not stay one user for long. Security incidents are judged on potential impact.',
    actions: [
      { id: 'a', text: 'Reset the password, revoke sessions, then read the sign-in logs' },
      { id: 'b', text: 'Delete the phishing email and remind them to be careful' },
      { id: 'c', text: 'Run a full antivirus scan on their laptop first' },
      { id: 'd', text: 'Ask them to change their password when they have a moment' }
    ],
    correct: 'a',
    actionWhy: 'A reset alone is not enough: an existing session token stays valid until it is revoked. Reset, revoke, then check the sign-in logs for anyone who already got in, and look for new inbox rules.'
  },
  {
    id: 'INC-4486', from: 'Second floor, shared',
    summary: 'Printer is slower than it used to be',
    detail: 'Jobs still finish. Users think it takes about thirty seconds longer than last month. No deadline, nobody blocked.',
    priority: 'P4',
    priorityWhy: 'Nothing is broken and nobody is blocked. Logging it honestly as low is what keeps capacity free for the P1 that arrives at 16:45.',
    actions: [
      { id: 'a', text: 'Drop the current ticket and look at it now' },
      { id: 'b', text: 'Log it and schedule it into the next site visit' },
      { id: 'c', text: 'Rebuild the print server' },
      { id: 'd', text: 'Ask for budget for a new printer' }
    ],
    correct: 'b',
    actionWhy: 'Log it, schedule it and tell them when you will be there. Low priority does not mean ignored. It means planned.'
  }
];

/* ================================================================ CONSOLE
 * Each command returns lines. A line can be a string or {w: ms, t: text, c: class}.
 * Classes: 'ok', 'err'. Names are matched case-insensitively; aliases point at a key. */
var CONSOLE = {
  boot: [
    'Motheo admin console, simulated environment.',
    'Nothing typed here reaches a real tenant.',
    "Type 'help' to see what is available.",
    ''
  ],
  aliases: { 'get-mguser': 'users', 'get-exomailbox': 'get-mailbox', 'ls': 'help', '?': 'help', 'cls': 'clear', 'test-netconnection': 'ping' },
  commands: {
    help: function () { return [
      'Commands',
      '',
      '  whoami          operator and role',
      '  sites           centres supported',
      '  ticket-stats    queue summary for a sample month',
      '  sla             targets by priority',
      '  m365-status     tenant service health',
      '  users           recent directory activity (Get-MgUser)',
      '  get-mailbox     mailbox size and quota',
      '  3cx-status      phone system extensions',
      '  assets          asset register summary',
      '  ping <host>     reachability check',
      '  certs           certifications and study plan',
      '  lang <en|st|zu> change the site language',
      '  contact         how to reach me',
      '  history         commands you have run',
      '  clear           clear the console',
      ''
    ]; },
    whoami: function () { return [
      'operator : naledi.motheo',
      'role     : IT Officer, Afrika Tikkun',
      'scope    : 600+ staff, 6 centres, M365, Entra ID, AD DS, Intune, 3CX',
      'reports  : Group Head, IT and Systems',
      ''
    ]; },
    sites: function () { return [
      { w: 250, t: 'Reading site list...' },
      '',
      '  CENTRE          REGION        SUPPORT',
      '  Hyde Park       Johannesburg  on site, base',
      '  Randburg        Johannesburg  on site',
      '  Orange Farm     Johannesburg  on site',
      '  Maponya         Johannesburg  on site',
      '  Cape Town       Western Cape  remote, courier',
      '  Durban          KwaZulu-Natal remote, courier',
      ''
    ]; },
    'ticket-stats': function () { return [
      { w: 320, t: 'Querying incident records (sample month)...' },
      '',
      '  PRIORITY  RAISED  RESOLVED  WITHIN SLA',
      '  P1             3         3        100%',
      '  P2            21        21         95%',
      '  P3            58        56         97%',
      '  P4            24        19         n/a',
      '',
      '  first-contact resolution : 71%',
      '  reopened                 : 2',
      ''
    ]; },
    sla: function () { return [
      '  PRIORITY  RESPONSE  RESOLUTION  MEANING',
      '  P1             15m          4h  business stopped, no workaround',
      '  P2             30m          8h  blocked user or degraded service',
      '  P3              4h          3d  workaround available',
      '  P4              1d         10d  scheduled work',
      ''
    ]; },
    'm365-status': function () { return [
      { w: 380, t: 'Connecting to Microsoft 365 admin centre...' },
      { w: 420, t: 'Authenticated. Reading Service Health...' },
      '',
      '  SERVICE              STATUS',
      { t: '  Exchange Online      Healthy', c: 'ok' },
      { t: '  SharePoint Online    Healthy', c: 'ok' },
      { t: '  Microsoft Teams      Healthy', c: 'ok' },
      { t: '  Entra ID             Healthy', c: 'ok' },
      { t: '  Microsoft Intune     Advisory IT884120', c: 'err' },
      '',
      '  1 advisory open: some devices report compliance late. No action needed on our side.',
      ''
    ]; },
    users: function () { return [
      { w: 300, t: 'Get-MgUser -Top 5 -Property displayName,signInActivity' },
      '',
      '  USER           LAST SIGN-IN  MFA      STATE',
      '  t.mabaso       2h ago        Enabled  Active',
      '  s.nkosi        14m ago       Enabled  Active',
      { t: '  j.venter       6d ago        Enabled  Blocked (leaver, sessions revoked)', c: 'err' },
      '  new.starter    never         Pending  Licence assigned',
      '  lab.shared     1d ago        n/a      Kiosk, restricted',
      ''
    ]; },
    'get-mailbox': function () { return [
      { w: 300, t: 'Connecting to Exchange Online...' },
      '',
      '  MAILBOX          SIZE     QUOTA   ARCHIVE',
      '  Finance shared   41.2 GB  50 GB   Enabled',
      { t: '  Payroll          47.9 GB  50 GB   Disabled   <- archive and retention needed', c: 'err' },
      '  Reception         8.4 GB  50 GB   Disabled',
      ''
    ]; },
    '3cx-status': function () { return [
      { w: 280, t: 'Polling PBX...' },
      '',
      '  EXT  DEVICE           STATE',
      { t: '  100  Reception        Registered', c: 'ok' },
      { t: '  101  Finance          Registered', c: 'ok' },
      { t: '  102  Programmes       Registered', c: 'ok' },
      { t: '  110  Meeting room     Not registered   <- check port and PoE', c: 'err' },
      '',
      '  3 of 4 extensions registered.',
      ''
    ]; },
    assets: function () { return [
      { w: 300, t: 'Reconciling register against Intune...' },
      '',
      '  CLASS       IN REGISTER  IN INTUNE  NOTE',
      '  Laptops            612        604  8 in transit or repair',
      '  Desktops           318        318',
      '  Printers            96         -   not managed by Intune',
      '  Handsets            88         -   tracked in 3CX',
      '',
      '  Every gap above has a written note against it. If it is not written down, it is missing.',
      ''
    ]; },
    certs: function () { return [
      '  EARNED',
      '    SC-900  Security, Compliance and Identity Fundamentals   Oct 2026',
      '    AZ-900  Azure Fundamentals                               Sep 2026',
      '    MS-900  Microsoft 365 Fundamentals                       Nov 2025',
      '    Google IT Support, Google Data Analytics                 2022',
      '    Oracle Certified Associate, Java SE 8                    2023',
      '',
      '  IN PROGRESS',
      '    CompTIA A+ and Network+',
      '    Higher Certificate in IT (NQF 5), Richfield, Jun 2027',
      '',
      '  NEXT',
      '    AZ-104  Azure Administrator Associate                    Jan 2027',
      ''
    ]; },
    contact: function () { return [
      '  email     motheomnaledi@gmail.com',
      '  linkedin  linkedin.com/in/naledi-motheo-it',
      '  based     Johannesburg, open to relocation',
      ''
    ]; }
  }
};

/* ================================================================ LIFECYCLE
 * needs: steps that must be done first. why: shown when someone jumps ahead.
 * Several orders are valid; only real dependencies are enforced. */
var LIFECYCLE = {
  join: {
    name: 'New starter: Lerato K., Programme Coordinator, Orange Farm',
    steps: [
      { id: 'hr', t: 'Confirm role, start date and manager with HR', needs: [] },
      { id: 'acct', t: 'Create the account in Active Directory, in the right OU', needs: ['hr'],
        why: 'Confirm the role with HR first. The OU, groups and licence all follow from it.' },
      { id: 'groups', t: 'Add to the security groups and distribution lists for the role', needs: ['acct'],
        why: 'There is no account to add to groups yet.' },
      { id: 'lic', t: 'Assign the Microsoft 365 licence once the account has synced', needs: ['acct'],
        why: 'The account has to exist and sync to Entra ID before it can be licensed.' },
      { id: 'mfa', t: 'Issue a temporary password and the MFA registration link', needs: ['lic'],
        why: 'Without a licence there is no mailbox and nothing useful to sign in to.' },
      { id: 'device', t: 'Enrol the laptop in Intune and record the asset tag in the register', needs: ['acct'],
        why: 'Intune assigns the device to a user. Create the user first.' },
      { id: 'phone', t: 'Create the 3CX extension and add it to the right queue', needs: ['hr'],
        why: 'Which queue depends on the role. Check with HR first.' },
      { id: 'hand', t: 'Hand over the laptop and walk them through first sign-in', needs: ['mfa', 'device', 'groups', 'phone'],
        why: 'They would arrive to missing access. Finish everything else first.' }
    ]
  },
  leave: {
    name: 'Leaver: J. Venter, Finance Officer, last day Friday',
    steps: [
      { id: 'hr', t: 'Get the last working day from HR in writing', needs: [] },
      { id: 'block', t: 'Block sign-in and revoke all active sessions', needs: ['hr'],
        why: 'Get the date in writing first. Blocking someone a day early is an HR problem, not an IT one.' },
      { id: 'mail', t: 'Convert the mailbox to shared and give the manager access', needs: ['block'],
        why: 'Block sign-in first, so nothing new is sent from the account while you work.' },
      { id: 'drive', t: 'Transfer OneDrive files to the manager', needs: ['block'],
        why: 'Block sign-in first, so files cannot be changed or removed during the handover.' },
      { id: 'groups', t: 'Remove from groups, distribution lists and shared mailboxes', needs: ['block'],
        why: 'Block the account first. Removing groups from a live account just gets a ticket asking for them back.' },
      { id: 'lic', t: 'Remove the Microsoft 365 licence', needs: ['mail', 'drive'],
        why: 'Removing the licence starts the clock on deleting the mailbox and OneDrive. Convert and transfer first.' },
      { id: 'phone', t: 'Disable the 3CX extension and forward its calls', needs: ['hr'],
        why: 'Confirm the date first so calls are not dropped while they are still working.' },
      { id: 'device', t: 'Collect the laptop, wipe it and update the asset register', needs: ['drive'],
        why: 'Transfer OneDrive first. Wiping early can lose local files that never synced.' },
      { id: 'close', t: 'Close the ticket with every action recorded', needs: ['lic', 'groups', 'phone', 'device'],
        why: 'There are steps still open. A closed ticket with gaps is worse than an open one.' }
    ]
  }
};

/* ================================================================ NETWORK
 * One fault is picked at random. Each test costs minutes and returns log lines
 * plus which nodes it proves good or bad. Only one fix is correct per fault. */
var NETWORK = {
  title: 'Orange Farm, Computer Lab 2: no internet on any PC',
  nodes: [
    { id: 'pc', x: 20, label: 'OF-LAB2-07', sub: 'lab PC' },
    { id: 'sw', x: 160, label: 'Lab switch', sub: 'room switch' },
    { id: 'core', x: 300, label: 'Core switch', sub: 'server room' },
    { id: 'fw', x: 440, label: 'Firewall', sub: 'DHCP and DNS' },
    { id: 'isp', x: 580, label: 'Fibre', sub: 'ISP link' }
  ],
  tests: [
    { id: 'ipconfig', t: 'ipconfig /all on the PC', min: 1 },
    { id: 'gw', t: 'Ping the default gateway', min: 1 },
    { id: 'wan', t: 'Ping 8.8.8.8', min: 1 },
    { id: 'dns', t: 'nslookup microsoft.com', min: 1 },
    { id: 'peer', t: 'Check a second PC in the lab', min: 2 },
    { id: 'lights', t: 'Walk to the lab switch and check the port lights', min: 4 },
    { id: 'dash', t: 'Open the firewall dashboard', min: 3 }
  ],
  fixes: [
    { id: 'reseat', t: 'Reseat the lab switch uplink', min: 5 },
    { id: 'scope', t: 'Clear stale leases and widen the DHCP scope', min: 6 },
    { id: 'resolver', t: 'Fix the DNS forwarders on the firewall', min: 4 },
    { id: 'isp', t: 'Log a fault with the fibre provider', min: 10 },
    { id: 'reimage', t: 'Reimage the PC', min: 45 }
  ],
  faults: {
    uplink: {
      fix: 'reseat',
      story: 'The uplink from the lab switch to the core had been knocked loose. Every PC in the room lost DHCP at once, which is why a second PC told you as much as the first.',
      r: {
        ipconfig: [['IPv4 Address . . : 169.254.12.40 (autoconfigured)', 'bad'], 'Default Gateway  : none', ['No DHCP reply. The PC is not reaching the network at all.', 'bad']],
        gw: [['Request timed out. x4', 'bad']],
        wan: [['PING: transmit failed. General failure.', 'bad']],
        dns: [['DNS request timed out.', 'bad']],
        peer: [['OF-LAB2-03 also has 169.254.x.x. The whole room is affected.', 'bad']],
        lights: ['Ports 1-23: link lights on (PCs connected).', ['Port 24 (uplink): no light.', 'bad']],
        dash: ['WAN: up, 0.4% loss. DHCP pool LAB2: 31 of 200 leases in use.', ['No traffic from the LAB2 VLAN in the last 40 minutes.', 'bad']]
      },
      marks: { ipconfig: { pc: 'bad' }, gw: { sw: 'bad' }, peer: { sw: 'bad' }, lights: { sw: 'bad' }, dash: { fw: 'good', isp: 'good', core: 'good' } },
      link: 'sw-core'
    },
    dhcp: {
      fix: 'scope',
      story: 'The DHCP pool for the lab was full of stale leases from a previous training group. PCs that already had an address carried on; anything that rebooted got nothing.',
      r: {
        ipconfig: [['IPv4 Address . . : 169.254.88.3 (autoconfigured)', 'bad'], 'Default Gateway  : none', ['No DHCP offer received.', 'bad']],
        gw: [['Request timed out. x4', 'bad']],
        wan: [['PING: transmit failed. General failure.', 'bad']],
        dns: [['DNS request timed out.', 'bad']],
        peer: [['OF-LAB2-03 has 10.20.2.41 and browses normally. It was not restarted today.', 'good']],
        lights: [['Ports 1-24 all lit, uplink included.', 'good']],
        dash: [['WAN: up.', 'good'], ['DHCP pool LAB2: 200 of 200 leases in use, 0 free.', 'bad']]
      },
      marks: { ipconfig: { pc: 'bad' }, peer: { sw: 'good', core: 'good' }, lights: { sw: 'good' }, dash: { fw: 'bad', isp: 'good' } }
    },
    dns: {
      fix: 'resolver',
      story: 'The DNS forwarders on the firewall pointed at a resolver that had been retired. Everything could reach the internet by IP address, so it looked like "no internet" without anything actually being down.',
      r: {
        ipconfig: [['IPv4 Address . . : 10.20.2.57', 'good'], 'Default Gateway  : 10.20.2.1', 'DNS Servers      : 10.20.0.1'],
        gw: [['Reply from 10.20.2.1: time=1ms', 'good']],
        wan: [['Reply from 8.8.8.8: time=18ms', 'good']],
        dns: [['DNS request timed out. Server: 10.20.0.1', 'bad'], ['*** UnKnown can\'t find microsoft.com', 'bad']],
        peer: ['OF-LAB2-03: same symptoms, valid address, pages do not load.'],
        lights: [['Ports 1-24 all lit, uplink included.', 'good']],
        dash: [['WAN: up. DHCP pool LAB2: 64 of 200 in use.', 'good'], ['DNS forwarders: 196.25.1.200 (no response in 24h).', 'bad']]
      },
      marks: { ipconfig: { pc: 'good' }, gw: { sw: 'good', core: 'good' }, wan: { isp: 'good' }, dns: { fw: 'bad' }, lights: { sw: 'good' }, dash: { fw: 'bad', isp: 'good' } }
    },
    isp: {
      fix: 'isp',
      story: 'The fibre link itself was down. Everything inside the building was healthy, which is exactly what the tests showed before the dashboard confirmed it. The useful work was proving that quickly, logging the fault and telling the centre.',
      r: {
        ipconfig: [['IPv4 Address . . : 10.20.2.57', 'good'], 'Default Gateway  : 10.20.2.1'],
        gw: [['Reply from 10.20.2.1: time=1ms', 'good']],
        wan: [['Request timed out. x4', 'bad']],
        dns: [['DNS request timed out.', 'bad']],
        peer: ['OF-LAB2-03: same symptoms, valid address.'],
        lights: [['Ports 1-24 all lit, uplink included.', 'good']],
        dash: [['WAN: DOWN since 08:12. PPPoE: no response from provider.', 'bad']]
      },
      marks: { ipconfig: { pc: 'good' }, gw: { sw: 'good', core: 'good' }, wan: { isp: 'bad' }, lights: { sw: 'good' }, dash: { isp: 'bad', fw: 'good' } },
      link: 'fw-isp'
    }
  }
};
