import React from 'react';

const MobileContainer = ({children}) => {
    return (
        <div className="w-full min-h-screen bg-black  flex items-center justify-center p-4">
      <div className="w-[390px] h-[800px] bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-300">
        {children}
      </div>
    </div>
    );
};

export default MobileContainer;