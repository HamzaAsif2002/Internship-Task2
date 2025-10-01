import { Charts } from "./components/chart/Charts";
import { TableData } from "./components/table/TableData";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200  flex items-center justify-center">
      <div className="w-full sm:w-[90%] max-w-7xl bg-white">
        {/* Header */}
        <div className="w-full px-6 py-4 text-2xl font-semibold border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50 to-transparent">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Analytics Dashboard & Interactive Visuals
          </span>
        </div>

        {/* Charts Section */}
        <div className="p-6">
          <Charts />
        </div>

        {/* Table Section */}
        <div className="w-full py-4 text-2xl font-semibold border-l-4 text-center  border-indigo-500 bg-gradient-to-r from-indigo-50 to-transparent">
          <span className="bg-clip-text text-transparent align-center bg-gradient-to-r from-indigo-600 to-purple-600">
            👤 Users Data
          </span>
        </div>
        <TableData />
      </div>
    </div>
  );
};

export default App;
