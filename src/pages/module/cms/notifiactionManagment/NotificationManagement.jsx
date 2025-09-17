import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import logo from "../../../../assets/image.png"; // adjust path if needed

function NotificationManagement() {
  const [userType, setUserType] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userType || !title.trim() || !message.trim()) {
      alert("Please fill all required fields");
      return;
    }
    // do your submit logic
    console.log({ userType, title, message });

    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      // optionally reset
      setUserType("");
      setTitle("");
      setMessage("");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 font-inter relative ">
      {/* Top Bar */}
      <div className="flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800"
        >
          <IoArrowBack className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-medium">CMS / Notification Management</h2>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-gray-300 rounded-md shadow p-6 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Type */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                Select User Type <span className="text-red-500">*</span>
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="border border-gray-400 rounded-md px-4 py-2 outline-none"
              >
                <option value="">Select</option>
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Notification Title */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                Notification Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Notification Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-400 rounded-md px-4 py-2 outline-none"
              />
            </div>
          </div>

          {/* Notification Message */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Notification Message <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Notification Message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-400 rounded-md px-4 py-2 outline-none resize-none w-full"
            />
          </div>

          {/* Send Notification button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[320px] text-center">
            <img
              src={logo}
              alt="Logo"
              className="h-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-[#004AAD] mb-1">
              Notification Sent!
            </h3>
            <p className="text-gray-600">
              notification has been sent.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationManagement;
