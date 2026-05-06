"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, Building2, Users, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

type CompanyData = {
  company: string;
  medianCompensation: number;
  totalEntries: number;
  levelDistribution: Array<{
    level: string;
    count: number;
    averageCompensation: number;
  }>;
  recentSalaries: Array<any>;
};

export default function CompanyPage({ params }: { params: { company: string } }) {
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/company/${params.company}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => {
        setData(json.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params.company]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Company Not Found</h2>
        <p className="text-slate-400 mb-8">We don't have enough verified data for this company yet.</p>
        <Link href="/salaries" className="text-indigo-400 hover:text-indigo-300 hover:underline">
          &larr; Back to Salaries
        </Link>
      </div>
    );
  }

  const chartData = data.levelDistribution.sort((a, b) => a.level.localeCompare(b.level));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 text-white p-4 rounded-xl shadow-2xl text-sm">
          <p className="font-bold text-lg mb-2 text-indigo-400">Level: {label}</p>
          <p className="mb-1">Avg Total: <span className="font-semibold text-white">{formatCurrency(payload[0].value)}</span></p>
          <p className="text-slate-400">Data points: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/salaries" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-8 transition-colors bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
        <ArrowLeft size={16} className="mr-2" /> Back to exploring
      </Link>

      <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex items-center gap-6 mb-12 relative z-10">
          <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <Building2 size={36} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{data.company}</h1>
            <p className="text-indigo-300 font-medium tracking-wide">COMPENSATION INSIGHTS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative z-10">
          <div className="bg-slate-950/50 rounded-3xl p-8 border border-slate-800 flex items-center shadow-lg">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl shadow-sm mr-6 text-emerald-400">
              <DollarSign size={32} />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">Median Total Comp</p>
              <p className="text-4xl font-black text-white">{formatCurrency(data.medianCompensation)}</p>
            </div>
          </div>
          <div className="bg-slate-950/50 rounded-3xl p-8 border border-slate-800 flex items-center shadow-lg">
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl shadow-sm mr-6 text-blue-400">
              <Users size={32} />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">Verified Entries</p>
              <p className="text-4xl font-black text-white">{data.totalEntries} <span className="text-xl font-normal text-slate-500">datapoints</span></p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            Average Total Comp by Level
          </h2>
          <div className="h-[400px] w-full bg-slate-950/30 rounded-3xl p-6 border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="level" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 600 }} dy={15} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} 
                  dx={-10}
                />
                <Tooltip cursor={{ fill: 'rgba(30, 41, 59, 0.5)' }} content={<CustomTooltip />} />
                <Bar dataKey="averageCompensation" radius={[6, 6, 0, 0]} maxBarSize={80}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#colorGradient)`} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
