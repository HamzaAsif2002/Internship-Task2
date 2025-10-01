// import { useEffect, useMemo, useState } from "react";
// import { GenerateData } from "../../data/GenerateData";

// export const TableData = () => {
//   const users = useMemo(() => GenerateData(), []);

//   //   for filter data
//   const [sortOrder, setSortOrder] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [genderFilter, setGenderFilter] = useState("");

//   const filteredUsers = users
//     // Filter by search term (name or email or country)
//     .filter(
//       (u) =>
//         u.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
//         u.email.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
//         u.country.toLowerCase().includes(searchTerm.trim().toLowerCase())
//     )
//     // Filter by gender
//     .filter((u) => (genderFilter ? u.gender === genderFilter : true))
//     // Sort by name
//     .sort((a, b) =>
//       sortOrder === "asc"
//         ? a.name.localeCompare(b.name)
//         : sortOrder === "desc"
//         ? b.name.localeCompare(a.name)
//         : 0
//     );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, genderFilter, sortOrder]);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   // set pages.
//   const totalItems = filteredUsers.length;
//   const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

//   const goToPage = (n) => setCurrentPage(Math.max(1, Math.min(totalPages, n)));
//   const prevPage = () => goToPage(currentPage - 1);
//   const nextPage = () => goToPage(currentPage + 1);

//   return (
//     <div className=" p-6 w-auto rounded-2xl">
//       {/* Filters and Search Section */}
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-t-xl shadow">
//         {/* Sort button */}

//         <select
//           name="sort"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">Set Sort</option>
//           <option value="asc">Asc</option>
//           <option value="desc">Desc</option>
//         </select>

//         {/* Search input */}
//         <input
//           type="text"
//           placeholder="Enter Country, Name or Mail"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         {/* Gender dropdown */}
//         <select
//           name="gender"
//           value={genderFilter}
//           onChange={(e) => setGenderFilter(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">All Genders</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="others">Others</option>
//         </select>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table className="w-full bg-white rounded-b-xl shadow-md overflow-hidden">
//           {/* Table Head */}
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Country
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Gender
//               </th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {filteredUsers.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             ) : (
//               filteredUsers
//                 .slice((currentPage - 1) * pageSize, currentPage * pageSize) // paginate
//                 .map((user) => (
//                   <tr
//                     key={user.id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="px-6 py-3 text-gray-900">{user.name}</td>
//                     <td className="px-6 py-3 text-gray-600">{user.email}</td>
//                     <td className="px-6 py-3 text-gray-600">{user.country}</td>
//                     <td className="px-6 py-3 text-gray-600">{user.gender}</td>
//                   </tr>
//                 ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination */}
//       <div className="flex justify-center gap-5 mt-3">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded ${
//             currentPage === 1
//               ? "text-gray-400 border border-gray-200"
//               : "bg-white border"
//           }`}
//         >
//           Prev
//         </button>

//         {/* Middle Buttons */}
//         <div className="hidden sm:flex items-center gap-1">
//           {/* First Page */}
//           <button
//             onClick={() => goToPage(1)}
//             className={`px-3 py-1 rounded ${
//               currentPage === 1 ? "bg-blue-600 text-white" : "bg-white border"
//             }`}
//           >
//             1
//           </button>

//           {/* If currentPage is near the start */}
//           {currentPage <= 3 && totalPages > 4 && (
//             <>
//               {[2, 3].map((p) => (
//                 <button
//                   key={p}
//                   onClick={() => goToPage(p)}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === p
//                       ? "bg-blue-600 text-white"
//                       : "bg-white border"
//                   }`}
//                 >
//                   {p}
//                 </button>
//               ))}
//               <span className="px-2">...</span>
//             </>
//           )}

//           {/* If currentPage is in the middle */}
//           {currentPage > 3 && currentPage < totalPages - 2 && (
//             <>
//               <span className="px-2">...</span>
//               <button
//                 className="px-3 py-1 rounded bg-blue-600 text-white"
//                 disabled
//               >
//                 {currentPage}
//               </button>
//               <span className="px-2">...</span>
//             </>
//           )}

//           {/* If currentPage is near the end */}
//           {currentPage >= totalPages - 2 && totalPages > 4 && (
//             <>
//               <span className="px-2">...</span>
//               {[totalPages - 2, totalPages - 1].map((p) => (
//                 <button
//                   key={p}
//                   onClick={() => goToPage(p)}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === p
//                       ? "bg-blue-600 text-white"
//                       : "bg-white border"
//                   }`}
//                 >
//                   {p}
//                 </button>
//               ))}
//             </>
//           )}

