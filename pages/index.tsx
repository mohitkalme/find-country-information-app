import type { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import Form from "../components/Form";
import CardGrid from "../components/CardGrid";

import { countryDataType } from "../store";


type HomePageType = {
  initialData: countryDataType;
};

const Home = ({ initialData }: HomePageType) => {
  return (
    <div>
      <Head>
        <title>Find Country Information</title>
        <meta name="description" content="Find Country Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form />

      <CardGrid initialData={initialData} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const API_ENDPOINT_ALPHA_CODES =
    "https://restcountries.com/v3.1/alpha?codes=PER,AUT,COL,RUS,JPN,AUS,USA,UKR";
  const res = await fetch(API_ENDPOINT_ALPHA_CODES);
  const data = await res.json();
  const initialData = data.map(
    (country: {
      name: { common: string };
      population: number;
      region: string;
      capital: string[];
      flags: {
        png: string;
      };
    }) => {
      return {
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital[0],
        flags: country.flags.png,
      };
    }
  );

  return {
    props: {
      initialData,
    }, // will be passed to the page component as props
  };
};

export default Home;
