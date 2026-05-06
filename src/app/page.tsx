import Link from "next/link";
import { ArrowRight, Search, TrendingUp, ShieldCheck, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-slate-950 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 py-32 md:py-48 flex flex-col items-center text-center max-w-5xl relative z-10">
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 shadow-[0_0_8px_#818cf8]"></span>
            Data-driven compensation insights
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Stop guessing.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 animate-pulse">
              Start comparing.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 mb-10 max-w-3xl leading-relaxed">
            The definitive compensation intelligence platform built on standardized levels. Because an "SDE 2" at a startup is not an L4 at Google.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link
              href="/salaries"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_50px_rgba(99,102,241,0.7)] hover:scale-105 transition-all active:scale-95"
            >
              Explore Salaries
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-md px-8 py-4 text-lg font-semibold text-white hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
            >
              Compare Offers
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="w-full bg-slate-950/50 border-t border-slate-900 py-24 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/60 shadow-2xl hover:bg-slate-800/50 transition-colors group">
              <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Levels &gt; Titles</h3>
              <p className="text-slate-400 leading-relaxed">
                We standardize compensation data by universally recognized levels (L3, L4, L5) rather than relying on ambiguous job titles.
              </p>
            </div>
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/60 shadow-2xl hover:bg-slate-800/50 transition-colors group">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Total Compensation</h3>
              <p className="text-slate-400 leading-relaxed">
                Get the full picture. Our system strictly breaks down base salary, performance bonuses, and equity grants.
              </p>
            </div>
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/60 shadow-2xl hover:bg-slate-800/50 transition-colors group">
              <div className="h-14 w-14 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all">
                <Database size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Actionable Intel</h3>
              <p className="text-slate-400 leading-relaxed">
                Filter by company, role, level, and location to find exactly what your peers are making in today's market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
