import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

export const Barchart = ({ rows, dark }) => {
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
    // <ResponsiveContainer width="100%" height="100%">
    //   <BarChart
    //     data={topCountries}
    //     margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
    //   >
    //     <CartesianGrid stroke="#e5e7eb" vertical={false} strokeDasharray="0" />{" "}
    //     <XAxis
    //       dataKey="country"
    //       angle={-30}
    //       textAnchor="end"
    //       tick={{ fontSize: 10 }}
    //       tickFormatter={(name) =>
    //         name.length > 15 ? name.slice(0, 15) + "..." : name
    //       }
    //     />
    //     <YAxis domain={[0, (dataMax) => dataMax + 2]} allowDecimals={false} />
    //     <Tooltip />
    //     <Bar dataKey="count">
    //       {topCountries.map((entry, index) => (
    //         <Cell
    //           key={`cell-${index}`}
    //           fill={["#8884d8", "#82ca9d"][index % 2]}
    //         />
    //       ))}
    //     </Bar>
    //   </BarChart>
    // </ResponsiveContainer>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={topCountries}
        margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
      >
        <CartesianGrid
          stroke={dark ? "#374151" : "#e5e7eb"}
          vertical={false}
          strokeDasharray="0"
        />
        <XAxis
          dataKey="country"
          angle={-30}
          textAnchor="end"
          tick={{ fontSize: 10, fill: dark ? "#d1d5db" : "#374151" }}
          tickFormatter={(name) =>
            name.length > 15 ? name.slice(0, 15) + "..." : name
          }
        />
        <YAxis
          domain={[0, (dataMax) => dataMax + 2]}
          allowDecimals={false}
          tick={{ fill: dark ? "#d1d5db" : "#374151" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: dark ? "#1f2937" : "#ffffff",
            border: "none",
          }}
        />
        <Bar dataKey="count">
          {topCountries.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={["#8884d8", "#82ca9d"][index % 2]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
