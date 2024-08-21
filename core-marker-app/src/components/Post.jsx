import PropTypes from "prop-types";
const Post = ({ title, content, image }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      {image && (
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
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
