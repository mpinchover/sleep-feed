"use client";
import { Skeleton, Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
/** Portrait 9:16 — frame fits in viewport without cropping video top/bottom; prefer full dvh height when vw allows. */
const FRAME_W = "min(100vw, calc(100dvh * 9 / 16))";
const FRAME_H = "min(100dvh, calc(100vw * 16 / 9))";

const VideoCard = ({
  src,
  isMuted,
  preload = "none",
  registerRef,
  handleToggleUserIcons,
  selectedFilter,
  shouldShowLogin,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (registerRef && videoRef.current) {
      registerRef(videoRef.current);
    }
  }, [registerRef]);

  const videoFilters = [selectedFilter];
  if (shouldShowLogin) {
    videoFilters.push("brightness(30%)");
  }

  const formattedVideoFilters = videoFilters.join(" ");

  return (
    <Flex
      height="100dvh"
      width="100%"
      maxW="100vw"
      alignItems={{ base: "stretch", sm: "center" }}
      justifyContent={{ base: "flex-start", sm: "center" }}
      overflow="hidden"
      position="relative"
      scrollSnapAlign="start"
      scrollSnapStop="always"
      onClick={() => handleToggleUserIcons()}
    >
      <Box
        position="relative"
        w={{ base: "100%", sm: FRAME_W }}
        h={{ base: "100dvh", sm: FRAME_H }}
        maxW="100%"
        maxH="100%"
        overflow="hidden"
        flexShrink={0}
        css={{
          "& > video": {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            zIndex: 1,
          },
          "@media screen and (min-width: 480px)": {
            "& > video": {
              objectFit: "contain",
            },
          },
        }}
      >
        <Skeleton
          position="absolute"
          inset={0}
          css={{
            "--start-color": "colors.pink.500",
            "--end-color": "colors.orange.500",
          }}
          zIndex={0}
        />
        <video
          ref={videoRef}
          src={src}
          muted={isMuted}
          loop
          playsInline
          preload={preload}
          style={{
            filter: formattedVideoFilters,
          }}
          onError={(e) => console.error("Video failed to load", e)}
        />
      </Box>
    </Flex>
  );
};

export default VideoCard;
