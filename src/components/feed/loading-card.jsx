"use client";
import { Flex, Spinner, Text } from "@chakra-ui/react";
// import { useEffect, useState, useRef } from "react";

const LoadingCard = ({ registerRef }) => (
  <Flex
    ref={registerRef}
    justifyContent="center"
    alignItems="center"
    scrollSnapAlign="start"
    scrollSnapStop="always"
    paddingY="100px"
    paddingX="20px"
  >
    <Spinner size="lg" />
    <Text ml={2} color="gray.500">
      Loading more...
    </Text>
  </Flex>
);

export default LoadingCard;
