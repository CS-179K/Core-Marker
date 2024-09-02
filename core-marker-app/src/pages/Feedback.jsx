import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    email: "",
    subject: "",
    context: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.place ||
      !formData.email ||
      !formData.subject ||
      !formData.context
    ) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    emailjs
      .send(
        "service_s0sdo1k",
        "template_9vaag1n",
        formData,
        "K6r7r15yoNXpVwX5P",
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast({
          title: "Success",
          description: "Feedback sent successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFormData({
          name: "",
          place: "",
          email: "",
          subject: "",
          context: "",
        });
      })
      .catch((err) => {
        console.error("FAILED...", err);
        toast({
          title: "Error",
          description: "There was an error sending your feedback.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        minHeight="100vh"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box
          as="form"
          onSubmit={handleSubmit}
          width="full"
          maxWidth="600px"
          borderRadius="lg"
          backgroundColor="white"
          boxShadow="lg"
          p={6}
        >
          <VStack spacing={6} align="stretch">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="place" isRequired>
              <FormLabel>Place</FormLabel>
              <Input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="subject" isRequired>
              <FormLabel>Subject (50 words max)</FormLabel>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                maxLength="50"
              />
            </FormControl>

            <FormControl id="context" isRequired>
              <FormLabel>Context</FormLabel>
              <Textarea
                name="context"
                value={formData.context}
                onChange={handleChange}
                rows="8"
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Submit Feedback
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default FeedbackForm;
