import { useEffect, useState } from "react";
import { Box, Grid, Image, Text, Heading } from "@chakra-ui/react";
import NavBar from "../components/Navbar";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/upload"); // Ensure the URL matches your API
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []); // Consider adding a dependency if you want to refetch posts

  return (
    <div>
      <NavBar />
      <Box p={5}>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {posts.map((post) => (
            <Box
              key={post._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              bg="white"
            >
              <Box height="200px" overflow="hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  height="100%"
                  width="100%"
                  objectFit="cover"
                />
              </Box>
              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Heading fontSize="xl" fontWeight="semibold">
                    {post.title}
                  </Heading>
                </Box>
                <Text mt="2">{post.description}</Text>
                <Text mt="2" fontWeight="bold">
                  Location: {post.location}
                </Text>
                <Text mt="2" color="gray.500">
                  {post.likes} Likes
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
