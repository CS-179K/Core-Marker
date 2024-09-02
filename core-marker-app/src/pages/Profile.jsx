import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  Container,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
  });
  const [editingPostId, setEditingPostId] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");

  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const toast = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/user/me", {
          headers: {
            "x-access-token": token,
          },
        });

        if (!response.ok) {
          throw new Error(`User API call failed with status ${response.status}`);
        }

        const userResponse = await response.json();
        setUser(userResponse.user);
        setAvatar(userResponse.user.avatar || "default-avatar-url"); // Ensure default value
        setBanner(userResponse.user.banner || "default-banner-url"); // Ensure default value

        const userId = userResponse.user._id;

        const postsResponse = await fetch(`http://localhost:5001/api/user/${userId}`, {
          headers: {
            "x-access-token": token,
          },
        });

        if (!postsResponse.ok) {
          throw new Error(`Posts API call failed with status ${postsResponse.status}`);
        }

        const postsData = await postsResponse.json();

        if (postsData.success) {
          setPosts(postsData.data);
        } else {
          setError("Failed to fetch posts.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`An error occurred while fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [token]);

  const handleFileUpload = async (e) => {
    const { id } = e.target;
    const type = id.includes("avatar") ? "avatar" : "banner";
    const file = e.target.files[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large.",
          description: "Please select a file smaller than 10 MB.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        const base64 = await convertToBase64(compressedFile);

        if (type === "avatar") {
          setAvatar(base64);
        } else if (type === "banner") {
          setBanner(base64);
        }

        await updateImageInDB(base64, type);
      } catch (error) {
        console.error("Error during image compression:", error);
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const updateImageInDB = async (base64, type) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/update/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ [type]: base64 }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} updated.`,
          description: `Your ${type} has been successfully updated.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error.",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      toast({
        title: "Error.",
        description: "An error occurred while updating the image.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleEditClick = (post) => {
    setForm({
      title: post.title,
      description: post.description,
      location: post.location,
      imageUrl: post.imageUrl,
    });
    setEditingPostId(post._id);
    openModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/upload/${editingPostId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Post updated.",
          description: "Your post has been successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === editingPostId ? { ...post, ...form } : post
            )
        );
        closeModal();
      } else {
        toast({
          title: "Error.",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      toast({
        title: "Error.",
        description: "An error occurred while updating the post.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/upload/${postId}`, {
        method: "DELETE",
        headers: {
          "x-access-token": token,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Post deleted.",
          description: "Your post has been successfully deleted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        toast({
          title: "Error.",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast({
        title: "Error.",
        description: "An error occurred while deleting the post.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
      <>
        <NavBar />
        <Box h="300px">
          <Input
              id="banner"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              display="none"
          />
          <Image pb={10} src={banner} alt="Banner" boxSize="100%" objectFit="cover" cursor="pointer"  onClick={() => document.getElementById("banner").click()} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">

          <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              display="none"
          />

          <Image
              src={avatar}
              alt="Avatar"
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
              cursor="pointer"
              onClick={() => document.getElementById("avatar").click()}
          />
          <Heading as="h1" size="xl" mt={4}>
            {user.name}
          </Heading>
          <Text fontSize="lg">{user.email}</Text>
        </Box>
        <Container maxW="container.lg" py={300}>
          {loading ? (
              <Spinner size="xl" mt={4} />
          ) : error ? (
              <Text color="red.500" mt={4}>
                {error}
              </Text>
          ) : (
              <VStack spacing={4} mt={8}>
                {posts.map((post) => (
                    <Box
                        key={post._id}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="sm"
                        width="100%"
                    >
                      <Image src={post.imageUrl} alt={post.title} boxSize="100%" objectFit="cover" borderRadius="md" />
                      <Heading as="h2" size="md" mt={2}>
                        {post.title}
                      </Heading>
                      <Text mt={2}>{post.description}</Text>
                      <Flex mt={4} justify="flex-end" gap={2}>
                        <Button colorScheme="teal" onClick={() => handleEditClick(post)}>Edit</Button>
                        <Button colorScheme="red" onClick={() => handleDelete(post._id)}>Delete</Button>
                      </Flex>
                    </Box>
                ))}
              </VStack>
          )}
        </Container>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="title" mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />
              </FormControl>
              <FormControl id="description" mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
              </FormControl>
              <FormControl id="location" mb={4}>
                <FormLabel>Location</FormLabel>
                <Input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                />
              </FormControl>

            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  );
};

export default Profile;