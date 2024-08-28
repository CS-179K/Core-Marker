import { useState, useEffect } from "react";
import { Box, Heading, Text, Spinner, VStack } from "@chakra-ui/react";
import NavBar from "../components/Navbar";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token"); // Assuming token is stored in local storage

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/user/me", {
          headers: {
            "x-access-token": token,
          },
        });

        if (!response.ok) {
          throw new Error(
            `User API call failed with status ${response.status}`,
          );
        } else {
          console.log("User response ok!");
        }

        const userResponse = await response.json();

        if (userResponse.status === "ok") {
          const userId = userResponse.user._id;
          console.log("User ID:", userId);

          const postsResponse = await fetch(
            `http://localhost:5001/api/user/${userId}`,
            {
              headers: {
                "x-access-token": token,
              },
            },
          );

          if (!postsResponse.ok) {
            throw new Error(
              `Posts API call failed with status ${postsResponse.status}`,
            );
          }

          const postsData = await postsResponse.json();

          if (postsData.success) {
            setPosts(postsData.data);
          } else {
            setError("Failed to fetch posts.");
          }
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`An error occurred while fetching posts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={5} maxW="800px" mx="auto">
      <NavBar />
      <Heading mb={6}>My Posts</Heading>
      <VStack spacing={4}>
        {posts.map((post) => (
          <Box
            key={post._id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Heading fontSize="xl">{post.title}</Heading>
            <Text mt={2}>{post.description}</Text>
            <Text mt={2} color="gray.600">
              Location: {post.location}
            </Text>
            <Text mt={2} color="gray.600">
              Likes: {post.likes}
            </Text>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
          </Box>
        ))}
        {posts.length === 0 && <Text>No posts available.</Text>}
      </VStack>
    </Box>
  );
};

export default Profile;
