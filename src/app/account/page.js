import { Box, VStack, Flex, Heading, Tabs, SimpleGrid } from "@chakra-ui/react";
import saved_videos from "../fake-video-cards";

const bookmarkedVideos = saved_videos.slice(10, 20);
const VideoCardPreview = ({ src }) => {
  return (
    <Box overflow="hidden" aspectRatio={1} width="100%">
      <video
        style={{
          objectFit: "cover",
          display: "block",
        }}
        autoPlay
        muted
        loop
        playsInline
        height="100%"
        width="100%"
        src={src}
      />
    </Box>
  );
};

const BookmarkedVideos = () => {
  return (
    <Box height="100%" overflowY="auto">
      <SimpleGrid columns={2} spacing={2}>
        {bookmarkedVideos.map(({ src }, i) => (
          <VideoCardPreview src={src} key={i} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const Account = () => {
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
            <BookmarkedVideos />
          </Tabs.Content>

          <Tabs.Content value="projects">Manage your projects</Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Flex>
  );
};

export default Account;
