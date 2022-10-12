import { Box, Img, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

type propType = {
  country: {
    name: string;
    region: string;
    population: number;
    capital: string;
    flags: string;
  };
};
function Card(props: propType) {
  const { flags, name, region, population, capital } = props.country;

  return (
    <Link href={`/${name}`}>
      <Box
        maxW="72"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        color="gray.500"
        m={2}
        _hover={{
          borderColor: "gray.400",
        }}
      >
        <Img
          objectFit="cover"
          height={200}
          width={284}
          src={flags}
          loading="lazy"
          alt={name}
          _hover={{
            cursor: "pointer",
          }}
        />

        <Box p="4">
          <Text as="b" fontSize="xl" noOfLines={1}>
            {name}
          </Text>
          <Box display="flex" mt="2" alignItems="baseline">
            <Text fontWeight="semibold" mr={2}>
              Population :
            </Text>
            <Text fontSize="sm">{population}</Text>
          </Box>
          <Box display="flex" mt="2" alignItems="baseline">
            <Text fontWeight="semibold" mr={2}>
              Region :
            </Text>
            <Text fontSize="sm">{region}</Text>
          </Box>
          <Box display="flex" mt="2" alignItems="baseline">
            <Text fontWeight="semibold" mr={2}>
              Capital :
            </Text>
            <Text fontSize="sm">{capital}</Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

export default React.memo(Card);
