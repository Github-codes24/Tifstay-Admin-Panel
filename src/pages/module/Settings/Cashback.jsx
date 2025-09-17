import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

// Cashback Settings Main Page
function CashbackSettings({ onEdit, cashbackData }) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header - Outside main content */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="text-[24px] font-medium leading-none">
          Settings / Cashback Settings
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          
            {/* Cashback Details */}
            <div className="mx-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Referral Cashback Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cashback Point :</label>
                    <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                      {cashbackData.cashbackPoint}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Set Points on ₹ 1 :</label>
                    <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
                      {cashbackData.setPointsValue}
                    </div>
                  </div>
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

// Edit Cashback Settings Page
function EditCashbackSettings({ onUpdate, onBack, initialData }) {
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
          Settings / Cashback Settings / Edit
        </div>
      </div>

      {/* Edit Content */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          
            {/* Cashback Details Form */}
            <div className="mx-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Referral Cashback Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="cashbackPoint" className="text-sm font-medium text-gray-700">
                      Cashback Point :
                    </label>
                    <input
                      id="cashbackPoint"
                      type="number"
                      min="0"
                      value={formData.cashbackPoint}
                      onChange={(e) => handleInputChange('cashbackPoint', e.target.value)}
                      placeholder="Enter cashback points"
                      className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="setPointsValue" className="text-sm font-medium text-gray-700">
                      Set Points on ₹ 1 :
                    </label>
                    <input
                      id="setPointsValue"
                      type="number"
                      min="0"
                      value={formData.setPointsValue}
                      onChange={(e) => handleInputChange('setPointsValue', e.target.value)}
                      placeholder="Enter points value"
                      className="h-11 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    />
                  </div>
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

// Main Cashback App Component - This needs to be the default export
export default function CashbackApp() {
  const [currentPage, setCurrentPage] = useState('settings');
  const [showModal, setShowModal] = useState(false);
  const [cashbackData, setCashbackData] = useState({
    cashbackPoint: '250',
    setPointsValue: '10'
  });

  const handleEdit = () => {
    setCurrentPage('edit');
  };

  const handleUpdate = (formData) => {
    console.log('Updating cashback settings:', formData);
    setCashbackData(formData); // Update the main state with new values
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
        <CashbackSettings onEdit={handleEdit} cashbackData={cashbackData} />
      )}
      
      {currentPage === 'edit' && (
        <EditCashbackSettings
          onUpdate={handleUpdate}
          onBack={handleBack}
          initialData={cashbackData}
        />
      )}

      <SettingsUpdatedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}