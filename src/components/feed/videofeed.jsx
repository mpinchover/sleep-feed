"use client";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import LoadingCard from "./loading-card";
import InitialLoadingCard from "./initial-loading-card";
import VideoCard from "./video-card";
import LoginPopup from "./login-popup";

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
