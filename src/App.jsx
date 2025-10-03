import { useMemo, useState } from "react";
import { Charts } from "./components/chart/Charts";
import { TableData } from "./components/table/TableData";
import { GenerateData } from "./data/GenerateData";
import {
  Search,
  User,
  Globe,
  Sliders,
  Activity,
  RefreshCw,
  Funnel,
} from "lucide-react";

export default function App() {
  const data = useMemo(() => GenerateData(), []); // generate once

  //get total users.
  const totalUsers = Array.isArray(data) ? data.length : 0;
  console.log(totalUsers);

  // filter state
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [country, setCountry] = useState("All");
  const [preference, setPreference] = useState("All");
  const [activity, setActivity] = useState("All");

  // derive unique options from data
  const genders = useMemo(
    () => ["All", ...Array.from(new Set(data.map((r) => r.gender))).sort()],
    [data]
  );
  const countries = useMemo(
    () => ["All", ...Array.from(new Set(data.map((r) => r.country))).sort()],
    [data]
  );

  const preferences = useMemo(
    () => ["All", ...Array.from(new Set(data.map((r) => r.preference))).sort()],
    [data]
  );
  const activities = useMemo(
    () => [
      "All",
      ...Array.from(new Set(data.map((r) => r.activityLevel))).sort(),
    ],
    [data]
  );

  // filtered data
  const filteredData = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return data.filter((r) => {
      if (q) {
        const hay = `${r.name || ""} ${r.country || ""} ${r.preference || ""} ${
          r.activityLevel || ""
        }`;
        if (!hay.toLowerCase().includes(q)) return false;
      }
      if (gender !== "All" && (r.gender || "") !== gender) return false;
      if (country !== "All" && (r.country || "") !== country) return false;
      if (preference !== "All" && (r.preference || "") !== preference)
        return false;
      if (activity !== "All" && (r.activityLevel || "") !== activity)
        return false;
      return true;
    });
  }, [data, search, gender, country, preference, activity]);

  const resetFilters = () => {
    setSearch("");
    setGender("All");
    setCountry("All");
    setPreference("All");
    setActivity("All");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <header className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Overview — country & user metrics
          </p>
        </div>
      </header>

      {/* Filters  */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 max-w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Funnel className="w-5 h-5 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Filters</h3>
            <p className="text-xs text-slate-400 hidden sm:inline">
              — refine results
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500 hidden sm:block">
              <span className="font-medium text-slate-700">
                {filteredData.length}
              </span>{" "}
              results
            </div>

            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:shadow transition"
              aria-label="Reset filters"
              title="Reset filters"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          {/* Search (icon inside) */}
          <div className="flex items-center gap-2 min-w-[220px] flex-1 md:flex-none">
            <label className="sr-only">Search</label>
            <div className="w-full flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, country, preference..."
                aria-label="Search"
                className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
              {/* optional clear button (visible when there's text) */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="ml-1 text-xs text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                  title="Clear"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col min-w-[140px]">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-2">
              <User className="w-4 h-4" />
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
              aria-label="Filter by gender"
            >
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div className="flex flex-col min-w-[160px]">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
              aria-label="Filter by country"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Preference */}
          <div className="flex flex-col min-w-[140px]">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Preference
            </label>
            <select
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
              aria-label="Filter by preference"
            >
              {preferences.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Engagement / Activity */}
          <div className="flex flex-col min-w-[140px]">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Engagement
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
              aria-label="Filter by engagement"
            >
              {activities.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main grid: pass filteredData to both */}
      <Charts
        rows={filteredData}
        totalUsers={totalUsers}
        countries={countries}
      />
      <TableData data={filteredData} />

      {/* Footer */}
      <footer className="mt-6 text-xs text-slate-400">
        Updated: Oct 2, 2025
      </footer>
    </div>
  );
}
