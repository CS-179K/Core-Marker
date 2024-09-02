import { useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import posts from "../data/posts";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";

export default function Home() {
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle opening the comments drawer
  const openComments = (index) => {
    setSelectedPost(posts[index]);
    onOpen();
  };

  return (
    <div>
      <div className="p-8">
        <h2 className="mb-4 text-2xl font-bold">My Posts</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((card, index) => (
            <div key={index} className="block">
              <Link
                to={`/post/${index}`} // Link to a dynamic route based on the index
                className="block" // Make sure the entire card is clickable
              >
                <Post
                  title={card.title}
                  content={card.content}
                  image={card.image}
                />
              </Link>
              <Button colorScheme="black" onClick={() => openComments(index)}>
                Comments
              </Button>
            </div>
          ))}
        </div>
      </div>
      {selectedPost && (
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Comments for {selectedPost.title}</DrawerHeader>
            <DrawerBody>
              {/* Placeholder for comment display and input */}
              <Input placeholder="Type here..." />
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save Comment</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
