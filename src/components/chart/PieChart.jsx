import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a28fd0",
  "#60c1c8",
];

export const Piechart = ({ rows = [] }) => {
  // 1) Aggregate rows by gender
  const genderMap = {};
  rows.forEach((r) => {
    const g = r.gender || "Unknown";
    genderMap[g] = (genderMap[g] || 0) + 1;
  });

  // 2) Convert to Recharts-friendly array: { name, value }
  const genderData = Object.entries(genderMap).map(([name, value]) => ({
    name,
    value,
  }));

  // 3) Optional: sort so larger slices appear first
  genderData.sort((a, b) => b.value - a.value);

  return (
    <div className="flex flex-col sm:flex-row gap-3 ">
      {/* Pie Graph */}
      <div className="w-full  h-100 bg-white p-3 rounded shadow">
        <h3 className="mb-5 text-xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Gender distribution (count)
        </h3>

        {genderData.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100%-40px)] text-sm text-gray-500">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value" // numeric value
                nameKey="name" // category label
                paddingAngle={0}
              >
                {genderData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}

                {/* show name + count outside the slice */}
                <LabelList
                  dataKey="value"
                  position="inside"
                  fill="#fff"
                  formatter={(value, entry) => {
                    // `entry` here is the data object; display "Name (count)"
                    // Some Recharts versions pass (value, name) — if `entry` is not object, fallback:
                    if (entry && typeof entry === "object")
                      return `${entry.name} (${value})`;
                    return String(value);
                  }}
                />
              </Pie>

              <Tooltip
                formatter={(value, name) => [value, name]} // tooltip shows value and name
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* Donut Graph */}
      <div className="w-full  h-100 bg-white p-3 rounded shadow">
        <h3 className="mb-5 text-xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Gender distribution (count)
        </h3>

        {genderData.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100%-40px)] text-sm text-gray-500">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value" // numeric value
                nameKey="name" // category label
                outerRadius={90}
                innerRadius={50} // makes it a donut; remove if you want full pie
                labelLine={false}
                // labels are handled by LabelList below to show "Name (count)"
              >
                {genderData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}

                {/* show name + count outside the slice */}
                <LabelList
                  dataKey="value"
                  position="outside"
                  formatter={(value, entry) => {
                    // `entry` here is the data object; display "Name (count)"
                    // Some Recharts versions pass (value, name) — if `entry` is not object, fallback:
                    if (entry && typeof entry === "object")
                      return `${entry.name} (${value})`;
                    return String(value);
                  }}
                />
              </Pie>

              <Tooltip
                formatter={(value, name) => [value, name]} // tooltip shows value and name
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
