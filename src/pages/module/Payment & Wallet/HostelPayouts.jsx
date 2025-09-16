import { useState } from "react";

const payoutData = [
  {
    id: 1,
    hostelName: "Courtney Girls Hostel",
    weekAmount: "₹ 24,000",
    pendingAmount: "₹ 24,000",
    status: "Pending",
  },
  {
    id: 2,
    hostelName: "Albert Boys Hostel",
    weekAmount: "₹ 54,500",
    pendingAmount: "₹ 54,500",
    status: "Pending",
  },
  {
    id: 3,
    hostelName: "Albert Boys Hostel",
    weekAmount: "₹ 24,880",
    pendingAmount: "₹ 24,880",
    status: "Pending",
  },
  {
    id: 4,
    hostelName: "Courtney Girls Hostel",
    weekAmount: "₹ 64,070",
    pendingAmount: "₹ 64,070",
    status: "Pending",
  },
  {
    id: 5,
    hostelName: "Courtney Girls Hostel",
    weekAmount: "₹ 24,000",
    pendingAmount: "₹ 24,000",
    status: "Paid",
  },
];

function HostelPayouts() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = payoutData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(payoutData.length / rowsPerPage);

  return (
    <div className="p-4 font-inter">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 mb-4">
        Payment & Wallet / Payments Overview /{" "}
        <span className="font-semibold">PG or Hostel Pending Payouts</span>
      </div>

      {/* Top Payout Amount + Filters */}
      <div className="border rounded-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Total Payout Amount:{" "}
            <span className="text-black font-bold">₹ 234,568.7</span>
          </h2>
          <div className="flex gap-2">
            <select className="border rounded px-2 py-1 text-sm">
              <option>2025</option>
              <option>2024</option>
            </select>
            <select className="border rounded px-2 py-1 text-sm">
              <option>January</option>
              <option>February</option>
            </select>
            <select className="border rounded px-2 py-1 text-sm">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F9F9F9] text-[14px] font-semibold text-[#0A051F]">
              <th className="px-4 py-3 border">Sr.No.</th>
              <th className="px-4 py-3 border">Hostel Name</th>
              <th className="px-4 py-3 border">This Week Payout Amount</th>
              <th className="px-4 py-3 border">Total Payout Pending Amount</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr
                key={row.id}
                className="text-[14px] text-[#333] hover:bg-[#FAFAFA]"
              >
                <td className="px-4 py-2 border">
                  {indexOfFirstRow + index + 1}
                </td>
                <td className="px-4 py-2 border">{row.hostelName}</td>
                <td className="px-4 py-2 border">{row.weekAmount}</td>
                <td className="px-4 py-2 border">{row.pendingAmount}</td>
                <td
                  className={`px-4 py-2 border font-medium ${
                    row.status === "Pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {row.status}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm font-medium">
                    PAY AMOUNT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600">
          <span>
            Showing {indexOfFirstRow + 1} to{" "}
            {Math.min(indexOfLastRow, payoutData.length)} of{" "}
            {payoutData.length} Entries
          </span>
          <div className="flex gap-2 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-2 py-1 border rounded ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-2 py-1 border rounded ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostelPayouts;
