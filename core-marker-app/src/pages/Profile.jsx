import "../components/Profile.css"; // Create this file for custom styles if needed
import Post from "../components/Post";
import posts from "../data/posts"; // Adjust the import path if needed

const Profile = () => {
  // Example user details
  const user = {
    name: "Profile Name",
    email: "user@example.com",
    bio: "Header title here",
    avatar: "22.png", // Replace with actual avatar image URL
    banner: "62.jpg", // Replace with actual banner image URL
  };

  return (
    <div className="profile-page">
      {/* Banner */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${user.banner})` }}
      >
        <div className="avatar-container">
          <img src={user.avatar} alt="Avatar" className="avatar" />
        </div>
      </div>

      {/* User Details */}
      <div className="user-details p-8">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-800 mt-4">{user.bio}</p>
      </div>

      {/* User Posts */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">My Posts</h2>
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
      </div>
    </div>
  );
};

export default Profile;
