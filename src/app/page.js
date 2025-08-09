"use client";
import { Box } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import VideoFeed from "../components/feed/videofeed";
import LoginPopup from "@/components/feed/login-popup";
const BATCH_SIZE = 10;

import initial_videos from "./fake-video-cards";

const Home = () => {
  const [videos, setVideos] = useState([]);
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

        resolve(batchOfVideos);
      }, 1500);
    });
  };

  const getInitialBatchOfVideos = async () => {
    const batch = await getVideoFeedBatch(0);
    setVideos(batch);
    paginationIndex.current = 1;
  };

  useEffect(() => {
    getInitialBatchOfVideos();
  }, []);

  return (
    <Box position="relative">
      {shouldShowLogin && <LoginPopup />}
      <VideoFeed
        shouldShowLogin={shouldShowLogin}
        setShouldShowLogin={setShouldShowLogin}
        user={user}
        getVideoFeedBatch={getVideoFeedBatch}
        videos={videos}
        setVideos={setVideos}
        paginationIndex={paginationIndex}
      />
    </Box>
  );
};

export default Home;
