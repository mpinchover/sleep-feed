"use client";
import {
  Icon,
  Skeleton,
  AspectRatio,
  Flex,
  Box,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FiVolume2, FiVolumeX, FiUser, FiLogOut } from "react-icons/fi";
import { RiFilter3Line, RiColorFilterFill } from "react-icons/ri";
import { RiShare2Fill } from "react-icons/ri";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { useEffect, useState, useRef } from "react";

import { Toaster, toaster } from "@/components/ui/toaster";
const PRELOAD_RANGE = 3;

const VideoCard = ({
  src,
  isMuted,
  onToggleMute,
  registerRef,
  shouldShowSwipeDownIcons,
  videoRefs,
  activeIndex,
  handleToggleUserIcons,
  showUserIcons,
  index,
  handleSetSelectedFilter,
  selectedFilter,
  isBookmarked,
  videoUUID,
  shouldShowLogin,
  setShouldShowLogin,
}) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startShowIcons, setStartShowIcons] = useState(false);
  const iconContainerRef = useRef(null);
  const filterContainerRef = useRef(null);
  const [shouldShowOptions, setShouldShowOptions] = useState(false);

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

  useEffect(() => {
    if (videoRef.current) {
    }
  }, []);

  const shouldPreload = () => {
    return Math.abs(index - activeIndex) < PRELOAD_RANGE ? "auto" : "none";
  };

  const handleBookmark = () => {
    toaster.create({
      title: "Saved",
      // description: "Toast Description",
      duration: 1000,
      type: "info",
    });
  };

  const handleShare = () => {
    const linkToVideo = `localhost/feed/${videoUUID}`;

    // Copy to clipboard
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
  };
  // if (activeIndex === index) console.log("Loading video ", src);

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
        onClick={(e) =>
          handleToggleUserIcons(e, iconContainerRef, filterContainerRef)
        }
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
        {showUserIcons && (
          <VStack
            ref={iconContainerRef}
            position="absolute"
            bottom="30px"
            right="20px"
            padding="6px"
            borderRadius="full"
            bg="rgba(0, 0, 0, 0.3)"
            zIndex="10"
            gap={0}
          >
            <Button
              onClick={onToggleMute}
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
              justifyContent={"center"}
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
                    onClick={() => setShouldShowLogin((prev) => !prev)}
                  >
                    <Icon
                      as={FiUser}
                      boxSize={5}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </Button>

                  <Button
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    variant="ghost"
                    onClick={() => handleSetSelectedFilter("saturate(50%)")}
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
                    onClick={handleShare}
                  >
                    <Icon as={RiShare2Fill} color="rgba(255, 255, 255, 0.5)" />
                  </Button>
                  {/** only if they are logged in  */}
                  {/* <Button
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    variant="ghost"
                    onClick={() => handleBookmark()}
                  >
                    <Icon
                      as={RiBookmarkFill}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </Button> */}
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
    </Flex>
  );
};

export default VideoCard;
