"use client";
import { Box } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import LoadingCard from "./loading-card";
import InitialLoadingCard from "./initial-loading-card";
import VideoCard from "./video-card";

const PRELOAD_RANGE = 3;

const VideoFeed = ({
  videos,
  isMuted,
  setIsMuted,
  getVideoFeedBatch,
  user,
  shouldShowLogin,
  setShouldShowLogin,
  paginationIndex,
}) => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showUserIcons, setShowUserIcons] = useState(true);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  const videoRefs = useRef([]);
  const loadingRef = useRef(null);
  const lastVideoBeforeLoading = useRef(null);
  const isFetchingNextBatchOfVideos = useRef(false);
  const observer = useRef(null);
  const scrollContainerRef = useRef(null);

  const handleSetSelectedFilter = (filter) => {
    if (filter === selectedFilter) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filter);
    }
  };

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
            setShouldShowLogin={setShouldShowLogin}
            shouldShowLogin={shouldShowLogin}
            index={index}
            activeIndex={activeIndex}
            handleToggleUserIcons={handleToggleUserIcons}
            showUserIcons={showUserIcons}
            videoRefs={videoRefs}
            shouldShowSwipeDownIcons={index === 0}
            key={index}
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

export default VideoFeed;
