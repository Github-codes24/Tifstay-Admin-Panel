import { useState } from "react";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function StaticPage({ pages, setPages }) {
  // const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const filtered = pages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = (id) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-medium">CMS / Static Page</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border rounded-full px-4 py-2 w-[260px]">
            <input
              type="text"
              placeholder="Search by page title"
              className="outline-none text-sm w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset to first page on search
              }}
            />
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/cms/static-page/create")}
          >
            Create Static Page
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-md shadow">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
              <th className="text-left px-4 py-3 w-[60px]">Sr.No.</th>
              <th className="text-left px-4 py-3">Page Title</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3 w-[130px]">Last Updated</th>
              <th className="text-center px-4 py-3 w-[120px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((p, i) => (
              <tr
                key={p.id}
                className="bg-white hover:bg-gray-50 text-sm shadow-sm"
              >
                <td className="px-4 py-3">
                  {indexOfFirst + i + 1}
                </td>
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-gray-600 max-w-[300px] truncate">
                  {p.description}
                </td>
                <td className="px-4 py-3">{p.lastUpdated}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-3 text-orange-500">
                    <button className="hover:text-orange-600"  onClick={() => navigate(`/cms/static-page/view/${p.id}`)}>
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button className="hover:text-orange-600"  onClick={() => navigate(`/cms/static-page/edit/${p.id}`)}>
                      <FaRegEdit className="w-4 h-4" />
                    </button>
                    <button
                      className="hover:text-red-600"
                      onClick={() => handleDelete(p.id)}
                    >
                      <FaTrashAlt className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer with real pagination */}
        <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 border-t">
          <span>
            Showing {indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 border rounded"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-2 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-2 py-1 border rounded"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaticPage;
