"use client";

import {
  Box,
  Container,
  Heading,
  Link,
  List,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Section = ({ title, children }) => (
  <VStack align="stretch" gap={4}>
    <Heading as="h2" size="md">
      {title}
    </Heading>
    {children}
  </VStack>
);

export default function PrivacyPage() {
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
        <Container maxW="container.md">
          <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              letterSpacing="tight"
              textTransform="lowercase"
            >
              callysto
            </Text>
          </Link>
        </Container>
      </Box>

      <Container maxW="container.md" py={{ base: 10, md: 14 }}>
        <VStack align="stretch" gap={{ base: 8, md: 10 }}>
          <VStack align="stretch" gap={2}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              lineHeight="shorter"
              letterSpacing="tight"
            >
              Callysto Meditation — Privacy Policy
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              Last updated: June 14, 2026
            </Text>
          </VStack>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Overview">
            <Text color="fg.muted" lineHeight="tall">
              Callysto Meditation is a meditation app. This
              Privacy Policy explains what information we collect, how we use
              it, and your rights regarding that information.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Information We Collect">
            <VStack align="stretch" gap={5}>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Account information
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  When you create an account, we collect your email address. If
                  you sign in with Apple or Google, we receive the email
                  address and name associated with that account. We do not
                  receive your Apple or Google password.
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Usage data
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  We track the total amount of meditation time you have
                  completed. This is used to manage the allowed meditation 
                  time before requiring a log in or sign up. This data is stored
                  locally on your device and associated with your account.
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Technical data
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  Our servers receive standard request metadata (such as IP
                  address and request timestamps) when the app fetches
                  meditation sounds and daily insights. We do not log or retain
                  this data beyond what is required for normal server operation.
                </Text>
              </Box>
            </VStack>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="How We Use Your Information">
            <List.Root
              as="ul"
              gap={2}
              color="fg.muted"
              lineHeight="tall"
              pl={4}
              style={{ listStyleType: "disc" }}
            >
              <List.Item>To create and manage your account</List.Item>
              <List.Item>
                To allow a trial before requiring a log in or sign up.
              </List.Item>
              <List.Item>
                To deliver meditation sounds and daily insights from our
                servers
              </List.Item>
              <List.Item>
                To display your meditation statistics within the app
              </List.Item>
            </List.Root>
            <Text color="fg.muted" lineHeight="tall">
              We do not use your information for advertising. We do not sell,
              rent, or share your personal information with third parties for
              their own marketing purposes.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Third-Party Services">
            <VStack align="stretch" gap={5}>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Firebase (Google)
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  We use Firebase Authentication, provided by Google, to
                  securely manage sign-in. When you create an account or sign
                  in, your authentication information is processed by
                  Firebase. Firebase&apos;s privacy policy is available at{" "}
                  <Link
                    href="https://firebase.google.com/support/privacy"
                    color="fg"
                    textDecoration="underline"
                    textUnderlineOffset="4px"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    firebase.google.com/support/privacy
                  </Link>
                  .
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Sign in with Apple
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  If you sign in with Apple, your authentication is handled by
                  Apple. Apple&apos;s privacy policy is available at{" "}
                  <Link
                    href="https://www.apple.com/legal/privacy"
                    color="fg"
                    textDecoration="underline"
                    textUnderlineOffset="4px"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    apple.com/legal/privacy
                  </Link>
                  .
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Sign in with Google
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  If you sign in with Google, your authentication is handled by
                  Google. Google&apos;s privacy policy is available at{" "}
                  <Link
                    href="https://policies.google.com/privacy"
                    color="fg"
                    textDecoration="underline"
                    textUnderlineOffset="4px"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    policies.google.com/privacy
                  </Link>
                  .
                </Text>
              </Box>
            </VStack>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Data Storage">
            <Text color="fg.muted" lineHeight="tall">
              Meditation sounds and daily insights are cached locally on your
              device in the app&apos;s private storage. This data does not leave
              your device except to be fetched from our servers. Authentication
              credentials are managed securely by Firebase and are not stored in
              plain text on your device.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Data Retention">
            <Text color="fg.muted" lineHeight="tall">
              Your account and associated data are retained for as long as your
              account is active. You may request deletion of your account and
              associated data by contacting us at the email address below. Upon
              deletion, your personal information will be removed from our
              systems within 30 days.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Children's Privacy">
            <Text color="fg.muted" lineHeight="tall">
              Callysto is not directed at children under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If you believe a child under 13 has provided us with personal
              information, please contact us and we will delete it promptly.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Your Rights">
            <Text color="fg.muted" lineHeight="tall" mb={3}>
              Depending on your location, you may have the right to:
            </Text>
            <List.Root
              as="ul"
              gap={2}
              color="fg.muted"
              lineHeight="tall"
              pl={4}
              style={{ listStyleType: "disc" }}
            >
              <List.Item>
                Access the personal information we hold about you
              </List.Item>
              <List.Item>Correct inaccurate information</List.Item>
              <List.Item>Request deletion of your information</List.Item>
              <List.Item>
                Withdraw consent where processing is based on consent
              </List.Item>
            </List.Root>
            <Text color="fg.muted" lineHeight="tall">
              To exercise any of these rights, contact us at the email address
              below.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Changes to This Policy">
            <Text color="fg.muted" lineHeight="tall">
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by updating the &quot;Last
              updated&quot; date at the top of this page. Continued use of the
              app after changes are posted constitutes your acceptance of the
              revised policy.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="Contact">
            <Text color="fg.muted" lineHeight="tall">
              If you have questions or requests regarding this Privacy Policy,
              please contact us at:
            </Text>
            <Link
              href="mailto:hello@callystoapp.com"
              fontWeight="medium"
              color="fg"
              textDecoration="underline"
              textUnderlineOffset="4px"
            >
              hello@callystoapp.com
            </Link>
          </Section>

          <Text fontSize="xs" color="fg.muted" textAlign="center" pt={4}>
            © {new Date().getFullYear()} Callysto. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
