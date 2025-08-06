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
} from "@chakra-ui/react";
import { RiCloseLargeLine } from "react-icons/ri";
import saved_videos from "../fake-video-cards";
import { useState } from "react";

const bookmarkedVideos = saved_videos.slice(10, 20);

const VideoCardPreview = ({ src, handleDeleteBookmark }) => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      width="100%"
      sx={{ aspectRatio: "1 / 1" }} // Chakra's sx for custom aspect ratio
    >
      <video
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          pointerEvents: "none", // never blocks the icon
        }}
        autoPlay
        muted
        loop
        playsInline
        src={src}
      />

      <Icon
        top="10px"
        right="10px"
        position="absolute"
        zIndex="10"
        // cursor="pointer"
        onClick={handleDeleteBookmark}
        // pointerEvents="auto" // explicitly clickable

        // cursor="pointer"
        as={RiCloseLargeLine}
        boxSize={3}
        // onClick={handleDeleteBookmark}

        color="rgba(255, 255, 255, 0.9)"
      />
    </Box>
  );
};

const BookmarkedVideos = ({ handleDeleteBookmark }) => {
  return (
    <Box scrollbarWidth="none" height="100%" overflowY="auto">
      <SimpleGrid columns={2} spacing={2}>
        {bookmarkedVideos.map(({ src }, i) => (
          <VideoCardPreview
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
  const handleDeleteBookmark = () => {
    console.log("Delete bookmark");
  };

  return (
    <Flex justifyContent="center" backgroundColor="black" height="100dvh">
      <VStack width={{ base: "100%", sm: "350px" }} height="100%" spacing={0}>
        <Heading
          py="20px"
          width="100%"
          textAlign={{ base: "center", sm: "start" }}
        >
          Account
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

          <Tabs.Content value="projects">Manage your projects</Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Flex>
  );
};

export default Account;
