import React, { useState } from 'react';
import { TrendingUp, Flame, ShieldAlert, ShieldCheck, Zap, DollarSign, Target, Award } from 'lucide-react';

/**
 * OutcomeChart for StakeGuard (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $2,500/mo executive accountability coaches & lost deep-work hours ($6 human services)
 * with Autonomous Behavioral Financial Escrow & Anti-Charity Stakes ($1 software autopilot).
 */
export default function OutcomeChart({
  serviceName = "Autonomous Loss-Aversion Escrow & Focus Enforcement",
  defaultStake = 50,
  onCtaClick
}) {
  const [stakePerDay, setStakePerDay] = useState(defaultStake);

  // Legacy human services: $2,500/month human accountability coach + $3,200/mo lost billing from 2.5 hrs daily social media distraction
  const monthlyHumanCoachingCost = 2500;
  const monthlyLostProductivityValue = Math.round((stakePerDay / 50) * 3200);
  const totalLegacyCost = monthlyHumanCoachingCost + monthlyLostProductivityValue;

  // StakeGuard Software Autopilot: $9/mo flat subscription. 
  // With 98.4% commitment compliance, users forfeit <$15/mo in escrow stakes while reclaiming 40+ hours of billable focus.
  const autoSoftwareCost = 9 + Math.round(stakePerDay * 0.2); 
  const netValueCreated = totalLegacyCost - autoSoftwareCost;
  const savingsPercent = Math.round(((totalLegacyCost - autoSoftwareCost) / totalLegacyCost) * 100);

  const maxCost = Math.max(totalLegacyCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((autoSoftwareCost / maxCost) * 100), 6);

  return (
    <div className="relative rounded-2xl border border-rose-500/30 bg-stone-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-stone-900 border-rose-500/40 text-rose-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs $2,500/mo Human Coaches ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Focus Discipline Economics: <span className="text-rose-400">{savingsPercent}% Overhead Crushed</span>
          </h3>
          <p className="text-sm text-stone-300 mt-1 max-w-xl">
            Willpower fails. Human accountability coaches check in once a week after you’ve already lost 15 hours to Doomscrolling. StakeGuard puts real financial pain on every single impulse click.
          </p>
        </div>

        <div className="text-right bg-stone-900/80 border border-rose-500/30 rounded-xl p-3 px-4 min-w-[200px]">
          <span className="text-[11px] text-stone-400 block font-medium">Monthly Output Value Reclaimed</span>
          <span className="text-2xl md:text-3xl font-black text-rose-400">
            ${netValueCreated.toLocaleString()}
          </span>
          <span className="text-[10px] text-rose-300/80 flex items-center justify-end gap-1 font-semibold font-mono">
            <TrendingUp className="w-3 h-3" /> 98.4% Session Completion
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-white/10">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-stone-300 font-semibold flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            Financial Forfeit Stake Per Broken Session:
          </label>
          <span className="text-base font-bold text-white bg-stone-900 px-3 py-1 rounded-lg border border-rose-500/30 font-mono">
            ${stakePerDay} / session (${(totalLegacyCost * 12).toLocaleString()}/yr Distraction Drag)
          </span>
        </div>
        <input 
          type="range" 
          min={10} 
          max={250} 
          step={10}
          value={stakePerDay}
          onChange={(e) => setStakePerDay(Number(e.target.value))}
          className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
        />
        <div className="flex justify-between text-[11px] text-stone-500 mt-2 font-mono">
          <span>$10 (Casual Sting)</span>
          <span>$50 (High Executive Friction)</span>
          <span>$250+ (Uncompromising Loss Aversion)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-stone-900 rounded-xl p-5 border border-white/10">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4 flex items-center justify-between font-mono">
            <span>Monthly Cost & Friction Model</span>
            <span className="text-[10px] text-stone-500">Live Behavioral Model</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Human Coaches & Lost Billing ($6 Layer)
                </span>
                <span className="font-mono font-bold text-rose-300">${totalLegacyCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-stone-950 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-700 to-rose-500 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  StakeGuard Autonomous Escrow ($1 Layer)
                </span>
                <span className="font-mono font-bold text-emerald-300">${autoSoftwareCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-stone-950 rounded-lg overflow-hidden border border-emerald-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-lg shadow-lg shadow-emerald-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-stone-400">Annual Net Founder Value Reclaimed:</span>
            <span className="text-sm font-bold text-emerald-400">+${(netValueCreated * 12).toLocaleString()}</span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct Anti-Charity Escrow Dispatch</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Break your focus session before your scheduled hour, and funds transfer automatically to the political candidate or rival team you detest most.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Sub-Second Kernel/DNS Interception</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                No bypass codes. No snoozing alarms. Operating-system-level hosts isolation with zero software backdoor loopholes.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Loss-Aversion Triples Deep Work Volume</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Behavioral psychology proves humans work twice as hard to avoid losing $50 than to gain $50. Unlocks 4+ hours of unbroken flow state every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
