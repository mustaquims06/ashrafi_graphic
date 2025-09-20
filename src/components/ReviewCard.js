import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
      <div className="flex items-center mb-2">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700">
          {review.name.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{review.name}</p>
          <p className="text-sm text-gray-500">{review.date}</p>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>

      <div className="mt-2 text-yellow-400">
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </div>
    </div>
  );
};

export default ReviewCard;
