import { useParams, useNavigate } from "react-router-dom";
import Back from "../../../../assets/BackButton.svg";

function ViewStaticPage({ pages }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const page = pages.find((p) => p.id === Number(id));
    const handleEdit = () => {navigate(`/cms/static-page/edit/${page.id}`);}

  if (!page)
    return (
      <div className="p-6 text-center text-red-600 text-lg">
        Page not found
      </div>
    );

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
            CMS / Static Page / View Static Page
          </h2>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white border border-gray-200 rounded-md shadow p-6 flex flex-col gap-6 w-full h-[500px]">
        <div className="flex flex-col gap-2">
          <label className="font-medium">
            Page Title
          </label>
          <p className="border rounded-md px-4 py-2 outline-none border-gray-500">
            {page.title}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">
            Description
          </label>
          <p className="border border-gray-500 rounded-md px-4 py-2 h-60 outline-none resize-none whitespace-pre-line">
            {page.description}
          </p>
        </div>

        {/* <div className="flex flex-col gap-2">
          <label className="font-medium">
            Last Updated
          </label>
          <p className="border border-gray-500 rounded-md px-4 py-2 outline-none">
            {page.lastUpdated}
          </p>
        </div> */}
                <div className="flex justify-center">
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewStaticPage;
