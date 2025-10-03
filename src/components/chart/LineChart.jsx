import {
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const Linechart = ({ rows }) => {
  const countryMap = {};
  rows.forEach((r) => {
    const c = r.country || "Unknown";
    countryMap[c] = (countryMap[c] || 0) + 1;
  });

  const countryArr = Object.entries(countryMap).map(([country, count]) => ({
    country,
    count,
  }));

  const topCountries = countryArr.sort((a, b) => b.count - a.count).slice(0, 8);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={topCountries}
        margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
      >
        <CartesianGrid stroke="#e5e7eb" vertical={false} strokeDasharray="0" />
        <XAxis
          dataKey="country"
          angle={-30}
          textAnchor="end"
          tick={{ fontSize: 10 }}
          tickFormatter={(name) =>
            name.length > 15 ? name.slice(0, 15) + "..." : name
          }
        />
        <YAxis domain={[0, (dataMax) => dataMax + 2]} allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          strokeWidth={3}
          dot
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
