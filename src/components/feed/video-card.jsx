"use client";
import {
  Icon,
  Skeleton,
  AspectRatio,
  Flex,
  Box,
} from "@chakra-ui/react";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { useEffect, useState, useRef } from "react";
const PRELOAD_RANGE = 3;

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
        onClick={() => handleToggleUserIcons()}
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
      </Box>
    </Flex>
  );
};

export default VideoCard;
