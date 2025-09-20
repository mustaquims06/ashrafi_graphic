import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-10">
      {/* spinner uses our custom .spinner class */}
      <div className="spinner"></div>
      <span className="ml-4 text-[var(--secondary)]">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;