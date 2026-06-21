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

const CONTACT_EMAIL = "hello@callystoapp.com";

const Section = ({ title, children }) => (
  <VStack align="stretch" gap={4}>
    <Heading as="h2" size="md">
      {title}
    </Heading>
    {children}
  </VStack>
);

export default function LunarPrivacyPage() {
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
          <Text
            fontSize="lg"
            fontWeight="semibold"
            letterSpacing="tight"
            textTransform="lowercase"
          >
            lunar
          </Text>
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
              Privacy Policy — Lunar
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              Effective Date: June 21, 2026
            </Text>
            <Text fontSize="sm" color="fg.muted">
              Developer: Callysto
            </Text>
            <Text fontSize="sm" color="fg.muted">
              Contact:{" "}
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                color="fg"
                textDecoration="underline"
                textUnderlineOffset="4px"
              >
                {CONTACT_EMAIL}
              </Link>
            </Text>
          </VStack>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="1. Introduction">
            <Text color="fg.muted" lineHeight="tall">
              This Privacy Policy describes how Callysto (&quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares
              information when you use Lunar (&quot;the App&quot;). By using the
              App, you agree to the practices described in this policy.
            </Text>
            <Text color="fg.muted" lineHeight="tall">
              If you are under the age of 13, or if you are a parent or
              guardian of a child under 13 who uses the App, please read Section
              7 (Children&apos;s Privacy) carefully before using the App.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="2. Information We Collect">
            <VStack align="stretch" gap={5}>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Account information
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  When you create an account, we collect your email address and
                  a password (stored as a secure hash). We use Google Firebase
                  Authentication to manage accounts. Your password is never
                  stored in plain text and is not accessible to us.
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Usage data
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  We collect information about how you use the App, including
                  which videos you watch and how long you watch them. This
                  helps us improve the content and experience we offer.
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Device information
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  We may collect basic device information such as device type,
                  operating system version, and app version for the purpose of
                  diagnosing technical issues.
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Information we do not collect
                </Text>
                <List.Root
                  as="ul"
                  gap={2}
                  color="fg.muted"
                  lineHeight="tall"
                  pl={4}
                  style={{ listStyleType: "disc" }}
                >
                  <List.Item>We do not collect your location.</List.Item>
                  <List.Item>
                    We do not collect your contacts, photos, microphone input,
                    or camera data.
                  </List.Item>
                  <List.Item>
                    We do not allow you to upload or post content.
                  </List.Item>
                </List.Root>
              </Box>
            </VStack>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="3. How We Use Your Information">
            <Text color="fg.muted" lineHeight="tall" mb={3}>
              We use the information we collect to:
            </Text>
            <List.Root
              as="ul"
              gap={2}
              color="fg.muted"
              lineHeight="tall"
              pl={4}
              style={{ listStyleType: "disc" }}
            >
              <List.Item>Provide and operate the App and its features</List.Item>
              <List.Item>
                Authenticate your account and keep it secure
              </List.Item>
              <List.Item>
                Deliver video content personalized to your session
              </List.Item>
              <List.Item>Diagnose bugs and improve app performance</List.Item>
              <List.Item>
                Respond to your questions or support requests
              </List.Item>
            </List.Root>
            <Text color="fg.muted" lineHeight="tall">
              We do not sell your personal information to third parties.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="4. How We Share Your Information">
            <VStack align="stretch" gap={5}>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Service providers
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  We use Google Firebase (a Google LLC service) for
                  authentication and backend infrastructure. Google processes
                  data on our behalf under their own privacy terms. You can
                  review Google&apos;s privacy policy at{" "}
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
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Legal obligations
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  We may disclose information if required to do so by law or in
                  response to valid legal process (such as a court order or
                  subpoena).
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Business transfers
                </Text>
                <Text color="fg.muted" lineHeight="tall">
                  If Callysto is involved in a merger, acquisition, or sale of
                  assets, your information may be transferred as part of that
                  transaction. We will notify you via email or a notice in the
                  App before your information becomes subject to a different
                  privacy policy.
                </Text>
              </Box>
            </VStack>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="5. Data Retention">
            <Text color="fg.muted" lineHeight="tall">
              We retain your account information for as long as your account is
              active. If you delete your account, we will delete your personal
              information within 30 days, except where we are required to retain
              it for legal or regulatory reasons.
            </Text>
            <Text color="fg.muted" lineHeight="tall">
              You may request deletion of your account and associated data at
              any time by contacting us at{" "}
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                color="fg"
                textDecoration="underline"
                textUnderlineOffset="4px"
              >
                {CONTACT_EMAIL}
              </Link>
              .
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="6. Security">
            <Text color="fg.muted" lineHeight="tall">
              We use industry-standard measures to protect your information,
              including encrypted data transmission (HTTPS/TLS) and secure
              credential management through Firebase Authentication. However, no
              method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="7. Children's Privacy (COPPA)">
            <Text color="fg.muted" lineHeight="tall">
              Lunar is available to users of all ages. We take children&apos;s
              privacy seriously and comply with the Children&apos;s Online
              Privacy Protection Act (COPPA).
            </Text>
            <Text color="fg.muted" lineHeight="tall">
              <Text as="span" fontWeight="semibold">
                For users under 13:
              </Text>{" "}
              If you are under 13, you must have a parent or guardian review and
              agree to this Privacy Policy before creating an account or using
              the App.
            </Text>
            <Text color="fg.muted" lineHeight="tall">
              <Text as="span" fontWeight="semibold">
                For parents and guardians:
              </Text>{" "}
              If you believe your child under 13 has provided us with personal
              information without your consent, please contact us immediately at{" "}
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                color="fg"
                textDecoration="underline"
                textUnderlineOffset="4px"
              >
                {CONTACT_EMAIL}
              </Link>
              . We will promptly review the situation and delete the
              child&apos;s information if appropriate.
            </Text>
            <Text color="fg.muted" lineHeight="tall">
              We do not knowingly use personal information collected from
              children under 13 for advertising purposes, and we do not share
              such information with third parties for their own marketing.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="8. Your Rights and Choices">
            <Text color="fg.muted" lineHeight="tall" mb={3}>
              Depending on where you live, you may have the right to:
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
              <List.Item>Delete your account and associated data</List.Item>
              <List.Item>Opt out of certain data uses</List.Item>
            </List.Root>
            <Text color="fg.muted" lineHeight="tall">
              To exercise any of these rights, contact us at{" "}
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                color="fg"
                textDecoration="underline"
                textUnderlineOffset="4px"
              >
                {CONTACT_EMAIL}
              </Link>
              . We will respond within 30 days.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="9. Third-Party Links and Services">
            <Text color="fg.muted" lineHeight="tall">
              The App may display content hosted on third-party servers. We are
              not responsible for the privacy practices of those services. We
              encourage you to review the privacy policies of any third-party
              services you interact with.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="10. Changes to This Policy">
            <Text color="fg.muted" lineHeight="tall">
              We may update this Privacy Policy from time to time. When we do,
              we will revise the &quot;Effective Date&quot; at the top of this
              page and, where appropriate, notify you through the App or by
              email. Continued use of the App after changes take effect
              constitutes your acceptance of the updated policy.
            </Text>
          </Section>

          <Separator borderColor="whiteAlpha.150" />

          <Section title="11. Contact Us">
            <Text color="fg.muted" lineHeight="tall">
              If you have any questions about this Privacy Policy or your data,
              please contact us:
            </Text>
            <Text color="fg.muted" lineHeight="tall">
              Email:{" "}
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                fontWeight="medium"
                color="fg"
                textDecoration="underline"
                textUnderlineOffset="4px"
              >
                {CONTACT_EMAIL}
              </Link>
            </Text>
            <Text color="fg.muted" lineHeight="tall">
              Developer: Callysto
            </Text>
          </Section>

          <Text fontSize="xs" color="fg.muted" textAlign="center" pt={4}>
            © {new Date().getFullYear()} Callysto. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
