import { IoIosSearch } from "react-icons/io";
import { useMemo, useState } from "react";
import { PiFunnel } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/image.png";
import { FaRegEdit } from "react-icons/fa";
import roleConfig from "./RoleConfig";
 
function Owner({ users, setUsers }) {
  const { role } = useParams(); 
  const cfg = roleConfig[role] ?? roleConfig.guests;
 
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
 
  const navigate = useNavigate();
 
  // Toggle status filter
  const toggleStatus = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };
 
  const listForRole = useMemo(
    () => users.filter((u) => u.kind === role),
    [users, role]
  );
 
  const removeStatus = (status) => {
    setSelectedStatus((prev) => prev.filter((s) => s !== status));
    setCurrentPage(1);
  };
 
  const searchFilteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) || user.phone.includes(query)
    );
  });
 
  const filteredUsers =
    selectedStatus.length === 0
      ? searchFilteredUsers
      : searchFilteredUsers.filter((user) =>
          selectedStatus.includes(user.status)
        );
 
  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
 
  // Delete functionality
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };
 
  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };
 
  const handleRemove = () => {
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setShowDeleteModal(false);
  };
 
  return (
    <div className="flex flex-col gap-6 font-inter p-4 bg-gray-50 min-h-screen">
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between gap-4 bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">
          {cfg.listTitle}
        </h2>
 
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-80 h-12 border border-gray-200 rounded-full px-4 bg-gray-50 transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200">
          <IoIosSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, mobile no."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 outline-none text-base bg-transparent placeholder-gray-400"
          />
        </div>
 
        {/* Create Button */}
        <div
          className="w-48 h-12 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center rounded-xl text-white font-medium cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
          onClick={() => navigate(`/users/${role}/create`)}
        >
          {cfg.createButton}
        </div>
      </div>
 
      {/* Table Section */}
      <div className="w-full min-h-[540px] p-6 rounded-xl bg-white shadow-md border border-gray-100 flex flex-col gap-6">
        <div className="relative flex items-center gap-3">
          {/* Funnel Icon */}
          {/* <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
              filterOpen || selectedStatus.length > 0 
                ? "bg-orange-100 text-orange-600" 
                : "bg-purple-100 text-purple-600"
            }`}
          >
            <PiFunnel className="w-5 h-5" />
            {selectedStatus.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                {selectedStatus.length}
              </span>
            )}
          </button> */}
 
          {/* Selected Filters */}
          {/* <div className="flex gap-2 flex-wrap">
            {selectedStatus.map((status) => (
              <div
                key={status}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 font-medium text-sm transition-all hover:bg-orange-200"
              >
                {status}
                <button 
                  onClick={() => removeStatus(status)} 
                  className="ml-1 hover:text-orange-900"
                >
                  <IoMdClose className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div> */}
 
          {/* Dropdown */}
          {filterOpen && (
            <div className="absolute top-12 left-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-800">Filter by Status</span>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
 
              {/* Active Option */}
              <label
                className={`flex items-center gap-3 mb-2 p-2 rounded-lg cursor-pointer transition-all ${
                  selectedStatus.includes("Active")
                    ? "bg-orange-50 text-orange-700"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes("Active")}
                    onChange={() => toggleStatus("Active")}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 flex items-center justify-center border rounded transition-all ${
                    selectedStatus.includes("Active")
                      ? "bg-orange-500 border-orange-500"
                      : "border-gray-400"
                  }`}>
                    {selectedStatus.includes("Active") && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="font-medium">Active</span>
              </label>
 
              {/* Blocked Option */}
              <label
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                  selectedStatus.includes("Blocked")
                    ? "bg-orange-50 text-orange-700"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes("Blocked")}
                    onChange={() => toggleStatus("Blocked")}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 flex items-center justify-center border rounded transition-all ${
                    selectedStatus.includes("Blocked")
                      ? "bg-orange-500 border-orange-500"
                      : "border-gray-400"
                  }`}>
                    {selectedStatus.includes("Blocked") && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="font-medium">Blocked</span>
              </label>
            </div>
          )}
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto flex-1 font-inter pb-6">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 rounded-xl">
                <th className="p-4 rounded-l-xl">Sr.No.</th>
                <th className="p-4">{cfg.table.name}</th>
                <th className="p-4">{cfg.table.phone}</th>
                <th className="p-4">{cfg.table.address}</th>
                <th className="p-4">{cfg.table.status}</th>
                <th className="p-4 rounded-r-xl text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id} className="bg-white shadow-sm rounded-xl hover:shadow-md transition-colors duration-300 hover:-translate-y-0.5 hover:bg-blue-100">
                    <td className="p-4 rounded-l-xl font-medium text-gray-700 ">
                      {indexOfFirstUser + index + 1}
                    </td> 
                    <td className="p-4 font-medium text-gray-800">{user.name}</td>
                    <td className="p-4 text-gray-600">{user.phone}</td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">{user.address}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        user.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 rounded-r-xl">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300 hover:scale-110"
                          title="View"
                          onClick={() =>
                            navigate(`/users/${role}/${user.id}`, { state: { user } })
                          }
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
 
                        {role !== "guests" && (
                          <button
                            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-300 hover:scale-110"
                            title="Edit"
                            onClick={() =>
                              navigate(`/users/${role}/edit/${user.id}`, {
                                state: { user },
                              })
                            }
                          >
                            <FaRegEdit className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 hover:scale-110"
                          title="Delete"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <RiDeleteBin6Line className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No users found. Try adjusting your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
 
        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 rounded-xl px-4 py-3 bg-gray-50">
          <p className="font-medium">
            Showing <span className="text-orange-600 font-semibold">{currentUsers.length}</span> of{" "}
            <span className="text-orange-600 font-semibold">{filteredUsers.length}</span> Entries
          </p>
          
          {totalPages > 0 && (
            <div className="flex gap-2 items-center">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all shadow-sm"
              >
                &lt;
              </button>
 
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                    currentPage === i + 1 
                      ? "bg-orange-500 text-white shadow-md" 
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
 
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all shadow-sm"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
 
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md flex flex-col gap-5 items-center animate-scaleIn">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <RiDeleteBin6Line className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Remove User</h2>
            <p className="text-gray-600 text-center">
              Are you sure you want to remove <span className="font-semibold">{userToDelete?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 w-full mt-2">
              <button
                onClick={handleCancelDelete}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all shadow-md"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Owner;