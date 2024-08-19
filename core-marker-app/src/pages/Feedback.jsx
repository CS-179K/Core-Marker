import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    email: '',
    subject: '',
    context: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.place || !formData.email || !formData.subject || !formData.context) {
      alert("Please fill out all fields.");
      return;
    }

    emailjs.send('service_s0sdo1k', 'template_9vaag1n', formData, 'K6r7r15yoNXpVwX5P')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Feedback sent successfully!');
        setFormData({ name: '', place: '', email: '', subject: '', context: '' });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('There was an error sending your feedback.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Feedback Form</h2>

        {/* Name Field */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-bold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3"
            required
          />
        </div>

        {/* Place Field */}
        <div className="mb-6">
          <label htmlFor="place" className="block text-lg font-bold text-gray-700 mb-2">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-bold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3"
            required
          />
        </div>

        {/* Subject Field */}
        <div className="mb-6">
          <label htmlFor="subject" className="block text-lg font-bold text-gray-700 mb-2">Subject (50 words max)</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            maxLength="50"
            className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3"
            required
          />
        </div>

        {/* Context Field */}
        <div className="mb-8">
          <label htmlFor="context" className="block text-lg font-bold text-gray-700 mb-2">Context</label>
          <textarea
            id="context"
            name="context"
            value={formData.context}
            onChange={handleChange}
            rows="8"
            className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-4 rounded hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
