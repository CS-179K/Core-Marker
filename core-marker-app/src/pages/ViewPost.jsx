import React from 'react';

const ViewPost = ({ title, content, image }) => {
  console.log("Title:", title);
  console.log("Content:", content);
  console.log("Image:", image);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-lg w-full">
        {image && (
          <img src={image} alt={title} className="w-full h-64 object-cover" />
        )}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;