import { useState, useRef } from "react"; // import useRef
import { useNavigate } from "react-router-dom";
import Back from "../../../../assets/BackButton.svg";
import logo from "../../../../assets/image.png"; // replace with your logo path

function CreateStaticPage({ setPages }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Create a ref for the form
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newPage = {
      id: Date.now(),
      title,
      description,
      lastUpdated: new Date().toLocaleDateString("en-GB"),
    };

    setPages((prev) => [...prev, newPage]);

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
            CMS / Static Page / Create Static Page
          </h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-md shadow">
        <form
          ref={formRef} // assign ref here
          onSubmit={handleSubmit}
          className="bg-white rounded-md p-6 border border-gray-300 m-7 flex flex-col gap-6 w-auto h-5/6"
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Page Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Page Title"
              className="border rounded-md px-4 py-2 outline-none  border-gray-400"
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
              className="border border-gray-400 rounded-md px-4 py-2 h-60 outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>

        {/* Submit button outside the form */}
        <div className="flex justify-center">
          <button
            type="button" // must be button type "button" here
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md mb-4"
            onClick={() => {
              if (formRef.current) {
                formRef.current.requestSubmit(); // programmatically submit the form
              }
            }}
          >
            Create
          </button>
        </div>

        {/* Success Modal */}
       {showModal && (
         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
             <img
               src={logo} // Replace with your logo path
               alt="Logo"
               className="h-12 mx-auto mb-4"
             />
             <h3 className="text-xl font-semibold text-[#004AAD] mb-1">
               Static Page Created!
             </h3>
             <p className="text-gray-600">New Static page has been created.</p>
           </div>
         </div>
       )}
      </div>
    </div>
  );
}

export default CreateStaticPage;
