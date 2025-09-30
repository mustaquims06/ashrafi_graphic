// src/components/OrderTimeline.jsx
import React from "react";

const stages = ["Pending", "Processing", "Dispatched", "Delivered"];


const OrderTimeline = ({ status }) => {
  const currentStage = stages.indexOf(status);

  return (
    <div className="flex items-center justify-between mt-4">
      {stages.map((stage, idx) => (
        <div key={stage} className="flex-1 flex flex-col items-center">
          {/* Circle */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2
              ${
                idx <= currentStage
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-300 text-gray-600"
              }
            `}
          >
            {idx + 1}
          </div>
          {/* Stage Name */}
          <span
            className={`text-xs font-medium ${
              idx <= currentStage ? "text-[var(--primary)]" : "text-gray-500"
            }`}
          >
            {stage}
          </span>
          {/* Line */}
          {idx < stages.length - 1 && (
            <div
              className={`h-1 w-full ${
                idx < currentStage ? "bg-[var(--primary)]" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;