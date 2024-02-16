import React from "react";

const ModalBookNow = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg font-semibold mb-4">Product added to the cart!</p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBookNow;
