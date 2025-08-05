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
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useRef, useEffect, useState, useMemo } from "react";
import { FiVolume2, FiVolumeX, FiUser, FiLogOut } from "react-icons/fi";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { FaAngleDoubleDown } from "react-icons/fa";
import { RiColorFilterFill } from "react-icons/ri";
import { RiCircleFill } from "react-icons/ri";
import { RiFilter3Line } from "react-icons/ri";
import { RiShare2Fill } from "react-icons/ri";
import { RiBookmarkFill } from "react-icons/ri";
import { Toaster, toaster } from "@/components/ui/toaster";
import { getAuth } from "firebase/auth";
import { Tabs } from "@chakra-ui/react";

const PRELOAD_RANGE = 3;
const BATCH_SIZE = 10;

const isMobile =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

import initial_videos from "./fake-video-cards";

const LoginPopup = () => {
  return (
    <VStack
      position="fixed"
      top="70px"
      left="50%"
      transform="translate(-50%, -0%)"
      defaultValue="members"
      zIndex={10}
      // backgroundColor="rgba(255, 255, 255, 0.5)"
      borderRadius="md"
      color="white"
      width="300px"
      paddingY="20px"
      gap={4}
    >
      <Heading>Log in</Heading>
      <Button
        borderRadius={"full"}
        border="1px solid white"
        variant={"ghost"}
        width="100%"
      >
        Sign in with Google
      </Button>
      <Button
        borderRadius={"full"}
        border="1px solid white"
        variant={"ghost"}
        width="100%"
      >
        Sign in with Apple
      </Button>
    </VStack>
  );
};

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
  handleSetSelectedFilter,
  selectedFilter,
  isBookmarked,
  videoUUID,
  shouldShowLogin,
  setShouldShowLogin,
}) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startShowIcons, setStartShowIcons] = useState(false);
  const iconContainerRef = useRef(null);
  const filterContainerRef = useRef(null);
  const [shouldShowOptions, setShouldShowOptions] = useState(false);

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
    }
  }, []);

  const shouldPreload = () => {
    return Math.abs(index - activeIndex) < PRELOAD_RANGE ? "auto" : "none";
  };

  const handleBookmark = () => {
    toaster.create({
      title: "Saved",
      // description: "Toast Description",
      duration: 1000,
      type: "info",
    });
  };

  const handleShare = () => {
    const linkToVideo = `localhost/feed/${videoUUID}`;

    // Copy to clipboard
    navigator.clipboard
      .writeText(linkToVideo)
      .then(() => {
        toaster.create({
          title: "Copied link",
          duration: 1000,
          type: "info",
        });
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toaster.create({
          title: "Failed to copy link",
          duration: 1000,
          type: "error",
        });
      });
  };
  // if (activeIndex === index) console.log("Loading video ", src);

  const videoFilters = [selectedFilter];
  if (shouldShowLogin) {
    videoFilters.push("brightness(30%)");
  }

  const formattedVideoFilters = videoFilters.join(" ");

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
        onClick={(e) =>
          handleToggleUserIcons(e, iconContainerRef, filterContainerRef)
        }
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
              style={{
                objectFit: "cover",
                display: "block",
                // filter: selectedFilter, //
                filter: formattedVideoFilters,
              }}
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
            gap={0}
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

            <VStack
              // alignItems="center"
              justifyContent={"center"}
              transition="0.3s ease"
              // border="1px solid red"
              // display={shouldShowOptions ? "flex" : "none"}
              height={shouldShowOptions ? "155px" : "0px"}
              overflow="hidden"
            >
              {shouldShowOptions && (
                <>
                  <Button
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    variant="ghost"
                    onClick={() => setShouldShowLogin((prev) => !prev)}
                  >
                    <Icon
                      as={FiUser}
                      boxSize={5}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </Button>

                  <Button
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    variant="ghost"
                    onClick={() => handleSetSelectedFilter("saturate(50%)")}
                  >
                    <Icon
                      as={RiColorFilterFill}
                      color={
                        selectedFilter === "saturate(50%)"
                          ? "white"
                          : "rgba(255, 255, 255, 0.5)"
                      }
                    />
                  </Button>

                  <Button
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    variant="ghost"
                    onClick={handleShare}
                  >
                    <Icon as={RiShare2Fill} color="rgba(255, 255, 255, 0.5)" />
                  </Button>
                  {/** only if they are logged in  */}
                  {/* <Button
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    variant="ghost"
                    onClick={() => handleBookmark()}
                  >
                    <Icon
                      as={RiBookmarkFill}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </Button> */}
                </>
              )}
            </VStack>

            <Button
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              variant="ghost"
              onClick={() => setShouldShowOptions((prev) => !prev)}
            >
              <Icon as={RiFilter3Line} color="rgba(255, 255, 255, 0.5)" />
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
  shouldShowLogin,
  setShouldShowLogin,
}) => {
  const [selectedFilter, setSelectedFilter] = useState();

  const handleSetSelectedFilter = (filter) => {
    if (filter === selectedFilter) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filter);
    }
  };

  if (videos.length === 0) {
    return <InitialLoadingCard />;
  }

  return (
    <Box position="relative">
      {shouldShowLogin && <LoginPopup />}
      {videos.map((video, index) => {
        return (
          <VideoCard
            setShouldShowLogin={setShouldShowLogin}
            shouldShowLogin={shouldShowLogin}
            index={index}
            activeIndex={activeIndex}
            handleToggleUserIcons={handleToggleUserIcons}
            showUserIcons={showUserIcons}
            videoRefs={videoRefs}
            shouldShowSwipeDownIcons={index === 0}
            key={video.uuid}
            videoUUID={video.uuid}
            src={video.src}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            registerRef={(el) => (videoRefs.current[index] = el)}
            handleSetSelectedFilter={handleSetSelectedFilter}
            selectedFilter={selectedFilter}
          />
        );
      })}
      <LoadingCard registerRef={(el) => (loadingRef.current = el)} />
    </Box>
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
  const [shouldShowLogin, setShouldShowLogin] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const paginationIndex = useRef(0);
  const isScrollLockedRef = useRef(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const scrollContainerRef = useRef(null);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleToggleUserIcons = (e, iconContainerRef, filtercontainerRef) => {
    if (
      iconContainerRef.current?.contains(e.target) ||
      filtercontainerRef.current?.contains(e.target)
    ) {
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

  useEffect(() => {
    getVideoFeedBatch(0);
    paginationIndex.current = 1;
  }, []);

  // console.log("Updating videos", videos.length);

  // Set up IntersectionObserver to detect visible video
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.target === loadingRef.current && entry.isIntersecting) {
          if (lastVideoBeforeLoading.current) {
            const curVideosLen = videos.length;
            const lastCur = lastVideoBeforeLoading.current;
            setTimeout(() => {
              // if (curVideosLen === videos.length) {
              lastCur.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

              // ✅ Lock scroll after bouncing back
              // console.log("UNLOCKING");
              // isScrollLockedRef.current = false;
              setIsScrollLocked(false);
            }, 250);
            // console.log("LOCKING");
            // isScrollLockedRef.current = true;
            setIsScrollLocked(true);
          }

          if (isFetchingNextBatchOfVideos.current) {
            return;
          }

          isFetchingNextBatchOfVideos.current = true;

          // enable this for login
          // if (!user) {
          //   setShouldShowLogin(true);
          // } else {
          //   await getVideoFeedBatch(paginationIndex.current);
          //   paginationIndex.current += 1;
          // }
          await getVideoFeedBatch(paginationIndex.current);
          paginationIndex.current += 1;

          isFetchingNextBatchOfVideos.current = false;
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
  }, [user]);

  useEffect(() => {
    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }
  }, [videos]);

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      const activeVideo = videoRefs.current[activeIndex];
      if (activeVideo) {
        // If the video is paused or has not progressed
        const isStuck =
          activeVideo.paused ||
          activeVideo.currentTime === 0 ||
          activeVideo.readyState < 2;

        if (isStuck) {
          console.log("Attempting to recover stuck video...");

          // Reload the video (optional, but helps with bugged states)
          activeVideo.load();

          // Wait a tick then try to play
          setTimeout(() => {
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
              playPromise.catch((e) => {
                console.warn("Failed to resume video after reload:", e.message);
              });
            }
          }, 200); // slight delay helps after reload
        }
      }
    }
  };

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

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    });
  }, [activeIndex, isMuted, videos]);

  // console.log("isScrollLockedRef", isScrollLockedRef.current);
  return (
    <Box
      ref={scrollContainerRef}
      height="100dvh"
      overflowY={isScrollLocked ? "hidden" : "scroll"}
      scrollSnapType="y mandatory"
      overscrollBehavior="contain"
      sx={{
        scrollBehavior: "smooth",
      }}
      position="relative"
    >
      <VideoFeed
        shouldShowLogin={shouldShowLogin}
        setShouldShowLogin={setShouldShowLogin}
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
