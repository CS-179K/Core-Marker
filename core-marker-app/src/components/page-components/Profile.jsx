import Post from "../components/Post";
import posts from "../data/posts";

const Profile = () => {
  const user = {
    name: "Profile Name",
    email: "user@example.com",
    bio: "Header title here",
    avatar: "22.png",
    banner: "62.jpg",
  };

  return (
    <div className="m-0 flex flex-col justify-center text-center">
      {/* Banner */}
      <div
        className="flex flex-col justify-center border-2 border-red-600 lg:h-96"
        style={{ backgroundImage: `url(${user.banner})` }}
      >
        <div className="border-2 border-green-400 pl-28">
          <img src={user.avatar} alt="Avatar" className="max-w-28" />
        </div>
      </div>

      {/* User Details */}
      <div className="user-details p-8">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-4 text-gray-800">{user.bio}</p>
      </div>

      {/* User Posts */}
      <div className="p-8">
        <h2 className="mb-4 text-2xl font-bold">My Posts</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((card, index) => (
            <Post
              key={index}
              title={card.title}
              content={card.content}
              image={card.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
