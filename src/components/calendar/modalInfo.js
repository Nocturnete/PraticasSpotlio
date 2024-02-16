import React from "react";

const ModalInfo = ({ isOpen, onClose, children }) => {
  // console.log("children", children)
  const productName = children && children.props.children[0].props.children;
  // console.log("productName", productName)
  const productDescription = children && children.props.children[1].props.children;
  // console.log("productDescription", productDescription)

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {productName}
            </h3>
            <p className="text-md font-semibold mb-4">{productDescription}</p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalInfo;
