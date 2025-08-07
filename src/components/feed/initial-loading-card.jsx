"use client";
import { Flex, Box, AspectRatio, Skeleton } from "@chakra-ui/react";
// import { useEffect, useState, useRef } from "react";

const InitialLoadingCard = () => {
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
        // onClick={(e) => handleToggleUserIcons(e, iconContainerRef)}
      >
        <AspectRatio
          height={{ base: "100%", sm: "auto" }}
          // border="solid 1px red"
          ratio={9 / 16}
          width="100%"
        >
          <Skeleton
            css={{
              "--start-color": "colors.pink.500",
              "--end-color": "colors.orange.500",
            }}
            height="100%"
            width="100%"
          />
        </AspectRatio>
      </Box>
    </Flex>
  );
};

export default InitialLoadingCard;
