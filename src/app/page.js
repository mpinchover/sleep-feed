"use client";
import { Box, Flex, Button, Icon } from "@chakra-ui/react";
import initial_images from "./fake-video-cards";
import { useRef, useEffect, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

const VideoCard = ({ src, isMuted, onToggleMute }) => {
  const videoRef = useRef(null);

  // Keep the video element in sync with isMuted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

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
        position="relative"
      >
        <video
          style={{ objectFit: "cover", display: "block" }}
          src={src}
          height="100%"
          width="100%"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onError={(e) => console.error("Video failed to load", e)}
        />

        <Box
          position="absolute"
          bottom="20px"
          right="20px"
          padding="1px"
          borderRadius="md"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="10"
        >
          <Button
            onClick={onToggleMute}
            variant="ghost"
            p={0}
            m="0"
            pt={0}
            py={0}
            padding={0}
            paddingTop={0}
            paddingY={0}
            // minW="auto"
            // bg="transparent"
            // lineHeight={1}
            paddingInline={0}
            gap={0}
            // _hover={{ bg: "transparent" }}
            // _active={{ bg: "transparent" }}
          >
            <Icon
              as={isMuted ? FiVolumeX : FiVolume2}
              color="white"
              // boxSize={6}
              fontSize="10px"
            />
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

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
        <VideoCard
          key={index}
          src={video.src}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />
      ))}
    </Box>
  );
};

export default Home;
