// src/components/SizeSelector.js
import React from 'react';
import { motion } from 'framer-motion';

const SizeSelector = ({ sizes, selectedSize, onSizeChange, label = "Size" }) => {
  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-900">
        {label}
      </label>

      {/* Size Options */}
      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => (
          <motion.button
            key={size.id}
            onClick={() => onSizeChange(size.value)}
            className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all duration-300 ${
              selectedSize === size.value
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {size.label}
          </motion.button>
        ))}
      </div>

      {/* Selected Size Display */}
      {selectedSize && (
        <p className="text-sm text-gray-600">
          Selected size: <span className="font-medium">{selectedSize} cm</span>
        </p>
      )}
    </div>
  );
};

export default SizeSelector;
