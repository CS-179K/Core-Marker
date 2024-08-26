import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // State to hold the username
  const navigate = useNavigate();

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
  };

  return (
<<<<<<< HEAD
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-semibold text-white">
          <Link to="/">Core-Marker</Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/home"
            className="text-white transition duration-300 hover:text-gray-400"
          >
            Home
          </Link>
          <Link
            to="/post"
            className="text-white transition duration-300 hover:text-gray-400"
          >
            Post
          </Link>
          <Link
            to="/profile"
            className="text-white transition duration-300 hover:text-gray-400"
          >
            My Profile
          </Link>
          <Link
            to="/login"
            className="text-white transition duration-300 hover:text-gray-400"
          >
            Login 
          </Link>
          <Link
            to="/signup"
            className="text-white transition duration-300 hover:text-gray-400"
          >
            Signup
          </Link>
          <Link
            to="/Feedback"
            className="text-white hover:text-gray-400 transition duration-300"
          >
             CONTACT US 
          </Link>
        </div>
      </div>
    </nav>
=======
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
                size="sm"
                src={userName ? `/avatars/${userName}.png` : "/22.png"}
                mr={4}
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
>>>>>>> 300c4d8186b908c2f399820e3c67a7967ac4b0b7
  );
}

export default NavBar;
