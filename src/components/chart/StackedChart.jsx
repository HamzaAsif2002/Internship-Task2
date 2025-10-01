import {
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const Stackedchart = ({ rows = [] }) => {
  // guard
  const safeRows = Array.isArray(rows) ? rows : [];

  // aggregate counts by country AND gender
  const countryMap = {};
  safeRows.forEach((r) => {
    const country = (r && r.country) || "Unknown";
    const gender = (r && (r.gender || "Unknown")).toString();

    if (!countryMap[country])
      countryMap[country] = { country, male: 0, female: 0, other: 0 };
    // normalize common gender values
    const g = gender.toLowerCase();
    if (g === "male" || g === "m") countryMap[country].male += 1;
    else if (g === "female" || g === "f") countryMap[country].female += 1;
    else countryMap[country].other += 1;
  });

  // convert to array and keep only top N countries by total count
  const countryArr = Object.values(countryMap).map((c) => ({
    ...c,
    total: (c.male || 0) + (c.female || 0) + (c.other || 0),
  }));

  const topCountries = countryArr.sort((a, b) => b.total - a.total).slice(0, 8);

  // compute dynamic yMax from stacked totals (10% headroom, minimum 5)
  const maxTotal = topCountries.length
    ? Math.max(...topCountries.map((d) => d.total || 0))
    : 5;
  const yMax = Math.max(5, Math.ceil(maxTotal * 1.1));

  // empty state
  if (!topCountries.length) {
    return (
      <div className="w-full h-72 bg-white p-3 rounded shadow flex items-center justify-center text-sm text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-100 bg-white p-3 rounded shadow overflow-x-auto">
      <h1 className="mb-5 text-xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Country-wise Analytics (stacked by gender)
      </h1>

      {/* explicit wrapper height so chart can render */}
      <div className="w-full h-[300px] min-w-[600px]">
        {/* you can keep explicit width/height for horizontal scroll, or swap to ResponsiveContainer */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={topCountries}
            margin={{ top: 5, right: 20, left: 5, bottom: 40 }}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              vertical={false}
              strokeDasharray="0"
            />
            <XAxis dataKey="country" angle={-30} textAnchor="end" height={60} />
            <YAxis domain={[0, yMax]} allowDecimals={false} />
            <Tooltip
              formatter={(value, name) => [value, name]}
              // show combined total in tooltip payload if desired
            />
            <Legend verticalAlign="top" height={36} />

            {/* stacked areas: same stackId -> stack on top of each other */}
            <Area
              type="monotone"
              dataKey="male"
              stackId="1"
              stroke="#1f2937" // dark stroke (male)
              fill="#60a5fa" // fill color
              strokeWidth={2}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="female"
              stackId="1"
              stroke="#7c3aed"
              fill="#c084fc"
              strokeWidth={2}
              dot={false}
            />
            {/* optional: show other genders if present */}
            <Area
              type="monotone"
              dataKey="other"
              stackId="1"
              stroke="#6ee7b7"
              fill="#34d399"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
