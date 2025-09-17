import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

// Commission Settings Main Page
function CommissionSettings({ onEdit, commissionData }) {
  const [activeTab, setActiveTab] = useState('pgHostel');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header - Outside main content */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="text-[24px] font-medium leading-none">
          Settings / Commission Settings
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          
            {/* Tab Navigation */}
            <div className="flex border-2 border-blue-600 square-lg overflow-hidden m-6 mb-4">
              <button
                onClick={() => setActiveTab('pgHostel')}
                className={`flex-1 px-6 py-3 font-medium text-large ${
                  activeTab === 'pgHostel'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-gray-50'
                } transition-colors`}
              >
                PG/Hostel Booking
              </button>
              <button
                onClick={() => setActiveTab('tiffin')}
                className={`flex-1 px-6 py-3 font-medium text-large ${
                  activeTab === 'tiffin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-gray-50'
                } transition-colors`}
              >
                Tiffin/Restaurant Order
              </button>
            </div>

            {/* Commission Details */}
            <div className="mx-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Commission Details</h3>
                
                {activeTab === 'pgHostel' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Commission On :</label>
                      <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                        PG/Hostel Booking
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Commission % :</label>
                      <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                        {commissionData.pgHostelCommission}%
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Commission On :</label>
                      <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                        Tiffin/Restaurant Order
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Commission % :</label>
                      <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                        {commissionData.tiffinCommission}%
                      </div>
                    </div>
                  </div>
                )}
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

// Edit Commission Settings Page
function EditCommissionSettings({ onUpdate, onBack, initialData }) {
  const [activeTab, setActiveTab] = useState('pgHostel');
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
          Settings / Commission Settings / Edit
        </div>
      </div>

      {/* Edit Content */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          
            {/* Tab Navigation */}
            <div className="flex border-2 border-blue-600 square-lg overflow-hidden m-6 mb-4">
              <button
                onClick={() => setActiveTab('pgHostel')}
                className={`flex-1 px-6 py-3 font-medium text-large ${
                  activeTab === 'pgHostel'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                PG/Hostel Booking
              </button>
              <button
                onClick={() => setActiveTab('tiffin')}
                className={`flex-1 px-6 py-3 font-medium text-large ${
                  activeTab === 'tiffin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                Tiffin/Restaurant Order
              </button>
            </div>

            {/* Commission Details Form */}
            <div className="mx-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Commission Details</h3>
                
                {activeTab === 'pgHostel' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Commission On :
                      </label>
                      <input
                        type="text"
                        value="PG/Hostel Booking"
                        readOnly
                        className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="pgHostelCommission" className="text-sm font-medium text-gray-700">
                        Commission % :
                      </label>
                      <input
                        id="pgHostelCommission"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.pgHostelCommission}
                        onChange={(e) => handleInputChange('pgHostelCommission', e.target.value)}
                        placeholder="5%"
                        className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Commission On :
                      </label>
                      <input
                        type="text"
                        value="Tiffin/Restaurant Order"
                        readOnly
                        className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="tiffinCommission" className="text-sm font-medium text-gray-700">
                        Commission % :
                      </label>
                      <input
                        id="tiffinCommission"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.tiffinCommission}
                        onChange={(e) => handleInputChange('tiffinCommission', e.target.value)}
                        placeholder="5%"
                        className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                )}
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
// Main Commission App Component - This needs to be the default export
export default function CommissionApp() {
  const [currentPage, setCurrentPage] = useState('settings');
  const [showModal, setShowModal] = useState(false);
  const [commissionData, setCommissionData] = useState({
    pgHostelCommission: '15',
    tiffinCommission: '12',
    referralCommission: '5'
  });

  const handleEdit = () => {
    setCurrentPage('edit');
  };

  const handleUpdate = (formData) => {
    console.log('Updating commission settings:', formData);
    setCommissionData(formData); // Update the main state with new values
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
        <CommissionSettings onEdit={handleEdit} commissionData={commissionData} />
      )}
      
      {currentPage === 'edit' && (
        <EditCommissionSettings
          onUpdate={handleUpdate}
          onBack={handleBack}
          initialData={commissionData}
        />
      )}

      <SettingsUpdatedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}