import posts from "./data/posts";
import Post from "./components/Post";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="p-8">
      <Navbar />

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

export default App;
