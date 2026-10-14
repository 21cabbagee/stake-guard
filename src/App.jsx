import React, { useState, useId } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Flame, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  EyeOff, 
  Award, 
  Smartphone, 
  ArrowRight, 
  Zap, 
  CreditCard,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ParticlesCanvas from './components/ParticlesCanvas';
import OutcomeChart from './components/OutcomeChart';

const ANTI_CHARITIES = [
  { id: 'rival-pac', name: 'Rival Political Action Committee (PAC)', desc: 'Funds political candidates you vigorously oppose. Maximum psychological pain.' },
  { id: 'rival-team', name: 'Hated Sports Team Fan Trust', desc: 'Direct contribution to the championship celebration of your fiercest athletic rival.' },
  { id: 'givewell', name: 'Effective Altruism Malaria Consortium', desc: 'Saves real human lives while chastising your lack of deep work discipline.' },
  { id: 'burn-vault', name: 'Escrow Burn Protocol', desc: 'Funds permanently locked and burned into zero-address liquidity.' }
];

const BLOCKED_SITES = [
  { id: 'x', name: 'X / Twitter', domain: 'x.com', icon: '𝕏', defaultBlocked: true },
  { id: 'yt', name: 'YouTube', domain: 'youtube.com', icon: '▶️', defaultBlocked: true },
  { id: 'reddit', name: 'Reddit', domain: 'reddit.com', icon: '👾', defaultBlocked: true },
  { id: 'insta', name: 'Instagram', domain: 'instagram.com', icon: '📸', defaultBlocked: true },
  { id: 'tiktok', name: 'TikTok', domain: 'tiktok.com', icon: '🎵', defaultBlocked: false }
];

