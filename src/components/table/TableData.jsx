import { useEffect, useMemo, useState } from "react";

const pageSizeOptions = [10, 25, 50];

export const TableData = ({ data, dark }) => {
  // defensive default
  const SAMPLE_DATA = Array.isArray(data) ? data : [];

  // Sorting state
  const [sortBy, setSortBy] = useState({ key: "id", direction: "asc" });

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  // --- Sorted (no filters/search) ---
  const sorted = useMemo(() => {
    const arr = SAMPLE_DATA.slice(); // copy

    const { key, direction } = sortBy;
    const dir = direction === "asc" ? 1 : -1;

    arr.sort((a, b) => {
      const va = a?.[key];
      const vb = b?.[key];

      // equal or both undefined
      if (va === vb) return 0;

      // numeric compare when both numbers
      if (typeof va === "number" && typeof vb === "number") {
        return (va - vb) * dir;
      }

      // attempt numeric compare if strings contain numbers
      const na = Number(va);
      const nb = Number(vb);
      if (!Number.isNaN(na) && !Number.isNaN(nb)) {
        return (na - nb) * dir;
      }

      // fallback to string compare
      return String(va ?? "").localeCompare(String(vb ?? "")) * dir;
    });

    return arr;
  }, [SAMPLE_DATA, sortBy]);

  // Pagination calculations
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // keep page in-range when pageSize or total changes
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [totalPages, page]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // Helpers
  function toggleSort(key) {
    setSortBy((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }

  // Columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "country", label: "Country" },
    { key: "activityLevel", label: "Activity" },
    { key: "preference", label: "Preference" },
    { key: "lastActiveDays", label: "Last Active (days)" },
  ];

  return (
    <div className="p-4 max-w-7xl my-5 shadow-2xl rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <div
          className={`text-sm   ${dark ? "text-white/80" : "text-gray-600"}`}
        >
          Total rows: {total}
        </div>
      </div>

      {/* PAGE SIZE */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <label className="text-sm">Rows:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`text-sm   ${dark ? "text-white/80" : "text-gray-600"}`}
        >
          Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, total)} of {total} entries
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead
            className={`transition-colors ${
              dark ? "bg-slate-800 text-slate-200" : "bg-gray-50 text-slate-800"
            }`}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left cursor-pointer select-none"
                  onClick={() => toggleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    <SortIndicator sortBy={sortBy} colKey={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paged.map((row) => (
              <tr
                key={row.id}
                className={`transition-colors ${
                  dark
                    ? "odd:bg-slate-800 even:bg-slate-700 hover:bg-slate-600 text-slate-200"
                    : "odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-slate-800"
                }`}
              >
                <td className="px-3 py-2">{row.name}</td>
                <td className="px-3 py-2">{row.age}</td>
                <td className="px-3 py-2">{row.gender}</td>
                <td className="px-3 py-2">{row.country}</td>
                <td className="px-3 py-2">{row.activityLevel}</td>
                <td className="px-3 py-2">{row.preference}</td>
                <td className="px-3 py-2">{row.lastActiveDays}</td>
              </tr>
            ))}

            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className={`text-center px-3 py-6 ${
                    dark ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-wrap items-center justify-center sm:justify-between m-4 gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-1 sm:px-2 py-1 border rounded disabled:opacity-50"
          >
            « First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-1 sm:px-2 py-1 border rounded disabled:opacity-50"
          >
            ‹ Prev
          </button>

          <div className="px-3 py-1">
            Page {page} of {totalPages}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-1 sm:px-2 py-1 border rounded disabled:opacity-50"
          >
            Next ›
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-1 sm:px-2 py-1 border rounded disabled:opacity-50"
          >
            Last »
          </button>
        </div>

        <div
          className={`text-sm   ${dark ? "text-white/80" : "text-gray-600"}`}
        >
          Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, total)} of {total} entries
        </div>
      </div>
    </div>
  );
};

function SortIndicator({ sortBy, colKey }) {
  if (sortBy.key !== colKey)
    return <span className="text-xs text-gray-400">↕</span>;
  return (
    <span className="text-xs">{sortBy.direction === "asc" ? "▲" : "▼"}</span>
  );
}
