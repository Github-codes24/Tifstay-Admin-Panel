import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { PiFunnel } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { FiEye } from "react-icons/fi";


function PayoutHistory() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const usersPerPage = 5;

  // ✅ Sample Transactions Data (with type field)
  const transactions = [
    {
      id: 1,
      transactionId: "TRN987654FH10",
      userName: "Scholar Den Boys Hostel",
      amount: "₹ 24,0000",
      date: "24/08/2025",
      type: "pgHostel",
    },
    {
      id: 2,
      transactionId: "TRN987654FH11",
      userName: "Ghar ka khana",
      amount: "₹ 54,5000",
      date: "24/08/2025",
      type: "tiffinRestaurant",
    },
    {
      id: 3,
      transactionId: "TRN987654FH12",
      userName: "Vijay Karmarkar",
      amount: "₹ 24,8800",
      date: "24/08/2025",
      type: "customer",
    },
    {
      id: 4,
      transactionId: "TRN987654FH13",
      userName: "Albert Meal Centre",
      amount: "₹ 64,0700",
      date: "24/08/2025",
      type: "tiffinRestaurant",
    },
    {
      id: 5,
      transactionId: "TRN987654FH14",
      userName: "PG Paradise",
      amount: "₹ 24,0000",
      date: "24/08/2025",
      type: "pgHostel",
    },
  ];

  // ✅ Search filter
  const searchFiltered = transactions.filter((txn) =>
    txn.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Type Filter
  const filteredTransactions =
    selectedFilters.length === 0
      ? searchFiltered
      : searchFiltered.filter((txn) => selectedFilters.includes(txn.type));

  // ✅ Pagination
  const totalPages = Math.ceil(filteredTransactions.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentTxns = filteredTransactions.slice(indexOfFirst, indexOfLast);


  // ✅ Toggle filters
  const toggleFilter = (type) => {
    setSelectedFilters((prev) =>
      prev.includes(type)
        ? prev.filter((f) => f !== type)
        : [...prev, type]
    );
    setCurrentPage(1);
  };

  const removeFilter = (type) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== type));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center justify-between gap-2 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium leading-none">
          Payment & Wallet / Wallet Transactions
        </h2>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-[300px] h-[40px] border rounded-full px-4">
          <IoIosSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by transaction id"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 outline-none text-[16px] font-medium placeholder-gray-400"
          />
        </div>

        {/* Export Button */}
        <div className="w-[120px] h-[40px] bg-[#FF6B00] flex items-center justify-center rounded-[8px] text-white cursor-pointer hover:bg-orange-600 transition">
          Export
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full min-h-[540px] p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4">
        <div className="relative flex items-center gap-3">
          {/* Filter Button */}
          <button onClick={() => setFilterOpen(!filterOpen)}>
            <div className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F8F5FF] text-[#004AAD]">
              <PiFunnel className="w-6 h-6" />
            </div>
          </button>

          {/* Selected Filters */}
          <div className="flex gap-2">
            {selectedFilters.map((f) => (
              <div
                key={f}
                className="flex items-center gap-1 rounded-[40px] px-4 py-2 bg-[#F8F5FF] text-[#0A051F]"
              >
                {f === "pgHostel"
                  ? "PG/Hostel"
                  : f === "tiffinRestaurant"
                  ? "Tiffin/Restaurant"
                  : "Customer"}
                <button onClick={() => removeFilter(f)} className="ml-1">
                  <IoMdClose className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Dropdown Filters */}
          {filterOpen && (
            <div className="absolute top-12 w-[250px] bg-white border rounded-md shadow-lg p-3 z-10">
              <h3 className="font-medium mb-2">Filter By</h3>

              {/* PG/Hostel */}
              <label
                className="flex items-center gap-2 mb-2 cursor-pointer"
                onClick={() => toggleFilter("pgHostel")}
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("pgHostel")}
                  readOnly
                />
                PG/Hostel
              </label>

              {/* Tiffin/Restaurant */}
              <label
                className="flex items-center gap-2 mb-2 cursor-pointer"
                onClick={() => toggleFilter("tiffinRestaurant")}
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("tiffinRestaurant")}
                  readOnly
                />
                Tiffin/Restaurant
              </label>

              {/* Customer */}
              <label
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleFilter("customer")}
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("customer")}
                  readOnly
                />
                Customer
              </label>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1 font-inter pb-6">
          <table className="w-full text-center border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-[80px] p-4">Sr.No.</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTxns.map((txn, index) => (
                <tr key={txn.id} className="bg-white shadow-sm rounded-lg">
                  <td className="px-4 py-3">{indexOfFirst + index + 1}</td>
                  <td className="px-4 py-3">{txn.transactionId}</td>
                  <td className="px-4 py-3">{txn.userName}</td>
                  <td className="px-4 py-3">{txn.amount}</td>
                  <td className="px-4 py-3">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600 rounded-[8px] px-4 py-2 bg-[#F5F5F5]">
          <p>
            Showing {currentTxns.length} of {filteredTransactions.length} Entries
          </p>
          <div className="flex gap-2 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="w-6 h-6 p-4 text-[#004AAD] bg-white rounded-[8px]"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-6 h-6 p-4 rounded-[8px] ${
                  currentPage === i + 1
                    ? "bg-[#004AAD] text-white font-bold"
                    : "bg-white text-[#004AAD] font-bold"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="w-6 h-6 p-4 text-[#004AAD] bg-white rounded-[8px]"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayoutHistory;
