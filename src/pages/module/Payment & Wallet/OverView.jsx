import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { PiFunnel } from "react-icons/pi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import NotFound from "../offers&Discount/NotFound";
import paymentConfig from "./PaymentConfig";

// ✅ Sample payment transactions (replace with API if needed)
const paymentData = [
  {
    id: 1,
    transactionId: "TRN987654FH10",
    customerName: "Vijay Karmarkar",
    transactionMode: "Debit Card",
    amount: "₹ 24,000",
    date: "24/08/2025",
    remarks: "Hostel Booking",
  },
  {
    id: 2,
    transactionId: "TRN987654FH11",
    customerName: "Ravi Sharma",
    transactionMode: "Wallet",
    amount: "₹ 54,500",
    date: "24/08/2025",
    remarks: "Tiffin Booking",
  },
  {
    id: 3,
    transactionId: "TRN987654FH12",
    customerName: "Amit Verma",
    transactionMode: "Debit Card",
    amount: "₹ 24,880",
    date: "24/08/2025",
    remarks: "Hostel Booking",
  },
  {
    id: 4,
    transactionId: "TRN987654FH13",
    customerName: "Priya Singh",
    transactionMode: "Wallet",
    amount: "₹ 64,070",
    date: "24/08/2025",
    remarks: "Deposit payout Request",
  },
];