//           {/* Last Page */}
//           {totalPages > 1 && (
//             <button
//               onClick={() => goToPage(totalPages)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === totalPages
//                   ? "bg-blue-600 text-white"
//                   : "bg-white border"
//               }`}
//             >
//               {totalPages}
//             </button>
//           )}
//         </div>
//         {/* Next Button */}
//         <button
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 rounded ${
//             currentPage === totalPages
//               ? "text-gray-400 border border-gray-200"
//               : "bg-white border"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// src/components/table/TableDataTanstack.jsx
import React, { useMemo, useState } from "react";

// FilterableTable.react.jsx
// Single-file React component (Tailwind classes) that demonstrates:
// - Demographics, Engagement, Preferences filters
// - Search, sorting, and pagination
// - Uses sample data (you can replace `SAMPLE_DATA` with your real dataset)

const SAMPLE_DATA = Array.from({ length: 137 }).map((_, i) => {
  const genders = ["Male", "Female", "Non-binary"];
  const countries = ["Pakistan", "USA", "UK", "Canada", "Australia"];
  const activity = ["Low", "Medium", "High"];
  const categories = ["Tech", "Sports", "Music", "Movies", "Travel"];

  return {
    id: i + 1,
    name: `User ${i + 1}`,
    age: 18 + (i % 42),
    gender: genders[i % genders.length],
    country: countries[i % countries.length],
    activityLevel: activity[i % activity.length],
    preference: categories[i % categories.length],
    lastActiveDays: Math.floor(Math.random() * 90),
  };
});

const pageSizeOptions = [10, 25, 50];

export const TableData = () => {
  // Filter state
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [preference, setPreference] = useState("");

  // Search and sort state
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState({ key: "id", direction: "asc" });

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  // Derived lists for dropdowns (from data) to keep them dynamic
  const genders = useMemo(
    () => [...new Set(SAMPLE_DATA.map((d) => d.gender))],
    []
  );
  const countries = useMemo(
    () => [...new Set(SAMPLE_DATA.map((d) => d.country))],
    []
  );
  const activities = useMemo(
    () => [...new Set(SAMPLE_DATA.map((d) => d.activityLevel))],
    []
  );
  const preferences = useMemo(
    () => [...new Set(SAMPLE_DATA.map((d) => d.preference))],
    []
  );

  // 1) Apply filters and search
  const filtered = useMemo(() => {
    let d = SAMPLE_DATA;

    if (gender) d = d.filter((x) => x.gender === gender);
    if (country) d = d.filter((x) => x.country === country);
    if (activityLevel) d = d.filter((x) => x.activityLevel === activityLevel);
    if (preference) d = d.filter((x) => x.preference === preference);

    if (search) {
      const q = search.toLowerCase();
      d = d.filter(
        (x) =>
          String(x.id).includes(q) ||
          x.name.toLowerCase().includes(q) ||
          String(x.age).includes(q) ||
          x.country.toLowerCase().includes(q) ||
          x.preference.toLowerCase().includes(q)
      );
    }

    // Sorting
    const sorted = [...d].sort((a, b) => {
      const { key, direction } = sortBy;
      const dir = direction === "asc" ? 1 : -1;

      if (a[key] === b[key]) return 0;
      if (typeof a[key] === "number") return (a[key] - b[key]) * dir;
      return String(a[key]).localeCompare(String(b[key])) * dir;
    });

    return sorted;
  }, [gender, country, activityLevel, preference, search, sortBy]);

  // Pagination calculations
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // ensure page is in range when filters change
  if (page > totalPages) setPage(totalPages);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  // Helpers
  function toggleSort(key) {
    setSortBy((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }

  function clearFilters() {
    setGender("");
    setCountry("");
    setActivityLevel("");
    setPreference("");
    setSearch("");
    setPage(1);
    setSortBy({ key: "id", direction: "asc" });
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Users — Filters + Table</h2>
        <div className="flex gap-2">
          <button
            onClick={clearFilters}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Demographics</label>
          <div className="flex gap-2">
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value="">All genders</option>
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value="">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Engagement</label>
          <select
            value={activityLevel}
            onChange={(e) => {
              setActivityLevel(e.target.value);
              setPage(1);
            }}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="">All activity levels</option>
            {activities.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Preferences</label>
          <select
            value={preference}
            onChange={(e) => {
              setPreference(e.target.value);
              setPage(1);
            }}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="">All preferences</option>
            {preferences.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SEARCH + PAGE SIZE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="flex gap-2 items-center">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, id, country, preference..."
            className="border px-3 py-2 rounded w-72"
          />
          <div className="text-sm text-gray-600">Total: {total}</div>
        </div>

        <div className="flex gap-2 items-center">
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
      </div>

      {/* TABLE */}
      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: "id", label: "ID" },
                { key: "name", label: "Name" },
                { key: "age", label: "Age" },
                { key: "gender", label: "Gender" },
                { key: "country", label: "Country" },
                { key: "activityLevel", label: "Activity" },
                { key: "preference", label: "Preference" },
                { key: "lastActiveDays", label: "Last Active (days)" },
              ].map((col) => (
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
              <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-3 py-2">{row.id}</td>
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
                <td colSpan={8} className="text-center px-3 py-6 text-gray-500">
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
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            « First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ‹ Prev
          </button>

          <div className="px-3 py-1">
            Page {page} of {totalPages}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next ›
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Last »
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1} to{" "}
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
