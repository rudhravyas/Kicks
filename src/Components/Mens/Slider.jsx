import React from 'react';

const PriceSlider = ({ min, max, step, onChange }) => {
  const [value, setValue] = React.useState([min, max]);

  const handleChange = (e) => {
    const newValue = [e.target.value[0], e.target.value[1]];
    setValue(newValue); // Update the local state
    onChange(newValue); // Pass the updated value to the parent
  };

  return (
    <div>
      <input className=' accent-blue-500'
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => {
          const newValue = [Number(e.target.value), value[1]];
          setValue(newValue);
          onChange(newValue);
        }}
      />
      <input className=' accent-blue-500'
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => {
          const newValue = [value[0], Number(e.target.value)];
          setValue(newValue);
          onChange(newValue);
        }}
      />
      <p>
        Price Range: ₹{value[0]} - ₹{value[1]}
      </p>
    </div>
  );
};

export default PriceSlider;
