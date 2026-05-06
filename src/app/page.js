"use client";

import {
  Box,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

const SCREENSHOTS = [
  {
    src: "/assets/home_screen_screenshot.png",
    title: "Start a session",
    caption:
      "Pick a calming soundscape and how long you want to unwind—all from one simple home screen.",
  },
  {
    src: "/assets/soundscape_catalog_screenshot.png",
    title: "Soundscape library",
    caption:
      "Explore ambient loops, bells, and binaural tracks—organized so you can find the right vibe quickly.",
  },
  {
    src: "/assets/duration_picker_screenshot.png",
    title: "Session length",
    caption:
      "Dial in hours and minutes with a familiar picker so your session fits your bedtime routine.",
  },
  {
    src: "/assets/bell_selection_screenshot.png",
    title: "Opening & closing bells",
    caption:
      "Configure starting, ending, and interval bells to gently frame your practice without watching the timer.",
  },
];

export default function Home() {
  return (
    <Box
      as="main"
      minH="100vh"
      bg="linear-gradient(165deg, #0c0e12 0%, #12151c 35%, #0a0c0f 100%)"
      color="fg"
    >
      <Box
        borderBottomWidth="1px"
        borderColor="whiteAlpha.100"
        py={{ base: 4, md: 5 }}
        backdropFilter="blur(8px)"
        bg="blackAlpha.300"
      >
        <Container maxW="container.lg">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            letterSpacing="tight"
            textTransform="lowercase"
          >
            callysto
          </Text>
        </Container>
      </Box>

      <Container maxW="container.lg" py={{ base: 12, md: 16 }}>
        <VStack align="stretch" gap={{ base: 10, md: 14 }}>
          <VStack align="stretch" gap={6} textAlign={{ base: "left", md: "center" }}>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              lineHeight="shorter"
              letterSpacing="tight"
              textTransform="lowercase"
            >
              callysto
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="fg.muted"
              maxW="2xl"
              mx={{ base: 0, md: "auto" }}
            >
              Meditation to help calm down before bed.
            </Text>
            <Text
              fontSize="md"
              color="fg.muted"
              maxW="xl"
              mx={{ base: 0, md: "auto" }}
              lineHeight="tall"
            >
              Callysto is a bedtime-focused meditation companion. Wind down with
              thoughtfully chosen soundscapes, flexible session lengths, and
              subtle cues—so you can ease into rest without overstimulation or
              clutter.
            </Text>
          </VStack>

          <Box>
            <VStack align="center" gap={{ base: 10, md: 14 }}>
              {SCREENSHOTS.map(({ src, title, caption }) => (
                <VStack
                  key={src}
                  align="center"
                  gap={{ base: 5, md: 6 }}
                  textAlign="center"
                  w="full"
                  maxW="lg"
                  mx="auto"
                >
                  <VStack align="center" gap={2} maxW="md" px={{ base: 2, md: 0 }}>
                    <Text fontWeight="semibold" fontSize="lg">
                      {title}
                    </Text>
                    <Text fontSize="sm" color="fg.muted" lineHeight="tall">
                      {caption}
                    </Text>
                  </VStack>
                  <Box w={{ base: "100%", md: "280px" }} maxW="280px">
                    <Box
                      rounded="2xl"
                      overflow="hidden"
                      borderWidth="1px"
                      borderColor="whiteAlpha.200"
                      bg="blackAlpha.400"
                      shadow="0 24px 80px rgba(0,0,0,0.45)"
                      mx="auto"
                    >
                      <Box position="relative" aspectRatio="9 / 19.5">
                        <Image
                          src={src}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 280px"
                          style={{ objectFit: "cover" }}
                          priority={src === "/assets/home_screen_screenshot.png"}
                        />
                      </Box>
                    </Box>
                  </Box>
                </VStack>
              ))}
            </VStack>
          </Box>

          <Box
            rounded="xl"
            borderWidth="1px"
            borderColor="whiteAlpha.150"
            bg="whiteAlpha.50"
            px={{ base: 6, md: 10 }}
            py={{ base: 8, md: 10 }}
          >
            <VStack align="stretch" gap={4} textAlign={{ base: "left", md: "center" }}>
              <Heading as="h2" size="md">
                Contact
              </Heading>
              <Text fontSize="sm" color="fg.muted" maxW="lg" mx={{ base: 0, md: "auto" }}>
                For support, partnership, or general questions about Callysto,
                reach us by email. We read every message and aim to reply as
                soon as we can.
              </Text>
              <Box pt={1}>
                <Link
                  href="mailto:hello@callystoapp.com"
                  fontWeight="medium"
                  color="fg"
                  textDecoration="underline"
                  textUnderlineOffset="4px"
                >
                  hello@callystoapp.com
                </Link>
              </Box>
            </VStack>
          </Box>

          <Text fontSize="xs" color="fg.muted" textAlign="center" pt={2}>
            © {new Date().getFullYear()} Callysto. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
