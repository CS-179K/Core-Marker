import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useColorModeValue,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // State to hold the username
  const [avatar, setAvatar] = useState(""); // State to hold the avatar URL or base64
  const navigate = useNavigate();
  const toast = useToast(); // Initialize the toast hook

  useEffect(() => {
    // Check if the user is logged in by looking for a token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch the user profile data
      fetchUserProfile();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/user/me", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.status === "ok") {
        setUserName(data.user.name); // Assuming the response contains user data
        setAvatar(data.user.avatar || "/22.png"); // Use default image if avatar is missing
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Box fontWeight="bold" fontSize="xl">
              <Link as={RouterLink} to="/Dashboard" px={2} py={1} rounded="md">
                Core Marker
              </Link>
            </Box>
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              <Link
                  as={RouterLink}
                  to="/post"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("teal.300", "gray.700"),
                  }}
              >
                Post
              </Link>
              <Link
                  as={RouterLink}
                  to="/support"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("teal.300", "gray.700"),
                  }}
              >
                Support
              </Link>
              <Link
                  as={RouterLink}
                  to="/profile"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("teal.300", "gray.700"),
                  }}
              >
                {userName || "My Profile"}
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems="center">
            {isLoggedIn ? (
                <>
                  <Avatar
                      size="md"
                      src={avatar}
                      mr={4}
                      fallbackSrc="/22.png" // Ensure fallback image
                  />
                  <Button
                      variant="solid"
                      colorScheme="teal"
                      size="sm"
                      mr={4}
                      onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
            ) : (
                <>
                  <Button
                      variant="solid"
                      colorScheme="teal"
                      size="sm"
                      mr={4}
                      onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </Button>
                </>
            )}
          </Flex>
        </Flex>
      </Box>
  );
}

export default NavBar;
