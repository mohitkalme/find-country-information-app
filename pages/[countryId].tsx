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
  Spinner,
  Center,
} from "@chakra-ui/react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import Error from "../components/UI/Error";

const API_ENDPOINT: string = `https://restcountries.com/v3.1/name/`;

const initialDataForState = {
  name: "",
  nativeName: "",
  population: 0,
  region: "",
  subRegion: "",
  capital: "",
  topLevelDomain: "",
  currency: "",
  language: "",
  flag: "",
};
export default function CountryDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(initialDataForState);

  const router = useRouter();
  const id = router.query.countryId;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    async function fetchData() {
      const res = await fetch(`${API_ENDPOINT}${id}?fullText=true`);
      const data = await res.json();

      const currency: { name: string }[] = Object.values(data[0].currencies);
      const language = Object.values(data[0].languages).join(", ");

      const newObj = {
        name: data[0]?.name.common,
        nativeName: data[0]?.name.official,
        population: data[0]?.population,
        region: data[0]?.region,
        subRegion: data[0]?.subregion,
        capital: data[0]?.capital[0] === undefined ? "" : data[0].capital[0],
        topLevelDomain: data[0]?.tld.join(", "),
        currency: currency[0].name,
        language: language,
        flag: data[0]?.flags?.png,
      };

      setIsLoading(false);
      setData(newObj);
    }
    fetchData().catch((err) => {
      setIsError(true);
      setIsLoading(false);
    });
  }, [id]);

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

      {isError ? (
        <Error />
      ) : isLoading ? (
        <Center>
          <Spinner size="xl" mt="52" />
        </Center>
      ) : (
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
                    <Text fontSize="sm" noOfLines={2}>
                      <Text as="span" fontWeight="semibold" mr={2}>
                        Native Name :
                      </Text>
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
      )}
    </>
  );
}
