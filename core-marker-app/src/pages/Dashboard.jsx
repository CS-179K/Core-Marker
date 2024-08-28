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
        const response = await fetch("http://localhost:5001/api/upload");
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

  const handleOpenComments = (post) => {
    setSelectedPost(post);
    onOpen(); // Opens the Drawer
  };
  
  const toggleLike = (post) => {
    // Assuming you have some API or logic to update likes in the backend
    const updatedPosts = posts.map((p) => {
      if (p._id === post._id) {
        return {
          ...p,
          liked: !p.liked,
          likes: p.liked ? p.likes - 1 : p.likes + 1,
        };
      }
      return p;
    });
  
    setPosts(updatedPosts);
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
