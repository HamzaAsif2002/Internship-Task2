import { Barchart } from "./BarChart.jsx";
import { Piechart } from "./PieChart.jsx";
import { Linechart } from "./LineChart.jsx";
import { GenerateData } from "../../data/GenerateData.jsx";
import { Stackedchart } from "./StackedChart.jsx";

export const Charts = () => {
  // generate fake rows
  const rows = GenerateData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full m-auto">
      <Barchart rows={rows} />
      <Linechart rows={rows} />
      <Piechart rows={rows} />
      <Stackedchart rows={rows} />
    </div>
  );
};
