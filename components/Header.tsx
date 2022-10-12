import {
  Container,
  Flex,
  Spacer,
  Box,
  Heading,
  useColorMode,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container p={2} maxW="container.xl">
      <Flex alignItems="center" gap="2">
        <Box p="3">
          <Heading size="lg" color="teal.500">
            <Link href="/">Where in the World?</Link>
          </Heading>
        </Box>
        <Spacer />

        {colorMode === "dark" ? (
          <Tooltip label="Change Theme" bg="gray.600" color="white">
            <IconButton
              onClick={toggleColorMode}
              aria-label="Change Theme"
              icon={
                <SunIcon
                  w={6}
                  h={6}
                  color="gray.500"
                  cursor="pointer"
                  onClick={toggleColorMode}
                />
              }
            />
          </Tooltip>
        ) : (
          <Tooltip label="Change Theme" bg="gray.300" color="gray.800">
            <IconButton
              onClick={toggleColorMode}
              aria-label="Change Theme"
              icon={<MoonIcon w={6} h={6} color="gray.500" cursor="pointer" />}
            />
          </Tooltip>
        )}
      </Flex>
    </Container>
  );
}
