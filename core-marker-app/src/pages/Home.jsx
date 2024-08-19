import "../components/Home.css"; // Create this file for custom styles if needed
import Post from "../components/Post";
import posts from "../data/posts";
const Home = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((card, index) => (
          <Post
            key={index}
            title={card.title}
            content={card.content}
            image={card.image}
          />
        ))}
      </div>

      <footer></footer>
    </div>
  );
};

export default Home;
