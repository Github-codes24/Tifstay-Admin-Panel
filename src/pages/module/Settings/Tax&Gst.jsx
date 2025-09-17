import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

// Tax & GST Settings Main Page
function TaxGSTSettings({ onEdit }) {
  const [taxData] = useState({
    gstinNumber: 'ABC1234567',
    gstPercentage: '12',
    sgtsPercentage: '18'
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header - Outside main content */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="text-[24px] font-medium leading-none">
          Settings / Tax & GST Settings
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          
            {/* Tax & GST Details */}
            <div className="mx-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Tax & GST Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">GSTIN Number :</label>
                    <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                      {taxData.gstinNumber}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">GST % :</label>
                    <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                      {taxData.gstPercentage}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">SGTS % :</label>
                    <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                      {taxData.sgtsPercentage}%
                    </div>
                  </div>
                  {/* Empty space to maintain grid layout */}
                  <div></div>
                </div>
              </div>
            </div>
          
        </div>

        {/* Edit Button - Outside main content at bottom */}
        <div className="flex justify-center pt-6">
          <button
            onClick={() => onEdit && onEdit()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-lg font-medium text-base transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// Edit Tax & GST Settings Page
function EditTaxGSTSettings({ onUpdate, onBack, initialData }) {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Title Bar */}
      <div className="w-full h-[72px] flex items-center gap-1 bg-white rounded-lg p-4 shadow-sm mb-6">
        <IoArrowBackCircleOutline
          className="w-[33.33px] h-[33.33px] cursor-pointer text-[#000000]" 
          onClick={onBack}
        />
        <div className="text-[24px] font-medium leading-none">
          Settings / Tax & GST Settings / Edit
        </div>
      </div>

      {/* Edit Content */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          
            {/* Tax & GST Details Form */}
            <div className="mx-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Tax & GST Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="gstinNumber" className="text-sm font-medium text-gray-700">
                      GSTIN Number :
                    </label>
                    <input
                      id="gstinNumber"
                      type="text"
                      value={formData.gstinNumber}
                      onChange={(e) => handleInputChange('gstinNumber', e.target.value)}
                      placeholder="Enter GSTIN Number"
                      className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="gstPercentage" className="text-sm font-medium text-gray-700">
                      GST % :
                    </label>
                    <input
                      id="gstPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.gstPercentage}
                      onChange={(e) => handleInputChange('gstPercentage', e.target.value)}
                      placeholder="Enter GST percentage"
                      className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="sgtsPercentage" className="text-sm font-medium text-gray-700">
                      SGTS % :
                    </label>
                    <input
                      id="sgtsPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.sgtsPercentage}
                      onChange={(e) => handleInputChange('sgtsPercentage', e.target.value)}
                      placeholder="Enter SGTS percentage"
                      className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>
                  {/* Empty space to maintain grid layout */}
                  <div></div>
                </div>
              </div>
            </div>
          
        </div>

        {/* Update Button - Outside main content at bottom */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-lg font-medium text-base transition-colors"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

// Success Modal
function SettingsUpdatedModal({ isOpen }) {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <img 
            src="/src/assets/image.png" 
            alt="Success" 
            className="w-16 h-16 object-contain"
           />
          </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings Updated!</h3>
        <p className="text-gray-600 mb-6">Your commission settings have been successfully updated.</p>
      
      </div>
    </div>
  );
}

// Main Tax & GST App Component - This needs to be the default export
export default function TaxGSTApp() {
  const [currentPage, setCurrentPage] = useState('settings');
  const [showModal, setShowModal] = useState(false);
  const [taxData, setTaxData] = useState({
    gstinNumber: 'ABC1234567',
    gstPercentage: '12',
    sgtsPercentage: '18'
  });

  const handleEdit = () => {
    setCurrentPage('edit');
  };

  const handleUpdate = (formData) => {
    console.log('Updating tax & GST settings:', formData);
    setTaxData(formData); // Update the main state with new values
    setShowModal(true);
    // After showing modal, redirect back to settings
    setTimeout(() => {
      setShowModal(false);
      setCurrentPage('settings');
    }, 2000);
  };

  const handleBack = () => {
    setCurrentPage('settings');
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'settings' && (
        <TaxGSTSettings onEdit={handleEdit} taxData={taxData} />
      )}
      
      {currentPage === 'edit' && (
        <EditTaxGSTSettings
          onUpdate={handleUpdate}
          onBack={handleBack}
          initialData={taxData}
        />
      )}

      <SettingsUpdatedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}