import { Link } from "react-router-dom";
import Post from "../components/Post";
import posts from "../data/posts";

export default function Home() {
    return (
      <div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">My Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((card, index) => (
              <Link
                key={index}
                to={`/post/${index}`} // Link to a dynamic route based on the index
                className="block" // Make sure the entire card is clickable
              >
                <Post
                  title={card.title}
                  content={card.content}
                  image={card.image}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

