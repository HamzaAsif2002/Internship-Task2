import { faker } from "@faker-js/faker";
import { Barchart } from "./BarChart.jsx";
import { Piechart } from "./PieChart.jsx";

const COLORS = ["#8884d8", "#82ca9d"];

export const Charts = () => {
  // generate fake rows
  const rows = Array.from({ length: 100 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    country: faker.location.country(), // e.g. "Pakistan"
    gender: faker.person.sexType(),
  }));

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold mb-2">
        Charts — grouped by country & gender
      </h2>
      <div className="flex flex-wrap gap-6">
        <Barchart rows={rows} />
        <Piechart rows={rows} />
      </div>
    </div>
  );
};

{
  /* Gender Pie Chart (by count)
        <div className="w-full md:w-[35%] h-80 bg-white p-3 rounded shadow">
          <h3 className="mb-2 font-medium">Gender distribution (count)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="count"
                nameKey="gender"
                outerRadius={80}
                label={(entry) => `${entry.gender} (${entry.count})`}
              >
                {genderData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optional: line chart showing uv trend by country (top one) */
}
{
  /* <div className="bg-white p-3 rounded shadow">
        <h3 className="mb-2 font-medium">
          Sample: UV trend across users (names on X)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={rows.slice(0, 20)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" dot={false} />
          </LineChart>
        </ResponsiveContainer> */
}
