import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { SearchIcon } from "@chakra-ui/icons";

import { useDispatch } from "react-redux";
import { setCountryData, setIsError, setIsLoading } from "../../store";

const API_ENDPOINT: string = `https://restcountries.com/v3.1/name/`;

export default function SearchInput() {
  const [countryName, setCountryName] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setUrl(`${API_ENDPOINT}${countryName}`);
    setCountryName("");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();

    setCountryName(e.target.value);
  }

  useEffect(() => {
    if (url.trim() === "") {
      return;
    }
    dispatch(setIsError(false));
    dispatch(setIsLoading(true));

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const newData = data.map(
          (country: {
            name: { common: string };
            population: number;
            region: string;
            capital?: string[];
            flags: {
              png: string;
            };
          }) => {
            return {
              name: country.name.common,
              population: country.population,
              region: country.region,
              //Dont' remove below line
              //Macau country don't have capital key
              capital: country.capital === undefined ? "" : country.capital[0],
              flags: country.flags.png,
            };
          }
        );

        dispatch(setCountryData(newData));

        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        if (err) {
          dispatch(setIsLoading(false));
          dispatch(setIsError(true));
        }
      });
  }, [url, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup w={[300, 400]}>
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          placeholder="Search For a Country"
          value={countryName}
          onChange={handleChange}
        />
      </InputGroup>
    </form>
  );
}
