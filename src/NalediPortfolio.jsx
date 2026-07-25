import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Zap, Code, Users, Award, ExternalLink, Github, Mail, Linkedin } from 'lucide-react';

export default function NalediPortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [networkNodes, setNetworkNodes] = useState([]);

  // Generate network animation on load
  useEffect(() => {
    const nodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setNetworkNodes(nodes);
  }, []);

  // Animate network nodes (skipped entirely if the visitor prefers reduced motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let frame;
    let last = performance.now();

    const tick = (now) => {
      const steps = (now - last) / 30; // keep the original 30ms pacing
      last = now;
      setNetworkNodes(prev =>
        prev.map(node => ({
          ...node,
          x: (node.x + node.vx * steps + 100) % 100,
          y: (node.y + node.vy * steps + 100) % 100,
        }))
      );
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const skills = [
    { category: 'Infrastructure', items: ['Active Directory', 'Entra ID', 'Microsoft 365', 'SharePoint Online'] },
    { category: 'ITSM', items: ['Incident Management', 'ITIL Processes', 'MS Dynamics 365', 'SLA Compliance'] },
    { category: 'Cloud & Certs', items: ['AZ-900 (Azure)', 'CompTIA A+ (In Progress)', 'Higher Cert IT (NQF 5)'] },
    { category: 'Hands-On', items: ['Hardware Troubleshooting', 'Remote Support (AnyDesk/RDP)', 'Multi-Site Management', 'PC Repairs'] },
  ];

  const services = [
    { icon: <Zap className="w-6 h-6" />, title: 'PC Repairs & Setup', desc: 'Hardware diagnostics, software installation, system optimization for personal and small business use.' },
    { icon: <Code className="w-6 h-6" />, title: 'Web Design', desc: 'Custom websites and online presence for small businesses in Orange Farm and Johannesburg.' },
    { icon: <Users className="w-6 h-6" />, title: 'Tech Training', desc: 'Hands-on workshops on Microsoft 365, remote support, and foundational IT troubleshooting.' },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-100 min-h-screen font-sans">
      {/* Animated network background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
          {networkNodes.map((node, i) => (
            <circle key={i} cx={`${node.x}%`} cy={`${node.y}%`} r="2" fill="#d4a574" />
          ))}
          {networkNodes.slice(0, 6).map((node, i) => (
            <line key={`line-${i}`} x1={`${node.x}%`} y1={`${node.y}%`} x2={`${networkNodes[(i + 1) % 6].x}%`} y2={`${networkNodes[(i + 1) % 6].y}%`} stroke="#d4a574" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-lg tracking-tight">naledi.dev</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8">
            {['home', 'skills', 'work', 'tutorial', 'contact'].map(section => (
              <button key={section} onClick={() => setActiveSection(section)} className={`capitalize tracking-wide transition ${activeSection === section ? 'text-amber-500 font-semibold' : 'text-gray-400 hover:text-amber-400'}`}>
                {section}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 py-4 px-4 space-y-3">
            {['home', 'skills', 'work', 'tutorial', 'contact'].map(section => (
              <button key={section} onClick={() => { setActiveSection(section); setMobileMenuOpen(false); }} className="block w-full text-left capitalize py-2 text-gray-400 hover:text-amber-400 transition">
                {section}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main content */}
      <div className="pt-20 relative z-10">
        {/* HERO / HOME */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-2xl text-center space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                  Naledi Motheo
                </h1>
                <p className="text-2xl text-amber-400 font-light tracking-wide">IT Professional • Entrepreneur • Problem Solver</p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
                I manage infrastructure at Afrika Tikkun Services and build Motheo Digital Cafe—a tech services business delivering hands-on support, PC repairs, web design, and training across Johannesburg. My focus: ITIL-aligned incident management, Active Directory and cloud administration, and clear communication when systems fail.
              </p>

              <div className="pt-8 flex justify-center gap-4 flex-wrap">
                <button onClick={() => setActiveSection('skills')} className="px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded hover:bg-amber-400 transition">
                  View Skills
                </button>
                <button onClick={() => setActiveSection('contact')} className="px-6 py-3 border border-amber-500 text-amber-400 font-semibold rounded hover:bg-amber-500/10 transition">
                  Get in Touch
                </button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-12 max-w-md mx-auto text-sm">
                <div className="border-l-2 border-amber-500 pl-4">
                  <div className="text-2xl font-bold text-amber-400">2+</div>
                  <div className="text-gray-400">Years Exp.</div>
                </div>
                <div className="border-l-2 border-amber-500 pl-4">
                  <div className="text-2xl font-bold text-amber-400">100+</div>
                  <div className="text-gray-400">Tickets/mo</div>
                </div>
                <div className="border-l-2 border-amber-500 pl-4">
                  <div className="text-2xl font-bold text-amber-400">3</div>
                  <div className="text-gray-400">Sites Managed</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SKILLS */}
        {activeSection === 'skills' && (
          <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Skills & Expertise</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {skills.map((group, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-500/50 transition">
                    <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">{group.category}</h3>
                    <ul className="space-y-2">
                      {group.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-300">
                          <span className="text-amber-500 mt-1">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Certifications in progress */}
              <div className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-lg p-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Currently Pursuing
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="text-amber-400 font-semibold">CompTIA A+</div>
                    <div className="text-gray-400">In Progress</div>
                  </div>
                  <div>
                    <div className="text-amber-400 font-semibold">Azure Fundamentals (AZ-900)</div>
                    <div className="text-gray-400">Target: June 2026</div>
                  </div>
                  <div>
                    <div className="text-amber-400 font-semibold">Higher Certificate (NQF 5)</div>
                    <div className="text-gray-400">Richfield | July 2026 – June 2027</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* MOTHEO DIGITAL CAFE / WORK */}
        {activeSection === 'work' && (
          <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">Motheo Digital Cafe</h2>
              <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
                Building hands-on tech services in Orange Farm and across Johannesburg. Day job pays the bills; this is where I solve real problems for small businesses and individuals.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {services.map((service, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition">
                    <div className="text-amber-400 mb-3">{service.icon}</div>
                    <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                ))}
              </div>

              {/* Get started */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">Ready to fix something?</h3>
                <p className="text-gray-400 mb-6">Based in Johannesburg (public transport). Available for on-site and remote support.</p>
                <button onClick={() => setActiveSection('contact')} className="px-6 py-2 bg-amber-500 text-slate-900 font-semibold rounded hover:bg-amber-400 transition inline-block">
                  Contact Motheo Digital
                </button>
              </div>
            </div>
          </section>
        )}

        {/* INTERACTIVE TUTORIAL */}
        {activeSection === 'tutorial' && (
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Learn & Practice</h2>

              <TutorialSection />
            </div>
          </section>
        )}

        {/* CONTACT */}
        {activeSection === 'contact' && (
          <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>

              <div className="grid gap-6 mb-12">
                <a href="mailto:naledi@motheodigitalcafe.co.za" className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-500/50 transition flex items-center gap-4">
                  <Mail className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest">Email</div>
                    <div className="text-gray-100 font-semibold">naledi@motheodigitalcafe.co.za</div>
                  </div>
                </a>

                <a href="https://linkedin.com/in/naledi-motheo" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-500/50 transition flex items-center gap-4">
                  <Linkedin className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest">LinkedIn</div>
                    <div className="text-gray-100 font-semibold">Naledi Motheo</div>
                  </div>
                </a>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex items-center gap-4">
                  <Terminal className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest">Based In</div>
                    <div className="text-gray-100 font-semibold">Johannesburg, South Africa (Public Transport)</div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-8 text-center">
                <p className="text-gray-300">Available for: On-site & hybrid IT support roles, ITSM specialist positions, cloud-focused opportunities, and Motheo Digital Cafe consulting.</p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 mt-20 text-center text-gray-500 text-sm">
        <p>Built with React & Tailwind. Hosted on Naledi's learning journey.</p>
      </footer>
    </div>
  );
}

// Tutorial/Interactive section with games and sims
function TutorialSection() {
  const [activeTab, setActiveTab] = useState('cli-sim');

  return (
    <div className="space-y-8">
      {/* Tab selection */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setActiveTab('cli-sim')} className={`px-4 py-2 rounded transition ${activeTab === 'cli-sim' ? 'bg-amber-500 text-slate-900 font-semibold' : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-amber-500/50'}`}>
          CLI Simulator
        </button>
        <button onClick={() => setActiveTab('troubleshoot')} className={`px-4 py-2 rounded transition ${activeTab === 'troubleshoot' ? 'bg-amber-500 text-slate-900 font-semibold' : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-amber-500/50'}`}>
          Troubleshooting Game
        </button>
        <button onClick={() => setActiveTab('subnet')} className={`px-4 py-2 rounded transition ${activeTab === 'subnet' ? 'bg-amber-500 text-slate-900 font-semibold' : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-amber-500/50'}`}>
          Subnet Calculator
        </button>
      </div>

      {/* CLI Simulator */}
      {activeTab === 'cli-sim' && <CLISimulator />}

      {/* Troubleshooting Game */}
      {activeTab === 'troubleshoot' && <TroubleshootingGame />}

      {/* Subnet Calculator */}
      {activeTab === 'subnet' && <SubnetCalculator />}
    </div>
  );
}

// Simple CLI Simulator
function CLISimulator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Welcome to Motheo CLI Simulator', 'Type "help" for commands', '']);

  const commands = {
    help: 'Available commands: whoami, pwd, systeminfo, ad-users, m365-status, help, clear',
    whoami: 'naledi@motheodc | Role: IT Officer | Organization: Afrika Tikkun Foundation',
    pwd: '/home/naledi/projects/motheo-digital-cafe',
    systeminfo: 'OS: Ubuntu 22.04 LTS | AD: Entra ID Connected | Cloud: Azure (AZ-900 certified)',
    'ad-users': 'Users found: 142 active | Groups: 8 security groups | Last sync: 2 minutes ago',
    'm365-status': 'Exchange Online: ✓ | SharePoint: ✓ | Teams: ✓ | All licenses: ✓',
    clear: null,
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.toLowerCase().trim();
    const result = commands[trimmed];

    if (trimmed === 'clear') {
      setOutput(['']);
    } else if (result) {
      setOutput([...output, `$ ${cmd}`, result, '']);
    } else if (trimmed) {
      setOutput([...output, `$ ${cmd}`, `Command not found: ${trimmed}. Type "help" for commands.`, '']);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-amber-400" />
        <span className="text-sm font-mono text-gray-300">naledi@motheodc:~$</span>
      </div>

      <div className="p-4 font-mono text-sm text-gray-300 space-y-1 h-64 overflow-y-auto bg-slate-950">
        {output.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'text-amber-400' : 'text-gray-400'}>
            {line}
          </div>
        ))}
      </div>

      <div className="bg-slate-800 px-4 py-3 border-t border-slate-700 flex gap-2">
        <span className="text-amber-400 font-mono">$</span>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleCommand(input); setInput(''); } }} placeholder="Try: whoami, ad-users, m365-status" className="flex-1 bg-transparent outline-none font-mono text-gray-300 placeholder-gray-600" autoFocus />
      </div>
    </div>
  );
}

// Troubleshooting Game
function TroubleshootingGame() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const scenarios = [
    {
      issue: 'User reports: "I can\'t access my email in Outlook"',
      correct: 'check-license',
      options: [
        { text: 'Restart the user\'s computer', value: 'restart' },
        { text: 'Check if their M365 license is active', value: 'check-license' },
        { text: 'Reinstall Office', value: 'reinstall' },
      ],
      explain: 'License issues are the #1 cause of Exchange access problems. Always check before reinstalling.',
    },
    {
      issue: 'Five users report slow network on floor 2 in the morning',
      correct: 'network-check',
      options: [
        { text: 'Restart all 5 computers', value: 'restart-all' },
        { text: 'Check network switches and bandwidth usage', value: 'network-check' },
        { text: 'Update drivers on each machine', value: 'drivers' },
      ],
      explain: 'Multiple users = infrastructure issue, not individual device problem. Check the network first.',
    },
    {
      issue: 'User says: "SharePoint takes 30 seconds to load"',
      correct: 'cache-clear',
      options: [
        { text: 'Clear browser cache & cookies', value: 'cache-clear' },
        { text: 'Reinstall browser', value: 'reinstall-browser' },
        { text: 'Request new device from IT', value: 'new-device' },
      ],
      explain: 'Slow cloud apps usually mean stale cache. Clear it first before escalating.',
    },
  ];

  const scenario = scenarios[step];

  const handleAnswer = (value) => {
    if (value === scenario.correct) {
      setScore(score + 10);
      setTimeout(() => {
        if (step < scenarios.length - 1) {
          setStep(step + 1);
        } else {
          setGameOver(true);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        if (step < scenarios.length - 1) {
          setStep(step + 1);
        } else {
          setGameOver(true);
        }
      }, 1500);
    }
  };

  if (gameOver) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Game Complete!</h3>
        <p className="text-4xl font-bold text-amber-400 mb-6">{score} / 30 points</p>
        <p className="text-gray-400 mb-6">
          {score === 30 ? 'Perfect! You think like an ITSM professional.' : score >= 20 ? 'Good troubleshooting. Keep learning.' : 'Room to improve—remember: always diagnose before you fix.'}
        </p>
        <button onClick={() => { setStep(0); setScore(0); setGameOver(false); }} className="px-6 py-2 bg-amber-500 text-slate-900 font-semibold rounded hover:bg-amber-400 transition">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Scenario {step + 1} / {scenarios.length}</h3>
        <div className="text-amber-400 font-bold">Score: {score}</div>
      </div>

      <div className="bg-slate-900 border-l-4 border-amber-500 rounded p-4">
        <p className="text-gray-100 font-semibold">{scenario.issue}</p>
      </div>

      <div className="space-y-3">
        <p className="text-gray-400 text-sm">What's your first move?</p>
        {scenario.options.map((option, i) => (
          <button key={i} onClick={() => handleAnswer(option.value)} className="w-full text-left p-4 bg-slate-700/50 border border-slate-600 rounded hover:border-amber-500 hover:bg-slate-700 transition">
            {option.text}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-700 rounded p-4 text-sm text-gray-400">
        <span className="text-amber-400 font-semibold">Tip: </span>
        {scenario.explain}
      </div>
    </div>
  );
}

// Subnet Calculator
function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState(null);

  const calculateSubnet = () => {
    try {
      const parts = ip.split('.');
      if (parts.length !== 4) throw new Error('Invalid IP');

      const cidrNum = parseInt(cidr);
      if (cidrNum < 0 || cidrNum > 32) throw new Error('CIDR must be 0-32');

      const hostBits = 32 - cidrNum;
      const hostCount = Math.pow(2, hostBits) - 2;
      const blockSize = Math.pow(2, hostBits);

      const octets = parts.map(Number);
      const lastOctet = octets[3];
      const network = lastOctet - (lastOctet % blockSize);
      const broadcast = network + blockSize - 1;

      setResult({
        network: `${octets[0]}.${octets[1]}.${octets[2]}.${network}`,
        broadcast: `${octets[0]}.${octets[1]}.${octets[2]}.${broadcast}`,
        firstHost: `${octets[0]}.${octets[1]}.${octets[2]}.${network + 1}`,
        lastHost: `${octets[0]}.${octets[1]}.${octets[2]}.${broadcast - 1}`,
        hosts: hostCount,
        mask: cidrToDottedDecimal(cidrNum),
      });
    } catch (e) {
      setResult({ error: e.message });
    }
  };

  const cidrToDottedDecimal = (cidr) => {
    let mask = 0xffffffff << (32 - cidr);
    return [(mask >>> 24) & 0xff, (mask >>> 16) & 0xff, (mask >>> 8) & 0xff, mask & 0xff].join('.');
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
      <p className="text-gray-400">Quick subnet math for network planning and troubleshooting.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">IP Address</label>
          <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="192.168.1.0" className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-gray-100 outline-none focus:border-amber-500" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">CIDR Notation (/)</label>
          <input type="number" value={cidr} onChange={(e) => setCidr(e.target.value)} min="0" max="32" className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-gray-100 outline-none focus:border-amber-500" />
        </div>
      </div>

      <button onClick={calculateSubnet} className="w-full bg-amber-500 text-slate-900 font-semibold py-2 rounded hover:bg-amber-400 transition">
        Calculate
      </button>

      {result && !result.error && (
        <div className="bg-slate-900 rounded-lg p-6 space-y-4 text-sm font-mono">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500 text-xs">Network</div>
              <div className="text-amber-400 font-bold">{result.network}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Broadcast</div>
              <div className="text-amber-400 font-bold">{result.broadcast}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">First Host</div>
              <div className="text-amber-400">{result.firstHost}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Last Host</div>
              <div className="text-amber-400">{result.lastHost}</div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Usable Hosts:</span>
              <span className="text-gray-100 font-semibold">{result.hosts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Subnet Mask:</span>
              <span className="text-gray-100 font-semibold">{result.mask}</span>
            </div>
          </div>
        </div>
      )}

      {result?.error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded p-4 text-red-300 text-sm">
          Error: {result.error}
        </div>
      )}
    </div>
  );
}
