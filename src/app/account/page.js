"use client";
import {
  Box,
  VStack,
  Flex,
  Heading,
  Tabs,
  SimpleGrid,
  Button,
  Icon,
  HStack,
  Skeleton,
  AspectRatio,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiCloseLargeLine } from "react-icons/ri";
import saved_videos from "../fake-video-cards";
import { useEffect, useRef, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

const savedVideos = saved_videos.slice(10, 20);
import VideoFeed from "@/components/feed/videofeed";

const AccountSettings = () => {
  return (
    <VStack>
      <Button
        _hover={{ bgColor: "red.800" }}
        bgColor="red.900"
        variant="subtle"
        width="100%"
      >
        Logout
      </Button>
    </VStack>
  );
};

const VideoCardPreview = ({ src, handleDeleteBookmark, videoRef }) => {
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [isReady, setIsReady] = useState(false);

  return (
    <Box
      width="100%"
      aspectRatio={9 / 16}
      border="solid 1px"
      borderColor="gray.900"
      position="relative"
      overflow="hidden"
    >
      {/* Skeleton always renders behind the video */}
      <Skeleton
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        borderRadius="none"
        startColor="pink.500"
        endColor="orange.500"
        zIndex={0}
      />

      {/* Video sits on top */}
      <video
        ref={videoRef}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,

          transition: "opacity 0.4s ease-in-out",
        }}
        muted
        loop
        playsInline
        src={src}
        onLoadedData={() => {
          setIsReady(true);
        }}
      />

      {/* Icon overlay */}
      <Icon
        as={isBookmarked ? RiHeartFill : RiHeartLine}
        animation="fade-in 0.5s"
        position="absolute"
        top="10px"
        right="10px"
        zIndex="2"
        boxSize={5}
        color="white"
        cursor="pointer"
        onClick={() => setIsBookmarked((prev) => !prev)}
      />
    </Box>
  );
};

const BookmarkedVideos = ({ handleDeleteBookmark }) => {
  const videoRefs = useRef([]);
  const observer = useRef(null);
  const [videos, setVideos] = useState(savedVideos);

  // set up intersection for videos
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach(async (entry) => {
        const index = videoRefs.current.indexOf(entry.target);

        const video = entry.target;
        if (entry.isIntersecting) {
          console.log("PLAYING VIDEO");
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((e) => {
              console.warn("Play interrupted:", e.message);
            });
          }
        } else {
          video.pause();
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.7, // 70% visible,
    });

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      observer.current.observe(video);
    });
  }, [videos]);

  return (
    <Box width="100%" scrollbarWidth="none" height="100%" overflowY="auto">
      <SimpleGrid width="100%" columns={2} spacing={2}>
        {videos.map(({ src }, i) => (
          <VideoCardPreview
            videoRef={(el) => (videoRefs.current[i] = el)}
            handleDeleteBookmark={handleDeleteBookmark}
            src={src}
            key={i}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const Account = () => {
  const router = useRouter();
  const handleDeleteBookmark = () => {
    console.log("Delete bookmark");
  };

  return (
    <Flex justifyContent="center" backgroundColor="black" height="100dvh">
      <VStack width={{ base: "100%", sm: "350px" }} height="100%" spacing={0}>
        <Heading position="relative" py="20px" width="100%" textAlign="center">
          Account
          <Button
            // border="solid 1px red"
            padding="0px"
            p="0px"
            minWidth={"0px"}
            minHeight="0px"
            gap={0}
            onClick={() => router.push("/")}
            position="absolute"
            left={{ base: "10px", sm: "0px" }}
            top="50%"
            transform="translate(0,-50%)"
            variant="ghost"
            m={0}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
          >
            <Icon
              as={RiArrowLeftLine}
              color="rgba(255, 255, 255, 0.5)"
              fontSize="10px"
            />
          </Button>
        </Heading>

        <Tabs.Root
          variant="subtle"
          fitted={true}
          width="100%"
          defaultValue="members"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1, // make tabs fill remaining height
            minHeight: 0, // important for children flex items to shrink
          }}
        >
          <Tabs.List>
            <Tabs.Trigger value="members">Saved</Tabs.Trigger>
            <Tabs.Trigger value="projects">Settings</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content
            value="members"
            style={{
              flex: 1, // fill remaining height
              minHeight: 0, // allow child to scroll
              display: "flex", // so child can flex
            }}
          >
            <BookmarkedVideos handleDeleteBookmark={handleDeleteBookmark} />
          </Tabs.Content>

          <Tabs.Content value="projects">
            <AccountSettings />
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Flex>
  );
};

export default Account;
