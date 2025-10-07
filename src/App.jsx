import { Barchart } from "./components/chart/BarChart";
import { Linechart } from "./components/chart/LineChart";
import { Piechart } from "./components/chart/PieChart";
import { Stackedchart } from "./components/chart/StackedChart";
import { GenerateData } from "./data/GenerateData";
import { TableData } from "./components/table/TableData";
import {
  Aperture,
  Grid,
  Bell,
  User,
  Settings,
  Sun,
  Moon,
  Search,
  Globe,
  Sliders,
  Activity,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const App = () => {
  const data = GenerateData();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(false);

  const palette = {
    primary: "bg-gradient-to-r from-sky-500 to-indigo-600",
    accent: "bg-gradient-to-r from-emerald-400 to-sky-500",
    card: "bg-white/70 ",
    darkCard: "bg-slate-800/70",
  };

  //Filters.

  const totalUsers = Array.isArray(data) ? data.length : 0;

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
    <div
      className={`min-h-screen ${
        dark
          ? "bg-slate-900 text-slate-100"
          : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-[1400px] mx-auto p-4 lg:p-6">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-200/50 focus:outline-none"
              aria-label="toggle sidebar"
            >
              <Grid className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg text-white ${palette.primary}`}>
                <Aperture className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight">
                  Analytics Dashboard
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <div className="flex items-center gap-2 min-w-[220px] flex-1 md:flex-none">
                <label className="sr-only">Search</label>
                <div
                  className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 border transition-colors
      ${
        dark
          ? "bg-slate-800 border-slate-700 focus-within:ring-2 focus-within:ring-blue-500"
          : "bg-slate-50 border-slate-200 focus-within:ring-2 focus-within:ring-blue-200"
      }`}
                >
                  <Search
                    className={`w-4 h-4 transition-colors ${
                      dark ? "text-slate-400" : "text-slate-500"
                    }`}
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name, country, preference..."
                    aria-label="Search"
                    className={`w-full bg-transparent outline-none text-sm placeholder:transition-colors
        ${
          dark
            ? "text-slate-100 placeholder:text-slate-500"
            : "text-slate-700 placeholder:text-slate-400"
        }`}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-slate-200/50"
            >
              {dark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button className="p-2 rounded-lg hover:bg-slate-200/50 hidden sm:block">
              <Bell className="w-5 h-5" />
            </button>

            <div className="items-center gap-2 p-2 rounded-lg hover:bg-slate-200/50 hidden sm:flex">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Hamza</span>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar (collapsible) */}
          {sidebarOpen && (
            <aside className="lg:col-span-2 col-span-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-2xl shadow-md ${
                  dark ? palette.darkCard : palette.card
                }`}
              >
                <nav className="space-y-3 text-sm">
                  <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100/60">
                    <Grid className="w-5 h-5" />
                    Dashboard
                  </a>
                  <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100/60">
                    <Aperture className="w-5 h-5" />
                    Visuals
                  </a>
                  <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100/60">
                    <Settings className="w-5 h-5" />
                    Settings
                  </a>
                  <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100/60">
                    <User className="w-5 h-5" />
                    Profile
                  </a>
                </nav>

                <div className="mt-6 text-xs opacity-80">
                  <div className="font-medium">Palette</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-sky-500 shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-indigo-500 shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-emerald-400 shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-amber-400 shadow-sm" />
                  </div>
                </div>
              </motion.div>
            </aside>
          )}

          {/* Main content */}
          <section
            className={` col-span-1 space-y-6 min-w-0 ${
              sidebarOpen ? "lg:col-span-10 " : "lg:col-span-12"
            }`}
          >
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Gender */}
              <div className="flex flex-col min-w-[140px]">
                <label className="text-xs font-medium  flex items-center gap-2">
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
                    <option
                      key={g}
                      value={g}
                      className={
                        dark
                          ? "bg-slate-800 text-slate-200"
                          : "bg-white text-slate-800"
                      }
                    >
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div className="flex flex-col min-w-[160px]">
                <label className="text-xs font-medium  flex items-center gap-2">
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
                    <option
                      key={c}
                      value={c}
                      className={
                        dark
                          ? "bg-slate-800 text-slate-200"
                          : "bg-white text-slate-800"
                      }
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preference */}
              <div className="flex flex-col min-w-[140px]">
                <label className="text-xs font-medium  flex items-center gap-2">
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
                    <option
                      key={p}
                      value={p}
                      className={
                        dark
                          ? "bg-slate-800 text-slate-200"
                          : "bg-white text-slate-800"
                      }
                    >
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Engagement / Activity */}
              <div className="flex flex-col min-w-[140px]">
                <label className="text-xs font-medium  flex items-center gap-2">
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
                    <option
                      key={a}
                      value={a}
                      className={
                        dark
                          ? "bg-slate-800 text-slate-200"
                          : "bg-white text-slate-800"
                      }
                    >
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-sm hidden sm:block">
                    <span className="font-medium ">{filteredData.length}</span>{" "}
                    results
                  </div>

                  <button
                    onClick={resetFilters}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
    ${
      dark
        ? "bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600 hover:text-white"
        : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
    }`}
                    aria-label="Reset filters"
                    title="Reset filters"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
            {/* Top metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Total Users",
                  value: totalUsers,
                  change: "+4.2%",
                },
                { title: "Active Sessions", value: 3491, change: "+1.1%" },
                { title: "Countries", value: countries.length, change: "+2" },
                { title: "Avg. Session", value: "3m 12s", change: "-0.6%" },
              ].map((m) => (
                <motion.div
                  key={m.title}
                  whileHover={{ y: -4 }}
                  className={`p-4 rounded-2xl shadow-sm ${
                    dark ? palette.darkCard : palette.card
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-70">{m.title}</div>
                      <div className="text-2xl font-semibold">{m.value}</div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        m.change.startsWith("+")
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                    >
                      {m.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts grid */}
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
              {/* Stacked Chart */}
              <div
                className={`col-span-1 lg:col-span-2 p-4 rounded-2xl shadow-md ${
                  dark ? palette.darkCard : palette.card
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Traffic Overview</h3>
                  <div className="text-sm opacity-70">Last 30 days</div>
                </div>
                <div className="w-full h-[350px]">
                  {" "}
                  {/* 👈 set chart size */}
                  <Stackedchart rows={filteredData} dark={dark} />
                </div>
              </div>

              {/* Pie Chart */}
              <div
                className={`col-span-1 p-4 rounded-2xl shadow-md ${
                  dark ? palette.darkCard : palette.card
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Users by Type</h3>
                  <div className="text-sm opacity-70">Realtime</div>
                </div>
                <div className="w-full h-[300px]">
                  <Piechart rows={filteredData} />
                </div>
              </div>

              {/* Bar Chart */}
              <div
                className={`col-span-1 lg:col-span-2 p-4 rounded-2xl shadow-md ${
                  dark ? palette.darkCard : palette.card
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Sessions by Device</h3>
                  <div className="text-sm opacity-70">Segmented</div>
                </div>
                <div className="w-full h-[350px]">
                  <Barchart rows={filteredData} dark={dark} />
                </div>
              </div>

              {/* line Chart */}
              <div
                className={`col-span-1 p-4 rounded-2xl shadow-md ${
                  dark ? palette.darkCard : palette.card
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Stacked Metric</h3>
                  <div className="text-sm opacity-70">Comparison</div>
                </div>
                <div className="w-full h-[300px]">
                  <Linechart rows={filteredData} dark={dark} />
                </div>
              </div>
            </div>

            {/* Table */}
            <div
              className={`p-4 rounded-2xl shadow-md ${
                dark ? palette.darkCard : palette.card
              }`}
            >
              <TableData data={filteredData} dark={dark} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
