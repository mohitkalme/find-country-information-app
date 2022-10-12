import { Container, Flex, Spacer } from "@chakra-ui/react";
import React from "react";

import SearchInput from "./UI/SearchInput";
import FilterByRegion from "./UI/FilterByRegion";

export default function Form() {
  return (
    <Container maxW="container.xl">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap={{
          base: "2",
          sm: "3",
        }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <SearchInput />
        <Spacer />
        <FilterByRegion />
      </Flex>
    </Container>
  );
}
