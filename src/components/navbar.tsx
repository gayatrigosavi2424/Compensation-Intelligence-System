import Link from "next/link";
import { BarChart3, Search, Scale, Plus } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
            <BarChart3 size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Comp<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Intel</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/salaries" className="flex items-center gap-2 hover:text-white transition-colors">
            <Search size={16} />
            <span className="hidden sm:inline">Explore</span>
          </Link>
          <Link href="/compare" className="flex items-center gap-2 hover:text-white transition-colors">
            <Scale size={16} />
            <span className="hidden sm:inline">Compare</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>
          <Link href="/ingest" className="hidden md:flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/5 px-4 py-2 text-white transition-all shadow-sm">
            <Plus size={16} className="mr-1" />
            Add Salary
          </Link>
        </div>
      </div>
    </nav>
  );
}
