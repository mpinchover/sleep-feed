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
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      position="relative"
      scrollSnapAlign="start"
      scrollSnapStop="always"
    >
      <Box position="relative" w={FRAME_W} h={FRAME_H} maxW="100%" maxH="100%">
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
