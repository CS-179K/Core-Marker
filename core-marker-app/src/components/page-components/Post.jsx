import { useState } from "react";
// Create this file for custom styles if needed

const Page = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., send the data to a server
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image);
  };

  return (
    <div className="post-page p-8">
      <h1 className="mb-4 text-2xl font-bold">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border-2 border-gray-300 p-2"
            required
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border-2 border-gray-300 p-2"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium">Image Upload:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="rounded-md border-2 border-gray-300 p-2"
            required
          />
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Preview"
                className="h-64 w-full rounded-md border-2 border-gray-300 object-cover"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Page;
