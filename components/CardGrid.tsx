import { nanoid } from "nanoid";
import Card from "../components/UI/Card";
import Error from "./UI/Error";

import { Container, Grid, GridItem } from "@chakra-ui/react";
import { Spinner, Center } from "@chakra-ui/react";

import type { RootState } from "../store";
import { useSelector } from "react-redux";

import { countryDataType, SingleCountryType } from "../store";

type CardGridPropsType = {
  initialData: countryDataType;
};

export default function CardGrid({ initialData }: CardGridPropsType) {
  const ReduxToolkitCountryData = useSelector(
    (state: RootState) => state.GlobalState.countryData
  );

  const isLoading = useSelector(
    (state: RootState) => state.GlobalState.isLoading
  );
  const isError = useSelector((state: RootState) => state.GlobalState.isError);

  const data =
    ReduxToolkitCountryData[0].name === ""
      ? initialData
      : ReduxToolkitCountryData;

  return (
    <>
      {isError ? (
        <Error />
      ) : isLoading ? (
        <Center>
          <Spinner size="xl" mt="52" />
        </Center>
      ) : (
        <Container maxW="container.xl" mt={8} p="0">
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3,1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {data.map((country: SingleCountryType) => {
              return (
                <GridItem key={nanoid()} margin="auto">
                  <Card country={country} />
                </GridItem>
              );
            })}
          </Grid>
        </Container>
      )}
    </>
  );
}
