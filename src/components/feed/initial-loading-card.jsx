"use client";
import { Box, Skeleton, Flex } from "@chakra-ui/react";

const FRAME_W = "min(100vw, calc(100dvh * 9 / 16))";
const FRAME_H = "min(100dvh, calc(100vw * 16 / 9))";

const InitialLoadingCard = () => {
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
    >
      <Box
        position="relative"
        w={{ base: "100%", sm: FRAME_W }}
        h={{ base: "100dvh", sm: FRAME_H }}
        maxW="100%"
        maxH="100%"
        flexShrink={0}
      >
        <Skeleton
          position="absolute"
          inset={0}
          css={{
            "--start-color": "colors.pink.500",
            "--end-color": "colors.orange.500",
          }}
        />
      </Box>
    </Flex>
  );
};

export default InitialLoadingCard;