export default function App() {
  const penaltyStakeId = useId();
  const antiCharityId = useId();
  const focusEndHourId = useId();

  // Escrow Configuration
  const [stakeAmount, setStakeAmount] = useState('25');
  const [selectedRecipient, setSelectedRecipient] = useState('rival-pac');
  const [focusEndHour, setFocusEndHour] = useState('17:00');
  const [activeSession, setActiveSession] = useState(true);
  const [blockedList, setBlockedList] = useState(['x', 'yt', 'reddit', 'insta']);

  // Simulation State
  const [simulatedAttempt, setSimulatedAttempt] = useState(null);
  const [escrowPaidReceipt, setEscrowPaidReceipt] = useState(null);
  const [penaltyLog, setPenaltyLog] = useState([]);

  // CAB Modal
  const [isCabModalOpen, setIsCabModalOpen] = useState(false);
  const [cabSubmitted, setCabSubmitted] = useState(false);
  const [cabForm, setCabForm] = useState({
    name: '',
    role: '',
    email: '',
    focusGoal: 'Deep Work 4+ Hours / Day'
  });

  const toggleSite = (id) => {
    setBlockedList(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSimulateDistraction = (site) => {
    setSimulatedAttempt(site);
    setEscrowPaidReceipt(null);
  };

  const handleAuthorizeForfeit = () => {
    const fee = parseInt(stakeAmount);
    const recipient = ANTI_CHARITIES.find(c => c.id === selectedRecipient)?.name || 'Anti-Charity';
    const newReceipt = {
      id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
      site: simulatedAttempt?.name || 'Social Media',
      amount: fee,
      recipient,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };
    setEscrowPaidReceipt(newReceipt);
    setPenaltyLog(prev => [newReceipt, ...prev]);
    setSimulatedAttempt(null);
  };

  const handleCabSubmit = (e) => {
    e.preventDefault();
    setCabSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Banner: CAB Invitation */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 border-b border-rose-500/30 px-4 py-2.5 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="font-semibold text-rose-300">Customer Advisory Board (CAB) Open:</span>
            <span className="text-slate-300">Join 10 high-output founders and engineers testing loss-aversion stakes for 70% off ($9/mo).</span>
          </div>
          <button 
            onClick={() => setIsCabModalOpen(true)}
            className="px-3 py-1 bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs rounded-full transition-all shadow-sm hover:scale-105"
          >
            Claim CAB Seat (3 Spots Left) →
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-700 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white font-black text-xl">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">StakeGuard</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">Stripe Escrow</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">Financial Loss-Aversion Focus Blocker</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#configurator" className="hover:text-rose-400 transition-colors">Stake Engine</a>
            <a href="#simulator" className="hover:text-rose-400 transition-colors">Block Screen Sandbox</a>
            <a href="#audit-log" className="hover:text-rose-400 transition-colors">Penalty Audit Log</a>
            <a href="#pricing" className="hover:text-rose-400 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCabModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-bold text-xs rounded-lg transition-all shadow-md shadow-rose-500/20 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Join CAB</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <ParticlesCanvas color="244, 63, 94" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(244,63,94,0.12),transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 text-xs text-rose-300 font-mono shadow-lg shadow-rose-950/40">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Kahneman & Tversky Behavioral Loss Aversion • Hard Kernel-Level DNS Block</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Financial Escrow Screen Time Blocker with <span className="bg-gradient-to-r from-rose-400 via-red-300 to-amber-300 bg-clip-text text-transparent">Loss-Aversion Stakes</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Screen time limits fail because clicking "Ignore for 15 Minutes" costs nothing. StakeGuard backs your focus commitments with cold hard cash. Unlocking YouTube or Twitter before 5 PM automatically charges $25 to your designated anti-charity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#simulator" 
              className="px-6 py-3.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-rose-500/30 flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Test Emergency Forfeit Screen</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#configurator" 
              className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-rose-500/30 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 hover:border-rose-400/60"
            >
              <Lock className="w-4 h-4 text-rose-400" />
              <span>Configure Stake Parameters</span>
            </a>
          </div>

          {/* Market TAM & Loss-Aversion Metrics */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-slate-900/80 border border-rose-500/20 rounded-xl p-4 backdrop-blur-md">
              <div className="text-2xl font-black text-rose-400">$1.44B</div>
              <div className="text-xs text-slate-400 font-medium">Knowledge Worker TAM</div>
            </div>
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              <div className="text-2xl font-black text-white">4.2x</div>
              <div className="text-xs text-slate-400 font-medium">Loss Aversion Habit Multiplier</div>
            </div>
            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-md">
              <div className="text-2xl font-black text-emerald-400">96.8%</div>
              <div className="text-xs text-slate-400 font-medium">Focus Session Completion Rate</div>
            </div>
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              <div className="text-2xl font-black text-white">$25.00</div>
              <div className="text-xs text-slate-400 font-medium">Optimal Stake Threshold</div>
            </div>
          </div>
        </div>
      </section>

      {/* Julien Bek $1:$6 Sequoia Framework + Bklit UI Outcome Engine */}
      <section className="px-4 sm:px-6 lg:px-8">
        <OutcomeChart onCtaClick={() => setIsCabModalOpen(true)} />
      </section>

      {/* Feature 1: Stake Configuration Engine */}
      <section id="configurator" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-rose-400 text-xs font-bold uppercase tracking-wider">Escrow Rules & Targets</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Deep Work Commitment Vault
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Focus Lock (Until {focusEndHour})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <label htmlFor={penaltyStakeId} className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Financial Penalty Stake (Charged on Bypass):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['10', '25', '50', '100'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setStakeAmount(val)}
                      className={`py-2 rounded-lg text-xs font-black transition-all ${
                        stakeAmount === val
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor={antiCharityId} className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Forfeited Funds Destination (Anti-Charity Protocol):
                </label>
                <select 
                  id={antiCharityId}
                  value={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  {ANTI_CHARITIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1.5 italic">
                  {ANTI_CHARITIES.find(c => c.id === selectedRecipient)?.desc}
                </p>
              </div>

              <div>
                <label htmlFor={focusEndHourId} className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Daily Hard Lock Until:
                </label>
                <input 
                  id={focusEndHourId}
                  type="time" 
                  value={focusEndHour}
                  onChange={(e) => setFocusEndHour(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <div className="block text-xs font-semibold text-slate-300 mb-2">
                  Blocked Distraction Vault:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {BLOCKED_SITES.map((site) => {
                    const isBlocked = blockedList.includes(site.id);
                    return (
                      <button
                        key={site.id}
                        onClick={() => toggleSite(site.id)}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                          isBlocked
                            ? 'bg-rose-950/30 border-rose-500/50 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{site.icon}</span>
                          <span>{site.name}</span>
                        </span>
                        <span>{isBlocked ? '🔒 Locked' : '○'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Interactive Distraction Trigger */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-rose-500/30 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Live Interception Sandbox</span>
                <span className="text-xs text-slate-400">Click a site to simulate distraction attempt</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {BLOCKED_SITES.filter(s => blockedList.includes(s.id)).map((site) => (
                  <button
                    key={site.id}
                    onClick={() => handleSimulateDistraction(site)}
                    className="p-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-left transition-all hover:border-rose-500/50 group"
                  >
                    <div className="text-xl mb-1">{site.icon}</div>
                    <div className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">
                      Open {site.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">https://{site.domain}</div>
                  </button>
                ))}
              </div>

              {/* Interception Dialog inside Sandbox */}
              {simulatedAttempt && (
                <div className="bg-rose-950/40 border-2 border-rose-500 rounded-xl p-5 animate-fadeIn space-y-4">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>FOCUS INTERCEPTION: {simulatedAttempt.name} BLOCKED</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You committed to zero social browsing until <strong>{focusEndHour}</strong>. Unlocking 15 minutes of access requires immediate forfeiture of <strong className="text-rose-400">${stakeAmount}.00</strong> to <strong>{ANTI_CHARITIES.find(c => c.id === selectedRecipient)?.name}</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={handleAuthorizeForfeit}
                      className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-all shadow-md shadow-rose-600/30 flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Forfeit ${stakeAmount} & Unlock 15 Mins</span>
                    </button>
                    <button
                      onClick={() => setSimulatedAttempt(null)}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-xs rounded-lg transition-colors"
                    >
                      Return to Deep Work
                    </button>
                  </div>
                </div>
              )}

              {/* Success / Forfeit Receipt */}
              {escrowPaidReceipt && (
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>RECEIPT: ESCROW FORFEITURE PROCESSED</span>
                    <span>{escrowPaidReceipt.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Bypass site: {escrowPaidReceipt.site} | Time: {escrowPaidReceipt.time}
                  </div>
                  <div className="text-sm font-bold text-rose-400">
                    Charge: -${escrowPaidReceipt.amount}.00 transferred to {escrowPaidReceipt.recipient}
                  </div>
                  <div className="text-[10px] text-emerald-400 pt-1">
                    ✓ 15-minute temporary browser tunnel granted. Timer running.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-rose-400 text-xs font-bold uppercase tracking-wider">Focus Tiers</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Guaranteed Behavior Modification
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              If you don't break limits, you only pay the subscription fee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Solo Tier */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-base font-bold text-white">Solo Focus</div>
                <div className="text-xs text-slate-400 mt-1">For students & remote workers</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$15</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Browser extension hard DNS blocker</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Fixed $10/penalty loss aversion stakes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Standard charity recipient pool</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Start Trial
              </button>
            </div>

            {/* Pro Stakeholder (Highlighted) */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-rose-500/50 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-rose-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                Most Popular
              </div>
              <div>
                <div className="text-base font-bold text-white">Pro Stakeholder</div>
                <div className="text-xs text-slate-400 mt-1">For founders, software engineers & writers</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-rose-400">$30</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Custom penalty stakes ($25 - $250)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Anti-charity political routing engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>OS-level screen & app lockout (Mac/Windows)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Emergency bypass cooldown timers</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-500/20"
              >
                Join CAB for 70% Off ($9/mo)
              </button>
            </div>

            {/* High-Performance Team Tier */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-base font-bold text-white">Engineering Squad</div>
                <div className="text-xs text-slate-400 mt-1">For startup teams & engineering cohorts</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$99</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Group sprint escrow pools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Slack deep work team status sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Leaderboard & team focus analytics</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Deploy to Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">StakeGuard</span>
            <span>• Financial Escrow Screen Time Blocker with Loss-Aversion Stakes</span>
          </div>
          <div>
            Loss-aversion psychology backed by automated Stripe escrow authorization.
          </div>
        </div>
      </footer>

      {/* CAB 10-Member Modal */}
      {isCabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setIsCabModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {!cabSubmitted ? (
              <form onSubmit={handleCabSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Award className="w-5 h-5" />
                  <span>StakeGuard Customer Advisory Board (CAB)</span>
                </div>
                <h3 className="text-xl font-black text-white">Claim 70% Founding Lifetime Rate</h3>
                <p className="text-xs text-slate-400">
                  Join 10 intense founders & developers testing our loss-aversion protocol. Lock lifetime access at $9/mo (normally $30/mo).
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label htmlFor="user-name" className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input 
                      id="user-name"
                      type="text" 
                      placeholder="e.g. David Karp"
                      value={cabForm.name}
                      onChange={(e) => setCabForm({ ...cabForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="role-company" className="block text-xs font-semibold text-slate-300 mb-1">Role & Company</label>
                    <input 
                      id="role-company"
                      type="text" 
                      placeholder="e.g. Lead Engineer @ Scale"
                      value={cabForm.role}
                      onChange={(e) => setCabForm({ ...cabForm, role: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cab-email" className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                    <input 
                      id="cab-email"
                      type="email" 
                      placeholder="david@scale.com"
                      value={cabForm.email}
                      onChange={(e) => setCabForm({ ...cabForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-4 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-rose-500/25"
                >
                  Reserve CAB Seat & Lock $9/mo
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-black text-white">CAB Reservation Confirmed</h3>
                <p className="text-xs text-slate-300">
                  Welcome aboard, <strong className="text-white">{cabForm.name}</strong>! Your 70% founding discount ($9/mo) has been reserved.
                </p>
                <button 
                  onClick={() => { setIsCabModalOpen(false); setCabSubmitted(false); }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  Return to Focus Engine
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
