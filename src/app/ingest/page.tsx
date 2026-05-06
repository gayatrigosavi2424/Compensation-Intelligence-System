"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function IngestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    level_standardized: "L4",
    location: "",
    experience_years: "",
    base_salary: "",
    bonus: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        ...formData,
        experience_years: parseFloat(formData.experience_years),
        base_salary: parseFloat(formData.base_salary),
        bonus: formData.bonus ? parseFloat(formData.bonus) : 0,
        stock: formData.stock ? parseFloat(formData.stock) : 0,
        confidence: 80, // Default confidence for user submitted
      };

      const res = await fetch("/api/ingest-salary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit data");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/salaries");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Back to Home
      </Link>

      <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Contribute Salary Data</h1>
          <p className="text-slate-400 mb-8">Help the community by sharing verified compensation details anonymously.</p>

          {success ? (
            <div className="bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded-2xl p-6 flex items-center justify-center flex-col text-center">
              <CheckCircle2 size={48} className="mb-4 text-emerald-500" />
              <h3 className="text-xl font-bold mb-2">Submission Successful!</h3>
              <p className="text-emerald-400/80">Thank you for contributing. Redirecting to salaries...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-900/30 border border-red-500/30 text-red-400 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle size={20} />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Company Name</label>
                  <input
                    required
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Google"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Role</label>
                  <input
                    required
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Standardized Level</label>
                  <select
                    name="level_standardized"
                    value={formData.level_standardized}
                    onChange={handleChange}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="L3">L3 (Entry Level)</option>
                    <option value="L4">L4 (Mid Level)</option>
                    <option value="L5">L5 (Senior)</option>
                    <option value="L6">L6 (Staff)</option>
                    <option value="L7">L7 (Principal)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Location</label>
                  <input
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore, India"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Years of Experience</label>
                  <input
                    required
                    type="number"
                    step="0.5"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    placeholder="e.g. 3.5"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-lg font-medium text-white mb-4">Compensation Breakdown (INR)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Base Salary</label>
                    <input
                      required
                      type="number"
                      name="base_salary"
                      value={formData.base_salary}
                      onChange={handleChange}
                      placeholder="e.g. 4500000"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Bonus (Yearly)</label>
                    <input
                      type="number"
                      name="bonus"
                      value={formData.bonus}
                      onChange={handleChange}
                      placeholder="e.g. 500000"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Stock (Yearly)</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="e.g. 2000000"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-900/50 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send size={18} />
                    Submit Salary
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
