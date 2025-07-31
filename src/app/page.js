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
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { FaAngleDoubleDown } from "react-icons/fa";
const PRELOAD_RANGE = 3;
const BATCH_SIZE = 10;

const isMobile =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

import initial_videos from "./fake-video-cards";

const _initial_videos = initial_videos; // shuffleArray(initial_videos);

const VideoCard = ({
  src,
  isMuted,
  onToggleMute,
  registerRef,
  shouldShowSwipeDownIcons,
  videoRefs,
  activeIndex,
  handleToggleUserIcons,
  showUserIcons,
  index,
}) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startShowIcons, setStartShowIcons] = useState(false);
  const iconContainerRef = useRef(null);
  // const [showUserIcons, setShowUserIcons] = useState(false);

  const scrollToNext = () => {
    const next = videoRefs?.current?.[activeIndex + 1];
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      // videoRef.current.load(); // force preload
    }
  }, []);

  const shouldPreload = () => {
    return Math.abs(index - activeIndex) < PRELOAD_RANGE ? "auto" : "none";
  };

  // if (activeIndex === index) console.log("Loading video ", src);

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
        borderRadius={{ base: "none", sm: "10px" }}
        // width="350px"
        width={{ base: "100%", sm: "350px" }}
        overflow="hidden"
        position="relative"
        // border="solid 1px purple"
        height={{ base: "100%", sm: "auto" }}
        onClick={(e) => handleToggleUserIcons(e, iconContainerRef)}
      >
        <AspectRatio
          height={{ base: "100%", sm: "auto" }}
          // border="solid 1px red"
          ratio={9 / 16}
          width="100%"
        >
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
              preload={shouldPreload()}
              onError={(e) => console.error("Video failed to load", e)}
              onPlaying={() => setIsLoading(false)} // ← More reliable than onLoadedData
            />
          </>
        </AspectRatio>
        {shouldShowSwipeDownIcons && startShowIcons && (
          <Box
            cursor={"pointer"}
            onClick={scrollToNext}
            position="absolute"
            bottom="30px"
            left="50%"
            // right="30px"
            transform="translate(-50%, -0%)"
            bg="rgba(0, 0, 0, 0.3)"
            padding="8px"
            borderRadius="full"
            zIndex="20"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Icon
              animation="fade-in 1s infinite"
              as={RiArrowUpDoubleLine}
              boxSize={12}
              color="rgba(255, 255, 255, 0.7)"
              mb={1}
            />
            <Icon
              animation="fade-out 1s infinite"
              as={RiArrowUpDoubleLine}
              boxSize={12}
              color="rgba(255, 255, 255, 0.3)"
            />
          </Box>
        )}
        {showUserIcons && (
          <VStack
            ref={iconContainerRef}
            position="absolute"
            bottom="30px"
            right="20px"
            padding="6px"
            borderRadius="full"
            bg="rgba(0, 0, 0, 0.3)"
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
                color="rgba(255, 255, 255, 0.5)"
                fontSize="10px"
              />
            </Button>

            <Button
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              variant="ghost"
            >
              <Icon as={FiUser} boxSize={5} color="rgba(255, 255, 255, 0.5)" />
            </Button>
          </VStack>
        )}
      </Box>
    </Flex>
  );
};

