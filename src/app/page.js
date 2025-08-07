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
import VideoFeed from "../components/feed/videofeed";

const PRELOAD_RANGE = 3;
const BATCH_SIZE = 10;

const isMobile =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

import initial_videos from "./fake-video-cards";



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

  // const handleVisibilityChange = () => {
  //   if (document.visibilityState === "visible") {
  //     const activeVideo = videoRefs.current[activeIndex];
  //     if (activeVideo) {
  //       // If the video is paused or has not progressed
  //       const isStuck =
  //         activeVideo.paused ||
  //         activeVideo.currentTime === 0 ||
  //         activeVideo.readyState < 2;

  //       if (isStuck) {
  //         console.log("Attempting to recover stuck video...");

  //         // Reload the video (optional, but helps with bugged states)
  //         activeVideo.load();

  //         // Wait a tick then try to play
  //         setTimeout(() => {
  //           const playPromise = activeVideo.play();
  //           if (playPromise !== undefined) {
  //             playPromise.catch((e) => {
  //               console.warn("Failed to resume video after reload:", e.message);
  //             });
  //           }
  //         }, 200); // slight delay helps after reload
  //       }
  //     }
  //   }
  // };

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

      // document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        // document.removeEventListener(
        //   "visibilitychange",
        //   handleVisibilityChange
        // );
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
