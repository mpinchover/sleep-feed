"use client";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={2}>
        <Heading size="2xl" textTransform="lowercase">
          callysto
        </Heading>
        <Text>Meditation to help calm down before bed.</Text>
        <Text color="fg.muted">Contact</Text>
        <Link href="mailto:hello@callystoapp.com">hello@callystoapp.com</Link>
      </VStack>
    </Box>
  );
}
