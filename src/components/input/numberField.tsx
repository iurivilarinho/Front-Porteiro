import React, { useState } from 'react';

interface NumberFieldProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const [internalValue, setInternalValue] = useState<number>(value);

  const handleIncrement = () => {
    if (internalValue < max) {
      const newValue = internalValue + step;
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (internalValue > min) {
      const newValue = internalValue - step;
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= min && newValue <= max) {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleDecrement}
        className="w-11 h-11 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
      >
        -
      </button>
      <input
        value={internalValue}
        onChange={handleChange}
        className="w-20 h-11 text-center border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="w-11 h-11 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
      >
        +
      </button>
    </div>
  );
};
