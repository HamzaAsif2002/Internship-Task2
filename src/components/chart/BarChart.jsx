import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
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
    <div className="w-full h-100 flex flex-wrap bg-white p-3 rounded shadow">
      <h1 className="mb-5 text-xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Country-wise Analytics
      </h1>
      {/* Scrollable container */}
      <div className="overflow-x-auto w-full">
        {/* Chart wrapper with fixed width */}
        <div className="w-full h-[300px]">
          <BarChart
            width={600} // match min-w above
            height={300} // control height here
            data={topCountries}
            margin={{ top: 5, right: 20, left: 5, bottom: 40 }}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              vertical={false}
              strokeDasharray="0"
            />{" "}
            <XAxis
              dataKey="country"
              angle={-30}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              domain={[0, (dataMax) => dataMax + 2]}
              allowDecimals={false}
            />
            <Tooltip />
            <Bar dataKey="count">
              {topCountries.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#8884d8", "#82ca9d"][index % 2]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
};
