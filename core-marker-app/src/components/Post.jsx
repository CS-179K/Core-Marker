import PropTypes from "prop-types";
const Post = ({ title, content, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string, // image is optional
};

export default Post;
