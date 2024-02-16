import React from "react";
import "../../styles/calendar.css"

const Quantity = ({ value, onIncrement, onDecrement, onChange }) => {
  const increment = () => {
    onIncrement();
    onChange(isNaN(value) ? 1 : value + 1);
  };

  const decrement = () => {
    onDecrement();
    onChange(isNaN(value) || value <= 1 ? 1 : value - 1);
  };

  return (
    <div className="qty-container lg:flex">
      <button className="qty-btn-minus bg-blue-500 btn-rounded mr-1 text-white"
        onClick={decrement}
      >
        -
      </button>
      <input type="text" className="input-qty input-rounded" name="qty"
        value={isNaN(value) ? 1 : value}
        readOnly
      />
      <button className="qty-btn-plus bg-blue-500 btn-rounded ml-1 text-white"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
