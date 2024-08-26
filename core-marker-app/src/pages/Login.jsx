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
} from "@chakra-ui/react";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    console.log("Submitting login form with:", { email, password });
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data.user);

    if (data.user) {
      localStorage.setItem("token", data.user);
      console.log("login successful");
      window.location.href = "/dashboard";
    } else {
      console.log("please check your username and password");
    }
  }

  function handleRedirectToRegister() {
    try {
      history("/register");
      console.log("redirecting to register");
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
            Login
          </Heading>
          <form onSubmit={loginUser}>
            <VStack spacing="4">
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>

              <Button type="submit" colorScheme="teal" width="full">
                Login
              </Button>
            </VStack>
          </form>

          <Text mt="4">New user?</Text>
          <Button
            onClick={handleRedirectToRegister}
            colorScheme="blue"
            variant="outline"
            width="full"
          >
            Sign up
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default Login;
