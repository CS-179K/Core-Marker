import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import PostCard from "../components/PostCard";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/upload");
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
          console.log("Posts fetched successfully!");
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  const handleOpenComments = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  const toggleLike = async (post) => {
    try {
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

      const response = await fetch(
        `http://localhost:5001/api/upload/${post._id}/likes`,
        {
          method: "PUT",
        },
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update likes in the database");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error("Failed to update likes in the database");
      }

      const updatedPost = data.data;
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
      );
    } catch (error) {
      console.error("Error liking post:", error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <Box p={5}>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              toggleLike={toggleLike}
              handleOpenComments={handleOpenComments}
            />
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
