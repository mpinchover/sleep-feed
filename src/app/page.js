"use client";
import { Box, Flex, Button, Icon, VStack, Text } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { FiVolume2, FiVolumeX, FiUser, FiLogOut } from "react-icons/fi";
import initial_images from "./fake-video-cards";

const VideoCard = ({ src, isMuted, onToggleMute, registerRef }) => {
  const videoRef = useRef(null);

  // Register the video ref with parent
  useEffect(() => {
    if (registerRef && videoRef.current) {
      registerRef(videoRef.current);
    }
  }, [registerRef]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100dvh"
      scrollSnapAlign="start"
      scrollSnapStop="always"
      position="relative"
      // border="1px solid yellow"
    >
      <Box
        borderRadius="10px"
        // border="solid 1px blue"
        width="350px"
        overflow="hidden"
        position="relative"
      >
        <video
          ref={videoRef}
          style={{ objectFit: "cover", display: "block" }}
          src={src}
          height="100%"
          width="100%"
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          onError={(e) => console.error("Video failed to load", e)}
        />

        <Box
          position="absolute"
          bottom="20px"
          right="20px"
          padding="6px"
          borderRadius="full"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="10"
        >
          <Button
            onClick={onToggleMute}
            variant="ghost"
            p={0}
            m={0}
            // minW="auto"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
          >
            <Icon
              as={isMuted ? FiVolumeX : FiVolume2}
              color="white"
              fontSize="10px"
            />
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

const LoadingCard = () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100dvh"
    scrollSnapAlign="start"
    scrollSnapStop="always"
  >
    <Text fontSize="lg" color="gray.500">
      Loading...
    </Text>
  </Flex>
);

const Sidebar = () => {
  return (
    <VStack
      top="20px"
      align="start"
      width="200px"
      zIndex={20}
      // border="1px solid red"
      position="fixed"
      padding="10px"
      spacing={4}
      // backgroundColor={"white"}
    >
      <Button
        variant="ghost"
        leftIcon={<Icon as={FiUser} boxSize={5} color="red" />}
      >
        <Icon as={FiUser} boxSize={5} color="white" />
        <Text display={{ base: "none", md: "inline-block" }}> Account</Text>
      </Button>
      <Button variant="ghost" leftIcon={<Icon as={FiLogOut} boxSize={5} />}>
        <Icon as={FiLogOut} boxSize={5} color="white" />
        <Text display={{ base: "none", md: "inline-block" }}>Log out</Text>
      </Button>
    </VStack>
  );
};

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);
  const observer = useRef(null);

  const toggleMute = () => setIsMuted((prev) => !prev);

  // Set up IntersectionObserver to detect visible video
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const index = videoRefs.current.indexOf(entry.target);
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.7, // 70% visible
    });

    videoRefs.current.forEach((video) => {
      if (video) observer.current.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.current.unobserve(video);
      });
    };
  }, []);

  // Manage video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.muted = isMuted;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) =>
            console.warn("Play interrupted:", e.message)
          );
        }
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted]);

  const loadMoreVideos = () => {
    // imagine this function loads the next batch of videos
  };

  return (
    <Box
      height="100dvh"
      overflowY="scroll"
      scrollSnapType="y mandatory"
      overscrollBehavior="contain"
      sx={{
        scrollBehavior: "smooth",
      }}
      position="relative"
    >
      <Sidebar />
      {initial_images
        .filter((item) => item.card_type === "video")
        .map((video, index) => (
          <VideoCard
            key={index}
            src={video.src}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            registerRef={(el) => (videoRefs.current[index] = el)}
          />
        ))}

      <LoadingCard />
    </Box>
  );
};

export default Home;
