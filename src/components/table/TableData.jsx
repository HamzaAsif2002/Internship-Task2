import { useEffect, useMemo, useState } from "react";
import { GenerateData } from "../../data/GenerateData";

export const TableData = () => {
  const users = useMemo(() => GenerateData(), []);

  //   for filter data
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const filteredUsers = users
    // Filter by search term (name or email or country)
    .filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        u.country.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    // Filter by gender
    .filter((u) => (genderFilter ? u.gender === genderFilter : true))
    // Sort by name
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : sortOrder === "desc"
        ? b.name.localeCompare(a.name)
        : 0
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter, sortOrder]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // set pages.
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const goToPage = (n) => setCurrentPage(Math.max(1, Math.min(totalPages, n)));
  const prevPage = () => goToPage(currentPage - 1);
  const nextPage = () => goToPage(currentPage + 1);

  return (
    <div className=" p-6 w-auto rounded-2xl">
      {/* Filters and Search Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-t-xl shadow">
        {/* Sort button */}

        <select
          name="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Set Sort</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        {/* Search input */}
        <input
          type="text"
          placeholder="Enter Country, Name or Mail"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Gender dropdown */}
        <select
          name="gender"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-b-xl shadow-md overflow-hidden">
          {/* Table Head */}
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Country
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Gender
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers
                .slice((currentPage - 1) * pageSize, currentPage * pageSize) // paginate
                .map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3 text-gray-900">{user.name}</td>
                    <td className="px-6 py-3 text-gray-600">{user.email}</td>
                    <td className="px-6 py-3 text-gray-600">{user.country}</td>
                    <td className="px-6 py-3 text-gray-600">{user.gender}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-5 mt-3">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "text-gray-400 border border-gray-200"
              : "bg-white border"
          }`}
        >
          Prev
        </button>

        {/* Middle Buttons */}
        <div className="hidden sm:flex items-center gap-1">
          {/* First Page */}
          <button
            onClick={() => goToPage(1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            1
          </button>

          {/* If currentPage is near the start */}
          {currentPage <= 3 && totalPages > 4 && (
            <>
              {[2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`px-3 py-1 rounded ${
                    currentPage === p
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="px-2">...</span>
            </>
          )}

          {/* If currentPage is in the middle */}
          {currentPage > 3 && currentPage < totalPages - 2 && (
            <>
              <span className="px-2">...</span>
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white"
                disabled
              >
                {currentPage}
              </button>
              <span className="px-2">...</span>
            </>
          )}

          {/* If currentPage is near the end */}
          {currentPage >= totalPages - 2 && totalPages > 4 && (
            <>
              <span className="px-2">...</span>
              {[totalPages - 2, totalPages - 1].map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`px-3 py-1 rounded ${
                    currentPage === p
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {p}
                </button>
              ))}
            </>
          )}

          {/* Last Page */}
          {totalPages > 1 && (
            <button
              onClick={() => goToPage(totalPages)}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {totalPages}
            </button>
          )}
        </div>
        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "text-gray-400 border border-gray-200"
              : "bg-white border"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
