"use client";
import {
  Box,
  Flex,
  Button,
  Icon,
  VStack,
  Text,
  Spinner,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { FiVolume2, FiVolumeX, FiUser, FiLogOut } from "react-icons/fi";
import initial_images from "./fake-video-cards";

const VideoCard = ({ src, isMuted, onToggleMute, registerRef }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Register the video ref with parent
  useEffect(() => {
    if (registerRef && videoRef.current) {
      registerRef(videoRef.current);
    }
  }, [registerRef]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // force preload
    }
  }, []);

  const handleOnWaiting = () => {
    if (videoRef.current?.readyState < 3) {
      setIsLoading(true);
      // videoRef.current.load();
    }
  };

  // console.log(videoRef.current?.readsyState);
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
        // height="100%"
      >
        <AspectRatio ratio={9 / 16} width="100%">
          <>
            {isLoading && (
              <Skeleton height="100%" width="100%" /> // ⬅️ placeholder
            )}
            <video
              ref={videoRef}
              style={{ objectFit: "cover", display: "block" }}
              src={src}
              height="100%"
              width="100%"
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              onError={(e) => console.error("Video failed to load", e)}
              // onWaiting={handleOnWaiting}
              onPlaying={() => setIsLoading(false)} // ← More reliable than onLoadedData
            />
          </>
        </AspectRatio>
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

const LoadingCard = ({ registerRef }) => (
  <Flex
    ref={registerRef}
    justifyContent="center"
    alignItems="center"
    // height="100dvh"
    scrollSnapAlign="start"
    scrollSnapStop="always"
    padding="20px"
  >
    <Spinner size="lg" />
    <Text ml={2} color="gray.500">
      Loading more...
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
  const loadingRef = useRef(null);
  const [videos, setVideos] = useState(initial_images.slice(0, 5));
  const lastVideoBeforeLoading = useRef(null);

  const paginationIndex = useRef(0);

  const toggleMute = () => setIsMuted((prev) => !prev);

  // Set up IntersectionObserver to detect visible video
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === loadingRef.current && entry.isIntersecting) {
          console.log("Reached loading card");

          if (lastVideoBeforeLoading.current) {
            console.log("Should scroll back");
            setTimeout(() => {
              lastVideoBeforeLoading.current.scrollIntoView({
                behavior: "smooth",
              });
            }, 250);
          }

          paginationIndex.current += 1;
          const startIndex = paginationIndex.current * 10;
          const endIndex = startIndex + 10;

          const newVideos = initial_images.slice(startIndex, endIndex);
          setTimeout(() => {
            setVideos((prev) => [...prev, ...newVideos]);
          }, 3000);
          return;
        }

        const index = videoRefs.current.indexOf(entry.target);
        if (entry.isIntersecting) {
          setActiveIndex(index);
          lastVideoBeforeLoading.current = entry.target;
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.7, // 70% visible,
    });

    if (loadingRef.current) observer.current.observe(loadingRef.current);

    return () => {
      observer.current?.disconnect();
      clearTimeout(observerTimeout);
    };
  }, []);

  // console.log("VIDEOS LENGTH IS ", videos.length);

  // Manage video playback
  useEffect(() => {
    // the number of lengths if correct
    // console.log(console.log("video refs length is ", videoRefs.current.length));
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      observer.current.observe(video);

      // console.log("Index is ", index);
      // console.log("Active index is ", activeIndex);

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
  }, [activeIndex, isMuted, videos]);

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
      {videos
        .filter((item) => item.card_type === "video")
        .map((video, index) => (
          <VideoCard
            key={video.uuid}
            src={video.src}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            registerRef={(el) => (videoRefs.current[index] = el)}
          />
        ))}

      <LoadingCard registerRef={(el) => (loadingRef.current = el)} />
    </Box>
  );
};

export default Home;
