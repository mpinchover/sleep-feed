"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";

import VideoFeed from "@/components/feed/videofeed";
import LoginPopup from "@/components/feed/login-popup";

const VIDEOS_ENDPOINT =
  "https://lunar-server-286518526012.us-central1.run.app/videos";

const EtcPage = () => {
  const [videos, setVideos] = useState([]);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);

  const paginationIndex = useRef(0);
  /** Highest Firestore `index` from the last loaded batch; sent as `last_index` for the next request. */
  const lastServerIndexRef = useRef(null);

  const auth = getAuth();
  const user = auth.currentUser;

  const getVideoFeedBatch = async ({ initial = false } = {}) => {
    const url = new URL(VIDEOS_ENDPOINT);
    if (initial) {
      url.searchParams.set("initial", "true");
    } else if (lastServerIndexRef.current != null) {
      url.searchParams.set("last_index", String(lastServerIndexRef.current));
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Videos request failed: ${res.status}`);
    }

    const data = await res.json();
    const raw = Array.isArray(data.videos) ? data.videos : [];

    const batch = raw.map((v) => ({
      src: v.media_url,
      uuid: v.id,
      card_type: "video",
    }));

    const indices = raw
      .map((v) => v.index)
      .filter((n) => typeof n === "number" && Number.isFinite(n));
    if (indices.length > 0) {
      lastServerIndexRef.current = Math.max(...indices);
    }

    return batch;
  };

  const getInitialBatchOfVideos = async () => {
    lastServerIndexRef.current = null;
    try {
      const batch = await getVideoFeedBatch({ initial: true });
      setVideos(batch);
    } catch (e) {
      console.error(e);
      setVideos([]);
    }
    paginationIndex.current = 1;
  };

  useEffect(() => {
    getInitialBatchOfVideos();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setShouldShowLogin(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
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

export default EtcPage;

