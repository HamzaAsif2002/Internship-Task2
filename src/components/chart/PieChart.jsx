import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#a4de6c"];

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
    <div className="h-full w-full">
      {/* grid: pie + donut side-by-side; will stack on narrow screens */}
      <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Pie */}
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                paddingAngle={2}
              >
                {genderData.map((entry, idx) => (
                  <Cell
                    key={`cell-pie-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="value"
                  position="inside"
                  fill="#fff"
                  formatter={(value, entry) =>
                    entry && typeof entry === "object"
                      ? `${entry.name} (${value})`
                      : String(value)
                  }
                />
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <div className="h-full w-full hidden sm:flex ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                labelLine={false}
              >
                {genderData.map((entry, idx) => (
                  <Cell
                    key={`cell-donut-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="value"
                  position="outside"
                  formatter={(value, entry) =>
                    entry && typeof entry === "object"
                      ? `${entry.name} (${value})`
                      : String(value)
                  }
                />
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
