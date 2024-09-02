import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

function Register() {
  const history = useNavigate();
  const toast = useToast(); // Initialize the toast hook
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        toast({
          title: "Registration Successful",
          description:
            "You have successfully registered. Redirecting to login.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          history("/login");
        }, 2000); // Redirect after 2 seconds to allow toast to be visible
      } else {
        toast({
          title: "Registration Failed",
          description: "Could not register user. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration Error",
        description: "An error occurred during registration.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function handleRedirectToLogin() {
    try {
      history("/login");
      console.log("Redirecting to login");
    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
    >
      <Box w="400px" p="8" bg="white" boxShadow="md" borderRadius="lg">
        <VStack spacing="6">
          <Heading as="h1" size="lg" mb="6">
            Core Marker
          </Heading>
          <form onSubmit={registerUser}>
            <VStack spacing="4" width="100%">
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  width="100%"
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  width="100%"
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  width="100%"
                />
              </FormControl>

              <Button type="submit" colorScheme="teal" width="100%">
                Register
              </Button>
            </VStack>
          </form>

          <Text mt="4">Already have an account?</Text>
          <Button
            onClick={handleRedirectToLogin}
            colorScheme="blue"
            variant="outline"
            width="100%"
          >
            Sign in
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default Register;
