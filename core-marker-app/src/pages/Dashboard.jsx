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
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/upload");
        const data = await response.json();
        if (data.success) {
          const fetchedPosts = data.data.map((post) => ({
            ...post,
            liked: currentUser ? post.likedBy.includes(currentUser._id) : false,
          }));
          setPosts(fetchedPosts);
          setLikedPosts(
            new Set(
              fetchedPosts.filter((post) => post.liked).map((post) => post._id),
            ),
          );
          console.log("Posts fetched successfully!");
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, [currentUser]);

  const handleOpenComments = async (post) => {
    setSelectedPost(post);
    onOpen();

    try {
      const response = await fetch(
        `http://localhost:5001/api/upload/${post._id}/comments`,
      );
      const data = await response.json();
      if (data.success) {
        setComments(data.data || []); // Handle the case where data.data is null
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
      setComments([]); // In case of error, show no comments
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    if (!currentUser || !currentUser._id) {
      console.error("User is not logged in or user ID is missing");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/upload/${selectedPost._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newComment, user: currentUser._id }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await response.json();
      if (data.success) {
        setComments((prevComments) => [...prevComments, data.data]);
        setNewComment(""); // Clear the input after adding the comment
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const toggleLike = async (post) => {
    const alreadyLiked = likedPosts.has(post._id);

    try {
      const updatedPosts = posts.map((p) => {
        if (p._id === post._id) {
          return {
            ...p,
            liked: !alreadyLiked,
            likes: alreadyLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      });

      setPosts(updatedPosts);

      if (alreadyLiked) {
        setLikedPosts((prevLikedPosts) => {
          const newLikedPosts = new Set(prevLikedPosts);
          newLikedPosts.delete(post._id);
          return newLikedPosts;
        });
      } else {
        setLikedPosts((prevLikedPosts) => {
          const newLikedPosts = new Set(prevLikedPosts);
          newLikedPosts.add(post._id);
          return newLikedPosts;
        });
      }

      const response = await fetch(
        `http://localhost:5001/api/upload/${post._id}/likes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ liked: !alreadyLiked }),
        },
      );

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
              likedPosts={likedPosts}
            />
          ))}
        </Grid>
      </Box>

      {selectedPost && (
        <Drawer
          isOpen={isOpen}
          placement="bottom"
          onClose={() => {
            setSelectedPost(null);
            onClose();
          }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Comments for {selectedPost.title}</DrawerHeader>
            <DrawerBody>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Box key={comment._id} p={2} borderBottom="1px solid #e2e8f0">
                    <strong>{comment.user.name}</strong>
                    <p>{comment.text}</p>
                  </Box>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
              <Input
                placeholder="Type your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                mt={3}
              />
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={() => {
                  setSelectedPost(null);
                  onClose();
                }}
              >
                Close
              </Button>
              <Button colorScheme="blue" onClick={handleAddComment}>
                Post Comment
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Dashboard;
