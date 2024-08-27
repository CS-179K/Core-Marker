import { useEffect, useState } from "react";
import { Box, Grid, Image, Text, Heading, Button, Link, useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input } from "@chakra-ui/react";
import { Heart } from 'lucide-react';
import NavBar from "../components/Navbar";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Define selectedPost state
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  }, []);

  const toggleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  
  const handleOpenComments = (post) => {
    setSelectedPost(post);
    onOpen();
  };

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
                <Box mt="2" display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <Heart
                      onClick={() => toggleLike(post)}
                      style={{
                        cursor: 'pointer',
                        fill: post.liked ? 'red' : 'none',
                        stroke: 'black'
                      }}
                    />
                    <Text color="gray.500" ml={2}>{post.likes} Likes</Text>
                  </Box>
                  <Link
                    color="teal.500"
                    onClick={() => handleOpenComments(post)}
                    cursor="pointer"
                    textDecoration="underline"
                    mr={1}
                  >
                    View All Comments
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
      {selectedPost && (
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Comments for {selectedPost.title}</DrawerHeader>
            <DrawerBody>
              <Input placeholder="Type your comment here..." />
              {/* Additional UI elements for displaying existing comments */}
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue">Post Comment</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}    
    </div>
  );
};

export default Dashboard;
