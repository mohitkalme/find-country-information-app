import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Image,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

import Head from "next/head";
import Link from "next/link";

import { GetServerSideProps } from "next";

type CountryDetailsType = {
  data: {
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subRegion: string;
    capital: string;
    topLevelDomain: string;
    currency: string;
    language: string;
    flag: string;
  };
};
export default function CountryDetails(props: CountryDetailsType) {
  const data = props.data;

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      <Container maxW="container.xl">
        <Link href="/">
          <Button
            leftIcon={<ArrowBackIcon />}
            mt="10"
            colorScheme="teal"
            variant="solid"
          >
            Back
          </Button>
        </Link>
      </Container>

      <Container
        maxW={{
          base: "xl",
          lg: "container.xl",
        }}
        mt={30}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "repeat(2,1fr)",
          }}
          templateRows={{
            base: "auto",
            md: "400px",
          }}
          gap={{
            base: "2",
            lg: "20",
          }}
        >
          <GridItem display="flex">
            <Image
              boxShadow="outline"
              objectFit="cover"
              sx={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
              src={data.flag}
              alt={data.name}
            />
          </GridItem>
          <GridItem>
            <Heading
              mb="4"
              mt={{
                base: "10",
                lg: "20",
              }}
            >
              {data.name}
            </Heading>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
              gap="2"
            >
              <GridItem>
                <Box display="flex" mt="2" alignItems="baseline">
                  <Text fontWeight="semibold" mr={2}>
                    Native Name :
                  </Text>
                  <Text fontSize="sm" noOfLines={1}>
                    {data.nativeName}
                  </Text>
                </Box>
                <Box display="flex" mt="2" alignItems="baseline">
                  <Text fontWeight="semibold" mr={2}>
                    Population :
                  </Text>
                  <Text fontSize="sm">{data.population}</Text>
                </Box>

                <Box display="flex" mt="2" alignItems="baseline">
                  <Text fontWeight="semibold" mr={2}>
                    Region :
                  </Text>
                  <Text fontSize="sm">{data.region}</Text>
                </Box>

                <Box display="flex" mt="2" alignItems="baseline">
                  <Text fontWeight="semibold" mr={2}>
                    Sub Region :
                  </Text>
                  <Text fontSize="sm">{data.subRegion}</Text>
                </Box>

                <Box display="flex" mt="2" alignItems="baseline">
                  <Text fontWeight="semibold" mr={2}>
                    Capital :
                  </Text>
                  <Text fontSize="sm">{data.capital}</Text>
                </Box>
              </GridItem>

              <GridItem>
                <Box display="flex" mt="2" alignItems="baseline">
                  <Text fontWeight="semibold" mr={2}>
                    Top Level Domain :
                  </Text>
                  <Text fontSize="sm">{data.topLevelDomain}</Text>
                </Box>

                <Box display="flex" mt="2" alignItems="baseline">
                  <Text fontWeight="semibold" mr={2}>
                    Currencies :
                  </Text>
                  <Text fontSize="sm">{data.currency}</Text>
                </Box>

                <Box display="flex" mt="2" alignItems="baseline">
                  <Text fontWeight="semibold" mr={2}>
                    Language :
                  </Text>
                  <Text fontSize="sm">{data.language}</Text>
                </Box>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const countryId = context.params?.countryId;

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryId}?fullText=true`
  );

  const data = await res.json();
  const currency = Object.values(data[0].currencies);
  const language = Object.values(data[0].languages).join(", ");

  const newObj = {
    name: data[0]?.name.common,
    nativeName: data[0]?.name.official,
    population: data[0]?.population,
    region: data[0]?.region,
    subRegion: data[0]?.subregion,
    capital: data[0]?.capital[0] === undefined ? "" : data[0].capital[0],
    topLevelDomain: data[0]?.tld.join(", "),
    currency: currency[0]?.name,
    language: language,
    flag: data[0]?.flags?.png,
  };
  return {
    props: {
      data: newObj,
    },
  };
};
