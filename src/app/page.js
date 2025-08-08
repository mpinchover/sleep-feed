"use client";
import { Box } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import VideoFeed from "../components/feed/videofeed";
import LoginPopup from "@/components/feed/login-popup";
const BATCH_SIZE = 10;

const isMobile =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

import initial_videos from "./fake-video-cards";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);

  const paginationIndex = useRef(0);

  const auth = getAuth();
  const user = auth.currentUser;

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

  return (
    <Box position="relative">
      {shouldShowLogin && <LoginPopup />}
      <VideoFeed
        shouldShowLogin={shouldShowLogin}
        setShouldShowLogin={setShouldShowLogin}
        user={user}
        setIsMuted={setIsMuted}
        isMuted={isMuted}
        getVideoFeedBatch={getVideoFeedBatch}
        videos={videos}
        paginationIndex={paginationIndex}
      />
    </Box>
  );
};

export default Home;
