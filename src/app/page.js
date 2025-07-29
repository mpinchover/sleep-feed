"use client";
import { Box, Flex } from "@chakra-ui/react";
import initial_images from "./fake-video-cards";

const VideoCard = ({ src }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      border="solid 1px yellow"
      height="100vh"
      // border="solid 1px green"
      scrollSnapAlign="start"
      scrollSnapStop="always"
      position="relative"
      // sx={{ scrollSnapAlign: "start" }}
    >
      <Box
        borderRadius="10px"
        border="solid 1px blue"
        width="350px"
        overflow="hidden"
      >
        <video
          style={{ objectFit: "cover", display: "block" }}
          src={src}
          height="100%"
          width="100%"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => console.error("Video failed to load", e)}
        />
      </Box>
    </Flex>
  );
};

const Home = () => {
  return (
    <Box
      // direction="column"
      // alignItems="center"
      overflowY="scroll"
      // minHeight="100vh"
      scrollSnapType="y mandatory"
      overscrollBehavior={"contain"}
      // scrollSnapPointsY="repeat(100vh)"
      // scrollSnapMarginY="10"
      height="100vh"
      // sx={{
      //   scrollSnapType: "y mandatory",
      //   scrollBehavior: "smooth",
      // }}
    >
      {initial_images.map((video, index) => (
        <VideoCard key={index} src={video.src} />
      ))}
    </Box>
  );
};

export default Home;
