import { useState } from "react";

const payoutData = [
  {
    id: 1,
    hostelName: "Courtney Restaurant",
    weekAmount: "₹ 24,0000",
    totalAmount: "₹ 24,0000",
    status: "Pending",
  },
  {
    id: 2,
    hostelName: "Albert Tiffin House",
    weekAmount: "₹ 54,5000",
    totalAmount: "₹ 54,5000",
    status: "Pending",
  },
  {
    id: 3,
    hostelName: "Courtney Restaurant",
    weekAmount: "₹ 24,8800",
    totalAmount: "₹ 24,8800",
    status: "Pending",
  },
  {
    id: 4,
    hostelName: "Albert Meal Centre",
    weekAmount: "₹ 64,0700",
    totalAmount: "₹ 64,0700",
    status: "Pending",
  },
  {
    id: 5,
    hostelName: "Courtney Restaurant",
    weekAmount: "₹ 24,0000",
    totalAmount: "₹ 24,0000",
    status: "Paid",
  },
];

function TiffinPayouts() {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("January");
  const [week, setWeek] = useState("This Week");

  return (
    <div className="flex flex-col gap-6 font-inter">

      <div className="w-full h-[72px] flex items-center  gap-16 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium leading-none">
         Payment & Wallet / Payments Overview /Tiffin or Restaurant Pending Payouts

        </h2>
      </div>

      {/* Total Payout */}
      <div className="border rounded-md bg-white p-4 shadow ">
        <div className="flex  justify-between ">
        <h2 className="font-semibold text-[20px] text-gray-800">
          Total Payout Amount:{" "}
          <span className="text-black">₹ 234,568.7</span>
        </h2>

        <div className="flex gap-4 mb-4">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option>2025</option>
            <option>2024</option>
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option>January</option>
            <option>February</option>
          </select>
          <select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option>This Week</option>
            <option>Last Week</option>
          </select>
        </div>

        </div>

        <div className="w-full h-[669px] rounded-md bg-white  shadow">
        

      
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9F9F9] text-[#0A051F] text-[14px] font-semibold text-center">
              <th className="px-4 py-4 border h-[70px] ">Sr.No.</th>
              <th className="px-4 py-4 border h-[70px] ">Hostel Name</th>
              <th className="px-4 py-4 border h-[70px] ">This Week Payout Amount</th>
              <th className="px-4 py-4 border h-[70px] ">Total Payout Pending Amount</th>
              <th className="px-4 py-4 border h-[70px] ">Status</th>
              <th className="px-4 py-4 border h-[70px] ">Action</th>
            </tr>
          </thead>
          <tbody>
            {payoutData.map((row, index) => (
              <tr
                key={row.id}
                className="text-[14px] text-[#333] hover:bg-[#FAFAFA] text-center"
              >
                <td className="px-4 py-4 h-[80px]">{index + 1}</td>
                <td className="px-4 py-4 h-[80px]">{row.hostelName}</td>
                <td className="px-4 py-4 h-[80px]">{row.weekAmount}</td>
                <td className="px-4 py-4 h-[80px]">{row.totalAmount}</td>
                <td
                  className={`px-4 py-4 h-[80px] font-medium ${
                    row.status === "Pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {row.status}
                </td>
                <td className="px-4 py-4 h-[80px]">
                  <button className="bg-[#004AAD] text-white px-4 py-1 rounded-md font-medium hover:bg-[#003080] transition">
                    PAY AMOUNT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Pagination footer */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing 1 to {payoutData.length} of {payoutData.length} Entries
          </p>
          <div className="flex gap-2">
            <button className="px-2 border rounded">{"<"}</button>
            <button className="px-2 border rounded bg-[#004AAD] text-white">
              1
            </button>
            <button className="px-2 border rounded">2</button>
            <button className="px-2 border rounded">3</button>
            <button className="px-2 border rounded">{">"}</button>
          </div>
        </div>
      </div>


   

      {/* Filters + Table */}
      
    </div>
  );
}

export default TiffinPayouts;
