"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Scale, ArrowRightLeft } from "lucide-react";

export default function ComparePage() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [selected1, setSelected1] = useState<string>("");
  const [selected2, setSelected2] = useState<string>("");
  const [comparison, setComparison] = useState<any>(null);

  useEffect(() => {
    fetch("/api/salaries?order=desc")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setSalaries(json.data);
      });
  }, []);

  useEffect(() => {
    if (selected1 && selected2) {
      fetch(`/api/compare?id1=${selected1}&id2=${selected2}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.data) setComparison(json.data);
        });
    }
  }, [selected1, selected2]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/20 blur-[100px] pointer-events-none rounded-full"></div>
        <h1 className="text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-4 relative z-10">
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-700 shadow-xl">
            <Scale className="text-indigo-400" size={40} />
          </div>
          Compare Offers
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10">
          Select two compensation records to compare them side-by-side with a detailed breakdown.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-slate-800">
          <label className="block text-sm font-bold text-indigo-400 mb-3 uppercase tracking-wider">Offer 1</label>
          <select
            className="w-full p-4 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
            value={selected1}
            onChange={(e) => setSelected1(e.target.value)}
          >
            <option value="">Select a salary record...</option>
            {salaries.map((s) => (
              <option key={s.id} value={s.id}>
                {s.originalCompanyName} - {s.role} ({s.levelStandardized})
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-slate-800">
          <label className="block text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wider">Offer 2</label>
          <select
            className="w-full p-4 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
            value={selected2}
            onChange={(e) => setSelected2(e.target.value)}
          >
            <option value="">Select a salary record...</option>
            {salaries.map((s) => (
              <option key={s.id} value={s.id}>
                {s.originalCompanyName} - {s.role} ({s.levelStandardized})
              </option>
            ))}
          </select>
        </div>
      </div>

      {comparison && (
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500"></div>
          
          <table className="w-full">
            <thead>
              <tr className="bg-slate-950/80">
                <th className="w-1/3 p-8 text-left border-b border-r border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-sm">Metric</th>
                <th className="w-1/3 p-8 text-center border-b border-r border-slate-800 bg-indigo-900/10">
                  <div className="text-3xl font-black text-white">{comparison.salary1.originalCompanyName}</div>
                  <div className="inline-block mt-3 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-bold border border-indigo-500/30">
                    {comparison.salary1.levelStandardized}
                  </div>
                </th>
                <th className="w-1/3 p-8 text-center border-b border-slate-800 bg-emerald-900/10">
                  <div className="text-3xl font-black text-white">{comparison.salary2.originalCompanyName}</div>
                  <div className="inline-block mt-3 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-bold border border-emerald-500/30">
                    {comparison.salary2.levelStandardized}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {/* Total Comp */}
              <tr className="bg-slate-800/20">
                <td className="p-8 border-b border-r border-slate-800 font-bold text-white text-xl">Total Compensation</td>
                <td className="p-8 border-b border-r border-slate-800 text-center font-black text-white text-2xl bg-indigo-900/5">
                  {formatCurrency(comparison.salary1.totalCompensation)}
                </td>
                <td className="p-8 border-b border-slate-800 text-center font-black text-white text-2xl bg-emerald-900/5">
                  {formatCurrency(comparison.salary2.totalCompensation)}
                </td>
              </tr>
              {/* Base */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-8 border-b border-r border-slate-800 text-slate-400 font-medium">Base Salary</td>
                <td className="p-8 border-b border-r border-slate-800 text-center text-slate-200 font-semibold bg-indigo-900/5">
                  {formatCurrency(comparison.salary1.baseSalary)}
                </td>
                <td className="p-8 border-b border-slate-800 text-center text-slate-200 font-semibold bg-emerald-900/5">
                  {formatCurrency(comparison.salary2.baseSalary)}
                </td>
              </tr>
              {/* Stock */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-8 border-b border-r border-slate-800 text-slate-400 font-medium">Stock (Equity)</td>
                <td className="p-8 border-b border-r border-slate-800 text-center text-slate-200 font-semibold bg-indigo-900/5">
                  {formatCurrency(comparison.salary1.stock)}
                </td>
                <td className="p-8 border-b border-slate-800 text-center text-slate-200 font-semibold bg-emerald-900/5">
                  {formatCurrency(comparison.salary2.stock)}
                </td>
              </tr>
              {/* Bonus */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-8 border-b border-r border-slate-800 text-slate-400 font-medium">Bonus</td>
                <td className="p-8 border-b border-r border-slate-800 text-center text-slate-200 font-semibold bg-indigo-900/5">
                  {formatCurrency(comparison.salary1.bonus)}
                </td>
                <td className="p-8 border-b border-slate-800 text-center text-slate-200 font-semibold bg-emerald-900/5">
                  {formatCurrency(comparison.salary2.bonus)}
                </td>
              </tr>
              {/* YOE */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-8 border-r border-slate-800 text-slate-400 font-medium rounded-bl-[2.5rem]">Years of Experience</td>
                <td className="p-8 border-r border-slate-800 text-center text-slate-200 font-bold bg-indigo-900/5">
                  {comparison.salary1.experienceYears} YOE
                </td>
                <td className="p-8 text-center text-slate-200 font-bold rounded-br-[2.5rem] bg-emerald-900/5">
                  {comparison.salary2.experienceYears} YOE
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
