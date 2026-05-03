"use client";
import {
  Box,
  VStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiVolume2, FiVolumeX, FiUser } from "react-icons/fi";
import {
  RiFilter3Line,
  RiColorFilterFill,
  RiShare2Fill,
} from "react-icons/ri";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { useState, useRef, useEffect, useCallback } from "react";
import { toaster } from "@/components/ui/toaster";
import LoadingCard from "./loading-card";
import InitialLoadingCard from "./initial-loading-card";
import VideoCard from "./video-card";

const PRELOAD_RANGE = 3;
const isMobile =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const VideoFeed = ({
  videos,
  setVideos,
  getVideoFeedBatch,
  user,
  shouldShowLogin,
  setShouldShowLogin,
  paginationIndex,
  startBookmarkIndex,
  setStartBookmarkIndex,
}) => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [activeIndex, setActiveIndex] = useState(
    startBookmarkIndex ? startBookmarkIndex : 0
  );
  const [showUserIcons, setShowUserIcons] = useState(true);
  const [shouldShowOptions, setShouldShowOptions] = useState(false);
  const [favoritedByUuid, setFavoritedByUuid] = useState({});
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRefs = useRef([]);
  const loadingRef = useRef(null);
  const lastVideoBeforeLoading = useRef(null);
  const isFetchingNextBatchOfVideos = useRef(false);
  const observer = useRef(null);
  const scrollContainerRef = useRef(null);
  const bookmarkHasJumped = useRef(false);

  const _getVideoFeedBatch = async (page) => {
    const nextBatch = await getVideoFeedBatch(page);

    if (isMobile) {
      setIsMuted(true);
    }

    setVideos((prev) => [...prev, ...nextBatch]);
  };

  const handleSetSelectedFilter = (filter) => {
    if (filter === selectedFilter) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filter);
    }
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleToggleUserIcons = () => {
    setShowUserIcons((prev) => !prev);
    if (setShouldShowLogin) {
      setShouldShowLogin(false);
    }
  };

  const isFavoritedFeed =
    startBookmarkIndex !== null && startBookmarkIndex !== undefined;
  const activeVideo = videos[activeIndex];
  const activeUuid = activeVideo?.uuid;

  const isFavorited =
    activeUuid != null &&
    (favoritedByUuid[activeUuid] !== undefined
      ? favoritedByUuid[activeUuid]
      : isFavoritedFeed);

  const handleShare = useCallback(() => {
    if (!activeUuid) return;
    const baseUrl = window.location.origin;
    const linkToVideo = `${baseUrl}/feed/${activeUuid}`;
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
  }, [activeUuid]);

  const renderUserOrHeartIcons = () => {
    if (!isFavoritedFeed) {
      return <Icon as={FiUser} boxSize={5} color="rgba(255, 255, 255, 0.5)" />;
    }
    if (isFavorited) {
      return <Icon as={RiHeartFill} boxSize={5} color="white" />;
    }
    return <Icon as={RiHeartLine} boxSize={5} color="white" />;
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const activeVideo = videoRefs.current[activeIndex];
        if (activeVideo) {
          const isStuck =
            activeVideo.paused ||
            activeVideo.currentTime === 0 ||
            activeVideo.readyState < 2;

          if (isStuck) {
            console.log("Attempting to recover stuck video...");

            activeVideo.load();

            setTimeout(() => {
              const playPromise = activeVideo.play();
              if (playPromise !== undefined) {
                playPromise.catch((e) => {
                  console.warn(
                    "Failed to resume video after reload:",
                    e.message
                  );
                });
              }
            }, 200);
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeIndex]);

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
              lastCur.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

              setIsScrollLocked(false);
            }, 250);
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
          await _getVideoFeedBatch(paginationIndex.current);
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
    };
  }, [user]);

  useEffect(() => {
    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
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
        video.currentTime = 0;
        video.pause();
      }

      return () => {};
    });
  }, [activeIndex, isMuted, videos]);

  useEffect(() => {
    if (startBookmarkIndex === null) {
      return;
    }

    if (bookmarkHasJumped.current) {
      return;
    }

    if (videos.length === 0) {
      return;
    }

    const el = videoRefs.current[startBookmarkIndex];
    if (!el) return;

    setActiveIndex(startBookmarkIndex);
    el.scrollIntoView({ behavior: "instant", block: "start" });

    const onKey = (e) => {
      if (startBookmarkIndex == null) return;
      if (e.key === "Escape") {
        setStartBookmarkIndex(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [videos, startBookmarkIndex]);

  if (videos.length === 0) {
    return <InitialLoadingCard />;
  }

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
      {videos.map((video, index) => {
        return (
          <VideoCard
            shouldShowLogin={shouldShowLogin}
            index={index}
            activeIndex={activeIndex}
            handleToggleUserIcons={handleToggleUserIcons}
            videoRefs={videoRefs}
            shouldShowSwipeDownIcons={index === 0}
            key={index}
            src={video.src}
            isMuted={isMuted}
            registerRef={(el) => (videoRefs.current[index] = el)}
            selectedFilter={selectedFilter}
          />
        );
      })}
      <LoadingCard registerRef={(el) => (loadingRef.current = el)} />
      {showUserIcons && (
        <VStack
          position="fixed"
          bottom="calc(30px + env(safe-area-inset-bottom, 0px))"
          right="calc(20px + env(safe-area-inset-right, 0px))"
          padding="6px"
          borderRadius="full"
          bg="rgba(0, 0, 0, 0.3)"
          zIndex={25}
          gap={0}
          pointerEvents="auto"
        >
          <Button
            onClick={(e) => {
              e.currentTarget.blur();
              toggleMute();
            }}
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
            justifyContent="center"
            transition="0.3s ease"
            height={shouldShowOptions ? "155px" : "0px"}
            overflow="hidden"
          >
            {shouldShowOptions && (
              <>
                <Button
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  variant="ghost"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    if (!isFavoritedFeed) {
                      setShouldShowLogin((prev) => !prev);
                      return;
                    }
                    if (!activeUuid) return;
                    setFavoritedByUuid((prev) => {
                      const prior = prev[activeUuid];
                      const base = isFavoritedFeed;
                      const nextVal = !(prior !== undefined ? prior : base);
                      return { ...prev, [activeUuid]: nextVal };
                    });
                  }}
                >
                  {renderUserOrHeartIcons()}
                </Button>

                <Button
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  variant="ghost"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    handleSetSelectedFilter("saturate(50%)");
                  }}
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
                  onClick={(e) => {
                    e.currentTarget.blur();
                    handleShare();
                  }}
                >
                  <Icon as={RiShare2Fill} color="rgba(255, 255, 255, 0.5)" />
                </Button>
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
  );
};

export default VideoFeed;
