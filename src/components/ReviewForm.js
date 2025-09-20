import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview = {
      id: Date.now(),
      name,
      comment,
      rating,
      date: new Date().toLocaleDateString(),
    };

    onSubmit(newReview);
    setName('');
    setComment('');
    setRating(5);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Write a Review
      </h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
      />

      <textarea
        placeholder="Your Review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
      ></textarea>

      <label className="block mb-2 text-gray-700 dark:text-gray-300">Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="mb-3 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
