import PropTypes from "prop-types";
import { useState } from "react";
import Comment from "./Comment";

const Post = ({ title, content, image }) => {
  const [smileycounter, setSmileyCounter] = useState(0);
  const [angrycounter, setAngryCounter] = useState(0);

  const smileybuttonClick = () => setCounter1(smileycounter + 1);
  const angrybuttonClick = () => setCounter2(angrycounter + 1);
  
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      {image && (
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
      <div className="flex justify-around p-4">
        <div className="flex items-center">
          <img
            src="/assets/Smiley.jpg"
            alt="Button 1"
            className="h-10 w-10 cursor-pointer"
            onClick={smileybuttonClick}
          />
          <span className="ml-2 text-lg">{smileycounter}</span>
        </div>
        <div className="flex items-center">
          <img
            src="/assets/angry-face.jpg"
            alt="Button 2"
            className="h-10 w-10 cursor-pointer"
            onClick={angrybuttonClick}
          />
          <span className="ml-2 text-lg">{angrycounter}</span>
        </div>
      </div>

      <Comment username="Frozone" comment="I am Frozone!" />
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string, // image is optional
};

export default Post;
