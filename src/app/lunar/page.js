"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

const SCREENSHOTS = [
  {
    src: "/assets/lunar_1.png",
    title: "Calming videos",
    caption:
      "Every clip is beautifully generated and designed to soothe—not stimulate. Dreamy scenes like this bridge over a misty waterfall, made for winding down.",
  },
  {
    src: "/assets/lunar_2.png",
    title: "Scroll, but sleepier",
    caption:
      "The familiar vertical feed you already know, filled with low-poly landscapes and gentle motion instead of noise, news, and notifications.",
  },
  {
    src: "/assets/lunar_3.png",
    title: "Black & white mode",
    caption:
      "Toggle grayscale to cut visual stimulation when you're ready for sleep. Same calming content, less color to keep your brain awake.",
  },
];

export default function LunarPage() {
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
          <Flex align="center" justify="space-between" gap={4}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              letterSpacing="tight"
              textTransform="lowercase"
            >
              lunar
            </Text>
            <Link
              href="https://apps.apple.com/us/app/callysto-lunar/id6772614608"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="sm"
              fontWeight="medium"
              color="fg"
              px={4}
              py={2}
              rounded="full"
              borderWidth="1px"
              borderColor="whiteAlpha.300"
              bg="whiteAlpha.100"
              _hover={{ bg: "whiteAlpha.200", textDecoration: "none" }}
              whiteSpace="nowrap"
            >
              Download on the App Store
            </Link>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.lg" py={{ base: 12, md: 16 }}>
        <VStack align="stretch" gap={{ base: 10, md: 14 }}>
          <VStack
            align="stretch"
            gap={6}
            textAlign={{ base: "left", md: "center" }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              lineHeight="shorter"
              letterSpacing="tight"
              textTransform="lowercase"
            >
              lunar
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="fg.muted"
              maxW="2xl"
              mx={{ base: 0, md: "auto" }}
            >
              Doomscrolling, but for bedtime.
            </Text>
            <Text
              fontSize="md"
              color="fg.muted"
              maxW="xl"
              mx={{ base: 0, md: "auto" }}
              lineHeight="tall"
            >
              Lunar is a vertical video feed built for the last minutes before
              sleep. Swipe through endlessly generated, calming scenes—no
              algorithmic chaos, no bright feeds, just beautiful motion to help
              you drift off instead of keeping you up.
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
                  <VStack
                    align="center"
                    gap={2}
                    maxW="md"
                    px={{ base: 2, md: 0 }}
                  >
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
                          priority={src === "/assets/lunar_1.png"}
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
            <VStack
              align="stretch"
              gap={4}
              textAlign={{ base: "left", md: "center" }}
            >
              <Heading as="h2" size="md">
                Contact
              </Heading>
              <Text
                fontSize="sm"
                color="fg.muted"
                maxW="lg"
                mx={{ base: 0, md: "auto" }}
              >
                For support, feedback, or questions about Lunar, reach us by
                email. We read every message and aim to reply as soon as we
                can.
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

          <VStack gap={2} pt={2}>
            <Text fontSize="xs" color="fg.muted" textAlign="center">
              <Link
                as={NextLink}
                href="/lunar/privacy"
                color="fg.muted"
                textDecoration="underline"
                textUnderlineOffset="4px"
                _hover={{ color: "fg" }}
              >
                Privacy Policy
              </Link>
            </Text>
            <Text fontSize="xs" color="fg.muted" textAlign="center">
              © {new Date().getFullYear()} Callysto. All rights reserved.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
