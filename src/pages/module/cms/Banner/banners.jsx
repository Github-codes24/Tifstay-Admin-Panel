import { IoIosSearch } from "react-icons/io";
import { useState, useMemo } from "react";
import { PiFunnel } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../../../../assets/bannerimg.jpg";
import logo from "../../../../assets/image.png";



function Banner({ banners, setBanners }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const bannersPerPage = 5;
  const navigate = useNavigate();

  // 🔍 Search filter
const searchFiltered = useMemo(() => {
  return (banners || []).filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [banners, searchQuery]);


  // 📌 Filter by status (Published / Draft)
const filteredBanners =
  selectedStatus.length === 0
    ? searchFiltered
    : searchFiltered.filter((b) => selectedStatus.includes(b.status));


  const totalPages = Math.ceil(filteredBanners.length / bannersPerPage);
  const indexOfLast = currentPage * bannersPerPage;
  const indexOfFirst = indexOfLast - bannersPerPage;
  const currentBanners = filteredBanners.slice(indexOfFirst, indexOfLast);

  const toggleStatus = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };

  const removeStatus = (status) => {
    setSelectedStatus((prev) => prev.filter((s) => s !== status));
  };

  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setBanners((prev) => prev.filter((b) => b.id !== bannerToDelete.id));
    setShowDeleteModal(false);
  };
  

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* 🔹 Top Header */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-medium">CMS / Banner</h2>

        <div className="flex items-center gap-2 w-[300px] h-[40px] border rounded-full px-4">
          <IoIosSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by banner name"
            className="flex-1 outline-none text-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <button
          onClick={() => navigate("/cms/banner/create")}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Create Banner
        </button>
      </div>

      {/* 🔹 Table Section */}
      <div className="bg-white rounded-md border border-gray-200 shadow p-4 flex flex-col gap-4">
        {/* Filter */}
        <div className="relative flex gap-3 items-center">
          <button onClick={() => setFilterOpen(!filterOpen)}>
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F8F5FF] text-[#004AAD]">
              <PiFunnel className="w-6 h-6" />
            </div>
          </button>

          <div className="flex gap-2">
            {selectedStatus.map((s) => (
              <div
                key={s}
                className="flex items-center gap-1 px-4 py-1 rounded-full bg-[#F8F5FF] text-sm"
              >
                {s}
                <button onClick={() => removeStatus(s)}>
                  <IoMdClose className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {filterOpen && (
            <div className="absolute top-12 left-0 bg-white border rounded-md shadow p-3 w-48 z-10">
              <span className="block text-sm font-medium mb-2">Status</span>
              {["All","Published", "Not Published"].map((status) => (
                <label
                  key={status}
                  className={`flex gap-2 items-center cursor-pointer mb-2 ${
                    selectedStatus.includes(status)
                      ? "text-orange-500 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(status)}
                    onChange={() => toggleStatus(status)}
                  />
                  {status}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Sr.No.</th>
                <th className="p-3">Banner Name</th>
                <th className="p-3">Service</th>
                <th className="p-3">Banner</th>
                <th className="p-3">Creation Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBanners.map((b, index) => (
                <tr key={b.id} className="bg-white shadow-sm rounded-md">
                  <td className="p-3">{indexOfFirst + index + 1}</td>
                  <td className="p-3">{b.name}</td>
                  <td className="p-3">{b.service}</td>
                  <td className="p-3">
                    <img
                      src={b.image ||fallbackImage}
                      alt="banner"
                      className="h-12 w-auto mx-auto rounded"
                    />
                  </td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">
                    <div className="flex gap-3 justify-center">
                      <button className="text-orange-500 hover:text-orange-600"  onClick={() => navigate(`/cms/banner/edit/${b.id}`)}>
                        <FaRegEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(b)}
                        className="text-orange-500 hover:text-orange-600"
                      >
                        <RiDeleteBin6Line className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600 bg-[#F5F5F5] px-4 py-2 rounded-md">
          <p>
            Showing {currentBanners.length} of {filteredBanners.length} Entries
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="w-6 h-6 bg-white text-[#004AAD] rounded"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-6 h-6 rounded ${
                  currentPage === i + 1
                    ? "bg-[#004AAD] text-white"
                    : "bg-white text-[#004AAD]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-6 h-6 bg-white text-[#004AAD] rounded"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 w-[400px] flex flex-col gap-4">
            <img src={logo} alt="Logo" className=" content-center"/>
            <h2 className="text-lg font-semibold text-center">
              Remove Banner
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Are you sure you want to delete this banner? This action cannot be
              undone.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-[#004AAD] text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
