import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Barchart = ({ rows }) => {
  // aggregate counts by country
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
    <div className="w-full md:w-[60%] h-100 bg-white p-3 rounded shadow">
      <h3 className="mb-2 font-medium">Top Countries — total PV & UV</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={topCountries}
          margin={{ top: 5, right: 20, left: 20, bottom: 40 }} // extra bottom space for labels
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-axis shows country names */}
          <XAxis dataKey="country" angle={-30} textAnchor="end" interval={0} />
          {/* Y-axis shows numbers */}
          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Users" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
