import { Barchart } from "./BarChart.jsx";
import { Piechart } from "./PieChart.jsx";
import { Linechart } from "./LineChart.jsx";
import { Stackedchart } from "./StackedChart.jsx";
import { Users, Globe, Clock, ChevronUp } from "lucide-react";

export const Charts = ({ rows, totalUsers, countries }) => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left column - analytics summary cards */}
      <section className="lg:col-span-3 col-span-1 space-y-4">
        <SummaryCard
          title="Total Users"
          value={totalUsers}
          delta="+4.2%"
          icon={Users}
        />
        <SummaryCard
          title="Countries"
          value={countries.length}
          delta="+1"
          icon={Globe}
        />
      </section>

      {/* Middle column - main charts */}
      <section className="lg:col-span-6 col-span-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line chart (wide) */}
          <Card className="col-span-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Country-wise (line)</h3>
              <small className="text-xs text-slate-400">Last 30 days</small>
            </div>
            <div className="h-56 w-full">
              {/* Replace with your Recharts LineChart wrapped in ResponsiveContainer */}
              <Linechart rows={rows} />
            </div>
          </Card>

          {/* Bar chart */}
          <Card className="col-span-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Country-wise (bar)</h3>
              <small className="text-xs text-slate-400">Top 10</small>
            </div>
            <div className="h-56 w-full">
              <Barchart rows={rows} />
            </div>
          </Card>
        </div>

        {/* Stacked area / stacked bar (full width) */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              Global Engagement Breakdown (stacked)
            </h3>
            <small className="text-xs text-slate-400">Comparative</small>
          </div>
          <div className="h-64 w-full">
            <Stackedchart rows={rows} />
          </div>
        </Card>
      </section>

      {/* Right column - pie/donut + table */}
      <section className="lg:col-span-3 col-span-1 space-y-6">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">User Composition</h3>
            <small className="text-xs text-slate-400">% by type</small>
          </div>
          <div className="h-56 w-full">
            <Piechart rows={rows} />
          </div>
        </Card>
      </section>
    </main>
  );
};

function SummaryCard({ title, value, delta, icon: Icon }) {
  return (
    <div className="bg-white p-4 h-33 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
      {/* icon badge */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 flex items-center justify-center shadow-sm">
          <Icon className="w-6 h-6 text-slate-700" />
        </div>
      </div>

      {/* content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 truncate">
              {title}
            </div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">
              {value}
            </div>
          </div>

          {/* delta */}
          <div className="ml-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-emerald-700 bg-emerald-100">
            <ChevronUp className="w-3 h-3" />
            <span>{delta}</span>
          </div>
        </div>

        {/* optional subtext / sparkline placeholder */}
        <div className="mt-2 text-xs text-slate-400">since last 30 days</div>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}
