"use client";
import { Icon, Skeleton, Box, Flex } from "@chakra-ui/react";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { useEffect, useState, useRef } from "react";
const PRELOAD_RANGE = 3;
/** Portrait 9:16 — frame fits in viewport without cropping video top/bottom; prefer full dvh height when vw allows. */
const FRAME_W = "min(100vw, calc(100dvh * 9 / 16))";
const FRAME_H = "min(100dvh, calc(100vw * 16 / 9))";

const VideoCard = ({
  src,
  isMuted,
  registerRef,
  shouldShowSwipeDownIcons,
  videoRefs,
  activeIndex,
  handleToggleUserIcons,
  index,
  selectedFilter,
  shouldShowLogin,
}) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startShowIcons, setStartShowIcons] = useState(false);

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

  const shouldPreload = () => {
    return Math.abs(index - activeIndex) < PRELOAD_RANGE ? "auto" : "none";
  };

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
          preload={shouldPreload()}
          style={{
            filter: formattedVideoFilters,
          }}
          onError={(e) => console.error("Video failed to load", e)}
          onPlaying={() => setIsLoading(false)}
        />

        {shouldShowSwipeDownIcons && startShowIcons && (
          <Box
            cursor="pointer"
            onClick={scrollToNext}
            position="absolute"
            bottom="30px"
            left="50%"
            transform="translate(-50%, -0%)"
            bg="rgba(0, 0, 0, 0.3)"
            padding="8px"
            borderRadius="full"
            zIndex={20}
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
      </Box>
    </Flex>
  );
};

export default VideoCard;
