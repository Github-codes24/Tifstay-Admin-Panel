import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Back from "../../../../assets/BackButton.svg";
import logo from "../../../../assets/image.png"; // replace with your logo path

function EditStaticPage({ pages, setPages }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const page = pages.find((p) => p.id === Number(id));

  const [title, setTitle] = useState(page?.title || "");
  const [description, setDescription] = useState(page?.description || "");
  const [showModal, setShowModal] = useState(false);

  if (!page) {
    return (
      <div className="p-6 text-center text-red-600 text-lg">Page not found</div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setPages((prev) =>
      prev.map((p) =>
        p.id === page.id
          ? {
              ...p,
              title,
              description,
              lastUpdated: new Date().toLocaleDateString("en-GB"),
            }
          : p
      )
    );

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigate("/cms/staticpage");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 font-inter relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
           <img src={Back} alt="back" />
          </button>
          <h2 className="text-2xl font-medium">
            CMS / Static Page / Edit Static Page
          </h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-md shadow">
        <form
          onSubmit={handleSave}
          className="bg-white rounded-md p-6 shadow-md border border-gray-400 flex flex-col gap-6 w-full h-[500px]"
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Page Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Page Title"
              className="border rounded-md px-4 py-2 outline-none border-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={7}
              placeholder="Enter Description..."
              className="border border-gray-500 rounded-md px-4 py-2 h-60 outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md"
            >
              Update
            </button>
            {/* <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-2 rounded-md"
            >
              Cancel
            </button> */}
          </div>
        </form>

        {/* ✅ Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
            <img
              src={logo} // Replace with your logo path
              alt="Logo"
              className="h-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-[#004AAD] mb-1">
              Static page Updated!
            </h3>
            <p className="text-gray-600">Static page has been updated now.</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default EditStaticPage;
