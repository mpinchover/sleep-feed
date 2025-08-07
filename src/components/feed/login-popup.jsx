"use context";
import { VStack, Heading, Button } from "@chakra-ui/react";

const LoginPopup = () => {
  return (
    <VStack
      position="fixed"
      top="70px"
      left="50%"
      transform="translate(-50%, -0%)"
      defaultValue="members"
      zIndex={10}
      // backgroundColor="rgba(255, 255, 255, 0.5)"
      borderRadius="md"
      color="white"
      width="300px"
      paddingY="20px"
      gap={4}
    >
      <Heading>Log in</Heading>
      <Button
        borderRadius={"full"}
        border="1px solid white"
        variant={"ghost"}
        width="100%"
      >
        Sign in with Google
      </Button>
      <Button
        borderRadius={"full"}
        border="1px solid white"
        variant={"ghost"}
        width="100%"
      >
        Sign in with Apple
      </Button>
    </VStack>
  );
};

export default LoginPopup;
