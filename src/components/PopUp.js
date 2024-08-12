import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Popup = ({ message, state, onClose }) => {
  // Auto-close the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Determine styles based on state (error or success)
  const isSuccess = state === 'success';
  const popupStyle = isSuccess ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
  const iconColor = isSuccess ? 'text-co_green' : 'text-co_red';

  return (
    <center className={` p-4 border-l-4 rounded-md shadow-md flex items-center  bg-lm_white w-1/4 ${popupStyle}`}>
      {/* Icon */}
      <div className={iconColor}>
        {isSuccess ? <FaCheckCircle size={24} /> : <FaTimesCircle size={24} />}
      </div>

      {/* Message */}
      <div className="text-black font-semibold">
        {message}
      </div>

      {/* Close Button */}
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-auto">
        ✕
      </button>
    </center>
  );
};

export default Popup;
