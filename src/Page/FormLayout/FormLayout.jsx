import React, { useState } from 'react';

const FormLayout = () => {
     const [pin, setPin] = useState("");

  const handlePress = (num) => {
    if (pin.length < 5) setPin(pin + num);
  };

  return (
     <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-20">
      
      {/* Title */}
      <h1 className="text-xl font-medium text-gray-800 mb-10">Enter PIN</h1>

      {/* PIN Dots */}
      <div className="flex gap-3 mb-16">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < pin.length ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          ))}
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-10 text-2xl font-light text-gray-800">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button key={num} onClick={() => handlePress(num)}>
            {num}
          </button>
        ))}

        {/* Empty Placeholder for Layout */}
        <div></div>

        {/* 0 Button */}
        <button onClick={() => handlePress(0)}>0</button>

        {/* Empty Placeholder for Layout */}
        <div></div>
      </div>

      {/* Forgot PIN */}
      <p className="mt-16 text-gray-400 text-sm">Forgot Your PIN Code?</p>
    </div>
  
  );
};

export default FormLayout;