const InitialLoadingCard = () => {
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
        borderRadius={{ base: "none", sm: "10px" }}
        // width="350px"
        width={{ base: "100%", sm: "350px" }}
        overflow="hidden"
        position="relative"
        // border="solid 1px purple"
        height={{ base: "100%", sm: "auto" }}
        // onClick={(e) => handleToggleUserIcons(e, iconContainerRef)}
      >
        <AspectRatio
          height={{ base: "100%", sm: "auto" }}
          // border="solid 1px red"
          ratio={9 / 16}
          width="100%"
        >
          <Skeleton
            css={{
              "--start-color": "colors.pink.500",
              "--end-color": "colors.orange.500",
            }}
            height="100%"
            width="100%"
          />
        </AspectRatio>
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

const VideoFeed = ({
  toggleMute,
  isMuted,
  videos,
  handleToggleUserIcons,
  showUserIcons,
  videoRefs,
  activeIndex,
  loadingRef,
}) => {
  if (videos.length === 0) {
    return <InitialLoadingCard />;
  }

  return (
    <>
      {videos.map((video, index) => {
        return (
          <VideoCard
            index={index}
            activeIndex={activeIndex}
            handleToggleUserIcons={handleToggleUserIcons}
            showUserIcons={showUserIcons}
            videoRefs={videoRefs}
            shouldShowSwipeDownIcons={index === 0}
            key={video.uuid}
            src={video.src}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            registerRef={(el) => (videoRefs.current[index] = el)}
          />
        );
      })}
      <LoadingCard registerRef={(el) => (loadingRef.current = el)} />
    </>
  );
};

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);
  const observer = useRef(null);
  const loadingRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const lastVideoBeforeLoading = useRef(null);
  const isFetchingNextBatchOfVideos = useRef(false);
  const [showUserIcons, setShowUserIcons] = useState(true);

  const paginationIndex = useRef(0);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleToggleUserIcons = (e, iconContainerRef) => {
    if (iconContainerRef.current?.contains(e.target)) {
      return;
    }

    setShowUserIcons((prev) => !prev);
  };

  const getVideoFeedBatch = (page) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = page * BATCH_SIZE;
        const end = Math.min(initial_videos.length, start + BATCH_SIZE);
        const batchOfVideos = initial_videos.slice(start, end);

        if (isMobile) {
          setIsMuted(true);
        }

        setVideos((prev) => [...prev, ...batchOfVideos]);
        resolve();
      }, 1500);
    });
  };

  // const getVideoFeedBatch = async (page) => {
  //   setTimeout(() => {
  //     const start = page * 5;

  //     const end = Math.min(initial_videos.length, start + 5);
  //     const batchOfVideos = initial_videos.slice(start, end);

  //     if (isMobile) {
  //       setIsMuted(true);
  //     }

  //     setVideos((prev) => [...prev, ...batchOfVideos]);
  //   }, 3000);
  // };

  useEffect(() => {
    getVideoFeedBatch(0);
    paginationIndex.current = 1;
  }, []);

  console.log("Updating videos", videos.length);

  // Set up IntersectionObserver to detect visible video
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.target === loadingRef.current && entry.isIntersecting) {
          if (lastVideoBeforeLoading.current) {
            // console.log("Should scroll back");
            setTimeout(() => {
              // console.log("SCROLLING BACK");
              lastVideoBeforeLoading.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 50);
          }

          if (isFetchingNextBatchOfVideos.current) {
            return;
          }

          isFetchingNextBatchOfVideos.current = true;

          // paginationIndex.current += 1;
          // const startIndex = paginationIndex.current * 10;
          // const endIndex = startIndex + 10;

          await getVideoFeedBatch(paginationIndex.current);
          paginationIndex.current += 1;
          isFetchingNextBatchOfVideos.current = false;

          // const newVideos = _initial_videos.slice(startIndex, endIndex);

          // setTimeout(() => {
          //   // do this only on mobile
          //   if (isMobile) {
          //     setIsMuted(true);
          //   }

          //   const indexToScrollTo = videos.length;
          //   setVideos((prev) => [...prev, ...newVideos]);
          //   isFetchingNextBatchOfVideos.current = false;
          // }, 1500);

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

    return () => {
      observer.current?.disconnect();
      // clearTimeout(observerTimeout);
    };
  }, []);

  useEffect(() => {
    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
      // console.log("Observing loadingref");
    }
  }, [videos]);

  // Manage video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      observer.current.observe(video);

      // sliding window loading video
      if (
        video.readyState < 2 &&
        Math.abs(index - activeIndex) < PRELOAD_RANGE
      ) {
        video.load();
      }

      // preload(video.src, { as: "video", fetchPriority: "high" });
      // console.log(video.src);

      if (index === activeIndex) {
        video.muted = isMuted;

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.warn("Play interrupted:", e.message);
          });
        }
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
      <VideoFeed
        loadingRef={loadingRef}
        toggleMute={toggleMute}
        isMuted={isMuted}
        videos={videos}
        activeIndex={activeIndex}
        handleToggleUserIcons={handleToggleUserIcons}
        showUserIcons={showUserIcons}
        videoRefs={videoRefs}
      />
    </Box>
  );
};

export default Home;
