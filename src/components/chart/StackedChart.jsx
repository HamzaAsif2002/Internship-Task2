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

export const Stackedchart = ({ rows = [], dark }) => {
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
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={topCountries}
        margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
      >
        <CartesianGrid stroke="#e5e7eb" vertical={false} strokeDasharray="0" />
        <XAxis
          dataKey="country"
          angle={-30}
          textAnchor="end"
          tick={{ fontSize: 10, fill: dark ? "#d1d5db" : "#374151" }}
          tickFormatter={(name) =>
            name.length > 10 ? name.slice(0, 15) + "..." : name
          }
        />
        <YAxis
          domain={[0, yMax]}
          allowDecimals={false}
          tick={{ fill: dark ? "#d1d5db" : "#374151" }}
        />
        <Tooltip
          formatter={(value, name) => [value, name]}
          // show combined total in tooltip payload if desired
          contentStyle={{
            backgroundColor: dark ? "#1f2937" : "#ffffff",
            border: "none",
          }}
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
  );
};
