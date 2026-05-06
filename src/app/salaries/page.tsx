"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Search, Building2, MapPin, Briefcase, ChevronDown } from "lucide-react";

type Salary = {
  id: string;
  originalCompanyName: string;
  companyName: string;
  role: string;
  levelStandardized: string;
  location: string;
  experienceYears: number;
  totalCompensation: number;
  baseSalary: number;
  bonus: number;
  stock: number;
};

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    company: "",
    role: "",
    level: "",
    location: "",
  });

  const fetchSalaries = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.company) params.append("company", filters.company);
    if (filters.role) params.append("role", filters.role);
    if (filters.level) params.append("level", filters.level);
    if (filters.location) params.append("location", filters.location);

    try {
      const res = await fetch(`/api/salaries?${params.toString()}`);
      const data = await res.json();
      if (data.data) {
        setSalaries(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSalaries();
    }, 400);
    return () => clearTimeout(timer);
  }, [filters]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold text-white mb-2">Explore Compensation Data</h1>
        <p className="text-slate-400 text-lg">Real, verified compensation packages across the industry.</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Filters Bar */}
        <div className="p-6 bg-slate-900 border-b border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          <div className="relative group">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Company (e.g. Google)"
              value={filters.company}
              onChange={(e) => updateFilter("company", e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-700/50 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="relative group">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Role (e.g. SDE)"
              value={filters.role}
              onChange={(e) => updateFilter("role", e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-700/50 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="relative group">
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
            <select
              value={filters.level}
              onChange={(e) => updateFilter("level", e.target.value)}
              className="w-full pl-4 pr-11 py-3 rounded-2xl border border-slate-700/50 bg-slate-950 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">All Levels</option>
              <option value="L3">L3 (Entry)</option>
              <option value="L4">L4 (Mid)</option>
              <option value="L5">L5 (Senior)</option>
              <option value="L6">L6 (Staff)</option>
              <option value="L7">L7 (Principal)</option>
            </select>
          </div>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-700/50 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs font-bold border-b border-slate-800 tracking-wider">
              <tr>
                <th className="px-8 py-5">Company</th>
                <th className="px-8 py-5">Role & Level</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5 text-center">YOE</th>
                <th className="px-8 py-5 text-right">Total Comp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
                      <div className="h-8 w-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                      <div className="text-sm font-medium text-slate-500">Fetching verified salaries...</div>
                    </div>
                  </td>
                </tr>
              ) : salaries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-500 font-medium">
                    No matching compensation data found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                salaries.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="px-8 py-6 font-semibold text-white">
                      <Link href={`/company/${s.companyName}`} className="hover:text-indigo-400 hover:underline flex items-center gap-2">
                        {s.originalCompanyName}
                      </Link>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-slate-200 font-medium">{s.role}</div>
                      <div className="inline-flex items-center rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-400 mt-2 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                        {s.levelStandardized}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-400 flex items-center gap-2 mt-2">
                       {s.location}
                    </td>
                    <td className="px-8 py-6 text-center text-slate-300 font-medium">{s.experienceYears}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="font-bold text-white text-lg group-hover:text-emerald-400 transition-colors">
                        {formatCurrency(s.totalCompensation)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Base: {formatCurrency(s.baseSalary)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
