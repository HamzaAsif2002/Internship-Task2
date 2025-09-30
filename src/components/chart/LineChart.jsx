import {
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
    <div className="w-full h-100 bg-white p-3 rounded shadow overflow-x-auto">
      <h1 className="mb-5 text-xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Country-wise Analytics
      </h1>
      {/* Chart wrapper with fixed width & height */}
      <div className="w-full h-[300px]">
        <LineChart
          width={600} // same as min-w
          height={300} // control chart height here
          data={topCountries}
          margin={{ top: 5, right: 20, left: 5, bottom: 40 }}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            vertical={false}
            strokeDasharray="0"
          />
          <XAxis dataKey="country" angle={-30} textAnchor="end" height={60} />
          <YAxis domain={[0, (dataMax) => dataMax + 2]} allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={3}
            dot={true}
          />
        </LineChart>
      </div>
    </div>
  );
};
