import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fallbackImage from "../../../../assets/bannerimg.jpg";
import logo from "../../../../assets/image.png";
import Back from "../../../../assets/BackButton.svg";

function EditBanner({ banners, setBanners }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const banner = banners.find((b) => b.id === Number(id));

  const [bannerType, setBannerType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!banner) {
      navigate("/cms/banners");
      return;
    }

    // Parse banner name to get type
    if (banner.name.includes("Banner")) {
      const type = banner.name.replace(" Banner", "");
      setBannerType(type);
    } else {
      setBannerType(banner.name);
    }

    setServiceType(banner.service);
  }, [banner, navigate]);

  const handleUpdate = () => {
    const updated = {
      ...banner,
      name: `${bannerType} Banner`,
      service: serviceType,
      image: imageFile ? URL.createObjectURL(imageFile) : banner.image || fallbackImage,
    };

    setBanners((prev) =>
      prev.map((b) => (b.id === banner.id ? updated : b))
    );

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      navigate("/cms/banners");
    }, 2000);
  };

  if (!banner) return null;

  return (
    <div className="flex flex-col gap-6 font-inter relative">
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
            <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#004AAD] mb-1">
              Banner Updated!
            </h3>
            <p className="text-gray-600">Banner details have been updated.</p>
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
        <h2 className="text-2xl font-medium">CMS / Banner / Edit Banner</h2>
      </div>

      {/* Form */}
      <div className="bg-white border rounded-lg shadow p-6 w-full h-[512px] gap-6 mx-auto">
        <div className="bg-white border rounded-lg shadow p-6 w-full h-[400px] mx-auto flex flex-col gap-6">
          <div className="bg-white border rounded-lg shadow p-6 w-full h-auto gap-6 mx-auto">
            {/* Banner Type and Service Type */}
            <div className="flex gap-6">
              <div className="flex flex-col w-1/2">
                <label className="text-sm font-medium mb-1">Select Banner Type *</label>
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
                <label className="text-sm font-medium mb-1">Service Type *</label>
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
              <label className="text-sm font-medium mt-3 mb-2 block">Upload Banner Image *</label>
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
                    <img
                      src={banner.image || fallbackImage}
                      alt="Current"
                      className="h-24 mx-auto rounded object-cover"
                    />
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="px-6 py-2 text-center flex justify-center mt-4 bg-[#004AAD] text-white rounded-md hover:bg-[#003C8F] w-fit mx-auto"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditBanner;
