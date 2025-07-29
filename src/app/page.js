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
import { useRef, useEffect, useState, useMemo } from "react";
import { FiVolume2, FiVolumeX, FiUser, FiLogOut } from "react-icons/fi";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import { FaAngleDoubleDown } from "react-icons/fa";

import initial_videos from "./fake-video-cards";

const VideoCard = ({
  src,
  isMuted,
  onToggleMute,
  registerRef,
  shouldShowSwipeDownIcons,
}) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startShowIcons, setStartShowIcons] = useState(false);

  // Register the video ref with parent
  useEffect(() => {
    if (registerRef && videoRef.current) {
      registerRef(videoRef.current);
    }

    const setElapsedTime = setTimeout(() => {
      setStartShowIcons(true);
    }, 4000);

    return () => {
      clearTimeout(setElapsedTime);
    };
  }, [registerRef]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // force preload
    }
  }, []);

  console.log("Loading video ", src);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100dvh"
      scrollSnapAlign="start"
      scrollSnapStop="always"
      position="relative"
    >
      <Box
        borderRadius="10px"
        width="350px"
        overflow="hidden"
        position="relative"
      >
        <AspectRatio ratio={9 / 16} width="100%">
          <>
            <Skeleton
              css={{
                "--start-color": "colors.pink.500",
                "--end-color": "colors.orange.500",
              }}
              height="100%"
              width="100%"
            />
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
              onPlaying={() => setIsLoading(false)} // ← More reliable than onLoadedData
            />
          </>
        </AspectRatio>
        {shouldShowSwipeDownIcons && startShowIcons && (
          <Box
            position="absolute"
            top="50%"
            // left="100%"
            right="30px"
            transform="translate(-0%, -50%)"
            bg="rgba(0, 0, 0, 0.5)"
            padding="8px"
            borderRadius="md"
            zIndex="20"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Icon
              animation="bounce 1s infinite"
              as={RiArrowDownDoubleLine}
              boxSize={6}
              color="white"
              mb={1}
            />
            <Icon
              animation="bounce 1s infinite"
              as={RiArrowDownDoubleLine}
              boxSize={6}
              color="white"
            />
          </Box>
        )}
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
    scrollSnapAlign="start"
    scrollSnapStop="always"
    paddingY="100px"
    paddingX="20px"
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
      position="fixed"
      padding="10px"
      spacing={4}
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

  const [videos, setVideos] = useState(initial_videos.slice(0, 5));
  const lastVideoBeforeLoading = useRef(null);
  const isFetchingNextBatchOfVideos = useRef(false);

  const paginationIndex = useRef(0);

  const toggleMute = () => setIsMuted((prev) => !prev);

  // Set up IntersectionObserver to detect visible video
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === loadingRef.current && entry.isIntersecting) {
          if (lastVideoBeforeLoading.current) {
            console.log("Should scroll back");
            setTimeout(() => {
              console.log("SCROLLING BACK");
              lastVideoBeforeLoading.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 150);
          }

          if (isFetchingNextBatchOfVideos.current) {
            return;
          }

          isFetchingNextBatchOfVideos.current = true;

          paginationIndex.current += 1;
          const startIndex = paginationIndex.current * 10;
          const endIndex = startIndex + 10;

          const newVideos = initial_videos.slice(startIndex, endIndex);
          setTimeout(() => {
            // do this only on mobile
            setIsMuted(true);
            setVideos((prev) => [...prev, ...newVideos]);
            isFetchingNextBatchOfVideos.current = false;
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

  // Manage video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      observer.current.observe(video);

      if (index === activeIndex) {
        video.muted = isMuted;

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            // .then(() => {
            //   if (!isMuted) {
            //     video.muted = false;
            //   }
            // })
            .catch((e) => {
              console.warn("Play interrupted:", e.message);
            });
        }

        // video.muted = isMuted;
        // const playPromise = video.play();
        // if (playPromise !== undefined) {
        //   playPromise.catch((e) =>
        //     console.warn("Play interrupted:", e.message)
        //   );
        // }
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted, videos]);

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
            shouldShowSwipeDownIcons={index === 0}
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
