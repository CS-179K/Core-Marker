import PropTypes from 'prop-types';

const Comment = ({ username, comment }) => {
  return (
    <div className="border-t border-gray-200 mt-4 pt-4">
      <p className="font-semibold">{username}</p>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
};

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Comment;