function OverView() {
  const { payment } = useParams();
  const cfg = paymentConfig[payment];

  const navigate = useNavigate();

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(["Today"]);
  const [searchQuery, setSearchQuery] = useState("");

  if (!cfg) return <NotFound />;

  // 🔍 Filter data by search
  const filteredData = paymentData.filter(
    (row) =>
      row.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.remarks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (status) => {
    if (selectedStatus[0] === status) return;
    setSelectedStatus([status]);
  };

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center gap-16 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium leading-none">
          {cfg.listTitle}
        </h2>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-[300px] h-[40px] border rounded-full px-4">
          <IoIosSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder={cfg.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-[16px] font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="relative w-full p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4 font-inter">
        <div className="w-full rounded-[8px] border border-[#A5A5A5] p-6 flex flex-col gap-6 ">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-medium text-[24px] text-[#0A051F]">
              Payment Overview
            </h2>

            {/* Filter Funnel */}
            <div className="min-w-[120px] h-[32px] rounded-[8px] border px-2 flex justify-center items-center gap-2">
              <PiFunnel
                className="w-[18px] h-[18px] text-[#004AAD] cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
              />
              <span className="text-[#004AAD]">{selectedStatus[0]}</span>
            </div>

            {/* Filter Dropdown */}
            {filterOpen && (
              <div className="absolute top-12 right-24 w-[168px] bg-white border rounded-md shadow-lg p-2 z-10">
                <div className="flex justify-between p-2">
                  <span className="font-semibold text-[16px] text-[#0D2E28]">
                    Day
                  </span>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-[16px] h-[16px] text-sm"
                  >
                    ✕
                  </button>
                </div>
                {["Today", "This Week", "This Month"].map((status) => (
                  <label
                    key={status}
                    className={`flex items-center gap-2 mb-2 px-2 py-1 rounded cursor-pointer ${
                      selectedStatus[0] === status
                        ? "text-[#FF6B00] font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatus[0] === status}
                      onChange={() => toggleStatus(status)}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 flex items-center justify-center border rounded ${
                        selectedStatus[0] === status
                          ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                          : "border-gray-400 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    {status}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Cards */}
          
          {/* <div className="w-full h-[166px] bg-red-600">

            <div className="w-[338px] h-[166px] rounded-[16px] p-6"  style={{ background: "linear-gradient(180deg, #FFE7D6 0.86%, #F7E8DE 55.15%, #ECE9E9 76.27%)",}}>
                <h3 className="font-medium text-[12px] text-[#0A051]"> Gross Revenue </h3>

                <div className="text-[24px] font-medium flex items-center gap "><MdOutlineCurrencyRupee className="w-4 h-4"/>234,568.7</div>
                <div className="font-medium text-[10px] text-[#34C759] flex gap-2 items-center"><FaArrowTrendUp className="w-4 h-4" /> +3.7 % <span className="font-medium text-[8px]">Today</span></div>
            </div>

          </div> */}

          <div className="w-full h-[166px] flex gap-[14px] ">
            {/* Gross Revenue */}
            <div
              className="w-[338px] h-[166px] rounded-[16px] p-6 "
              style={{
                background:
                  "linear-gradient(180deg, #FFE7D6 0.86%, #F7E8DE 55.15%, #ECE9E9 76.27%)",
              }}
            >
              <h3 className="font-medium text-[12px] text-[#0A051]">
                Gross Revenue
              </h3>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <MdOutlineCurrencyRupee />
                  <h2 className="font-medium text-[24px] text-[#0A051F]">
                    234,568.7
                  </h2>
                </div>
                <div className="flex gap-1 items-center text-[#34C759] font-medium text-[10px] ">
                  <FaArrowTrendUp className="w-4 h-4" /> +3.7 % Today
                </div>
              </div>
            </div>

            {/* Other Small Cards */}
            <div className="w-full flex flex-col gap-4">
              <div className="flex gap-4">
                {[
                  "Total Commission Earned",
                  "Total Payouts Made",
                  "Total Deposit Refunds",
                ].map((title, i) => (
                  <div
                    key={i}
                    className="w-full h-[75px] rounded-[12px] border p-4 flex flex-col justify-between"
                  >
                    <h4 className="font-medium text-[14px] text-[#666060]">
                      {title}
                    </h4>
                    <div className="flex justify-between mt-2">
                      <div className="font-medium text-[14px] text-[#0A051F] flex items-center gap-1">
                        <MdOutlineCurrencyRupee /> 234,568.7
                      </div>
                      <div className="flex gap-1 items-center text-[#34C759] font-medium text-[10px] ">
                        <FaArrowTrendUp className="w-4 h-4" /> +3.7 %
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {[
                  "PG/Hostel Pending Payouts",
                  "Tiffin/Restaurant Pending Payouts",
                ].map((title, i) => (
                  <div
                    key={i}
                    className="w-full h-[75px] rounded-[12px] border p-4 flex flex-col justify-between"
                  >
                    <h4 className="font-medium text-[14px] text-[#666060]">
                      {title}
                    </h4>
                    <div className="flex justify-between mt-2">
                      <div className="font-medium text-[14px] text-[#0A051F] flex items-center gap-1">
                        <MdOutlineCurrencyRupee /> 234,568.7
                      </div>
                      <div
                        className="text-[#004AAD] font-medium text-[14px] cursor-pointer"
                        onClick={() => {
                          if (title.includes("Hostel")) {
                            navigate("/payment/pending-payouts"); // ✅ navigate to pending payouts
                          }
                          if (title.includes("Tiffin")) {
                            navigate("/payment/tiffin-pending-payouts"); // optional, for tiffin/restaurant
                          }
                        }}
                      >
                        See Details
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="w-full rounded-[8px] border border-[#A5A5A5] overflow-hidden mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9F9] text-[#0A051F] text-[14px] font-semibold">
                <th className="px-4 py-3 border">Sr.No.</th>
                <th className="px-4 py-3 border">Transaction ID</th>
                <th className="px-4 py-3 border">Customer Name</th>
                <th className="px-4 py-3 border">Transaction Mode</th>
                <th className="px-4 py-3 border">Amount</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Remarks</th>
                <th className="px-4 py-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={row.id}
                  className="text-[14px] text-[#333] hover:bg-[#FAFAFA]"
                >
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{row.transactionId}</td>
                  <td className="px-4 py-2 border">{row.customerName}</td>
                  <td className="px-4 py-2 border">{row.transactionMode}</td>
                  <td className="px-4 py-2 border">{row.amount}</td>
                  <td className="px-4 py-2 border">{row.date}</td>
                  <td className="px-4 py-2 border">{row.remarks}</td>
                  <td className="px-4 py-2 border text-center">
                    <button className="text-orange-500 hover:text-orange-700">
                      <FiEye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-gray-500 py-4 border"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OverView;
