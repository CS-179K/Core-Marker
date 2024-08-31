import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import imageCompression from "browser-image-compression";

const token = localStorage.getItem("token");

const Post = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setForm({
        ...form,
        imageUrl: base64, // Update imageUrl with base64 encoded string
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/user/me", {
      headers: {
        "x-access-token": token,
      },
    });
    const userResponse = await response.json();
    const userId = userResponse.user._id;
    console.log("User ID:", userId);

    try {
      const response = await fetch(
          `http://localhost:5001/api/upload/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          },
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Post created.",
          description: "Your post has been successfully created.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setForm({
          title: "",
          description: "",
          location: "",
          imageUrl: "",
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
    } catch {
      toast({
        title: "Error.",
        description: "An error occurred while creating the post.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
      <div>
        <NavBar />
        <Box p={5} maxW="600px" mx="auto">
          <Heading mb={6}>Create a New Post</Heading>
          <Box
              as="form"
              onSubmit={handleSubmit}
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="md"
          >
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter the title"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter the description"
                  maxLength={200}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter the location"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="imageUrl">Upload</FormLabel>
              <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileUpload}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Submit
            </Button>
          </Box>
        </Box>
      </div>
  );
};

export default Post;
