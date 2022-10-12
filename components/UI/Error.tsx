import { Center, Heading } from "@chakra-ui/react";

export default function Error() {
  return (
    <Center display="flex" mt={9} flexDirection="column">
      <Heading mb={9} fontSize={180} fontWeight="thin">
        \(o_o)/
      </Heading>
      <Heading as="div" fontSize="4xl" fontWeight="thin">
        Can&apos;t Find any Country
      </Heading>
    </Center>
  );
}
