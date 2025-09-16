import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../../../../assets/bannerimg.jpg"; // adjust path if needed
import logo from "../../../../assets/image.png"; // replace with your logo path
import Back from "../../../../assets/BackButton.svg";

function CreateBanner({ setBanners }) {
  const [bannerType, setBannerType] = useState("Dashboard");
  const [serviceType, setServiceType] = useState("Tiffin/Restaurant");
  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    const newBanner = {
      id: Date.now(),
      name: `${bannerType} Banner`,
      service: serviceType,
      image: imageFile ? URL.createObjectURL(imageFile) : fallbackImage,
      date: new Date().toLocaleDateString(),
      status: "Published",
    };

    setBanners((prev) => [...prev, newBanner]);
    setShowPopup(true);

    // Navigate after a short delay (e.g., 2 seconds)
    setTimeout(() => {
      setShowPopup(false);
      navigate("/cms/banners");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 font-inter relative">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
            <img
              src={logo} // Replace with your logo path
              alt="Logo"
              className="h-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-[#004AAD] mb-1">
              Banner Created!
            </h3>
            <p className="text-gray-600">New banner has been created.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-2">
        <button
          onClick={() => navigate("/cms/banners")}
          className="text-[#004AAD] text-xl font-bold"
        >
          <img src={Back} alt="back Button" />
        </button>
        <h2 className="text-2xl font-medium">CMS / Banner / Create Banner</h2>
      </div>

      {/* Form */}
      <div className="bg-white border rounded-lg shadow p-6 w-full h-[512px] gap-6 mx-auto">
        <div className="bg-white border rounded-lg shadow p-6 w-full h-[400px]  mx-auto flex flex-col gap-6">
          <div className="bg-white border rounded-lg shadow p-6 w-full h-auto gap-6 mx-auto">
            {/* Banner Type */}
            <div className="flex gap-6">
              <div className="flex flex-col w-1/2">
                <label className="text-sm font-medium mb-1">
                  Select Banner Type *
                </label>
                <select
                  value={bannerType}
                  onChange={(e) => setBannerType(e.target.value)}
                  className="border rounded-md px-3 py-2 text-gray-500"
                >
                  <option>Dashboard</option>
                  <option>Home</option>
                  <option>Offers</option>
                </select>
              </div>

              <div className="flex flex-col w-1/2">
                <label className="text-sm font-medium mb-1">
                  Service Type *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="border rounded-md px-3 py-2 text-gray-500"
                >
                  <option>Tiffin/Restaurant</option>
                  <option>Restaurant</option>
                  <option>Tiffin</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium mt-3 mb-2 block">
                Upload Banner Image *
              </label>
              <div className="border-2 border-dashed rounded-md w-1/2 p-6 text-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="banner-upload"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <label htmlFor="banner-upload" className="cursor-pointer">
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className="h-24 mx-auto rounded object-cover"
                    />
                  ) : (
                    <div className="text-gray-500">
                      Click to upload (Upto 1 GB)
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-2 text-center flex justify-center mt-4 bg-[#004AAD] text-white rounded-md hover:bg-[#003C8F] w-fit mx-auto"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateBanner;
