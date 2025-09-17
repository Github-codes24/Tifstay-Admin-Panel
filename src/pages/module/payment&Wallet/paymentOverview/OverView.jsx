import Sidebar from "../../../../components/Layouts/Sidebar";
import { IoIosSearch } from "react-icons/io";
import { useMemo, useState } from "react";
import { PiFunnel } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../../assets/image.png";
import { FaRegEdit } from "react-icons/fa";

import paymentConfig from "../PaymentConfig";

function OverView({ users, setUsers }) {
    const { payment } = useParams();
  const cfg = paymentConfig[payment] ?? paymentConfig.guests;

  const [filterOpen, setFilterOpen] = useState(true); // ✅ Filter box open by default
  const [selectedStatus, setSelectedStatus] = useState(["Today"]); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const navigate = useNavigate();

  const toggleStatus = (status) => {
    if (selectedStatus[0] === status) return; // Do nothing if already selected
    setSelectedStatus([status]);
    setCurrentPage(1);
  };

  const searchFilteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return user.bookingId.toString().includes(query);
  });

  const filteredUsers =
    selectedStatus.length === 0
      ? searchFilteredUsers
      : searchFilteredUsers.filter((user) =>
          selectedStatus.includes(user.status)
        );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


  // 🗑 Trash click
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // ❌ Cancel delete
  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  // ✅ Remove user
  const handleRemove = () => {
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center  gap-16 bg-white rounded-lg p-4 shadow-sm">
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page on new search
            }}
            className="flex-1 outline-none text-[16px] font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="relative w-full min-h-[600px] p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4 font-inter">
        <div className="w-full min-h-[270px] rounded-[8px] border border-[#A5A5A5] p-6 flex flex-col gap-6 ">
          <div className="w-full flex justify-between min-h-[28px] bg-red-600 items-center">
            <h2 className="font-medium text-[24px] text-[#0A051F]">
              Payment Overview
            </h2>

            {/* Filter Funnel */}
            <div className="min-w-[120px] h-[32px] rounded-[8px] border-[1.5px] border-[#A5A5A5] px-2 flex justify-center items-center gap-2">
              <PiFunnel
                className="w-[18px] h-[18px] text-[#004AAD] cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
              />
              <span className="text-[#004AAD]">{selectedStatus[0]}</span>
            </div>

            {/* Filter Box */}
            {filterOpen && (
              <div className="absolute top-12 right-24 w-[168px] min-h-[161px] bg-white border rounded-md shadow-lg p-2 z-10">
                <div className="min-h-[40px] flex justify-between p-2">
                  <span className="font-semibold text-[16px] text-[#0D2E28]">
                    Day
                  </span>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-[16px] h-[16px] text-[#0A051F] text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Filter Options */}
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

          <div className="w-full min-h-[166px] bg-red-600">
            <div className="w-[338px] h-full bg-blue-600"> jj</div>
          </div>

            
          
        </div>
        
      </div>
    </div>
  );
}

export default OverView;
