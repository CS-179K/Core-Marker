import PropTypes from "prop-types";
import { Box, Image, Text, Heading, Link } from "@chakra-ui/react";
import { Heart } from "lucide-react";

const PostCard = ({ post, toggleLike, handleOpenComments }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
    >
      <Box height="200px" overflow="hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          height="100%"
          width="100%"
          objectFit="cover"
        />
      </Box>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Heading fontSize="xl" fontWeight="semibold">
            {post.title}
          </Heading>
          <Text>{post.userId.name}</Text>
        </Box>
        <Text mt="2">{post.description}</Text>
        <Text mt="2" fontWeight="bold">
          Location: {post.location}
        </Text>
        <Box
          mt="2"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <Heart
              onClick={() => toggleLike(post)}
              style={{
                cursor: "pointer",
                fill: post.liked ? "red" : "none",
                stroke: post.liked ? "red" : "black"
              }}
            />
            <Text color="gray.500" ml={2}>
              {post.likes} Likes
            </Text>
          </Box>
          <Link
            color="teal.500"
            onClick={() => handleOpenComments(post)}
            cursor="pointer"
            textDecoration="underline"
            mr={1}
          >
            View All Comments
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    userId: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  toggleLike: PropTypes.func.isRequired,
  handleOpenComments: PropTypes.func.isRequired,
};

export default PostCard;
