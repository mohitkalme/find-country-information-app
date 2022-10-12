import { Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setCountryData, setIsError, setIsLoading } from "../../store";
import { SingleCountryType } from "../../store";

const API_ENDPOINT = `https://restcountries.com/v3.1/region/`;

export default function FilterByRegion() {
  const dispatch = useDispatch();
  const [region, setRegion] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.stopPropagation();
    setRegion(e.target.value);
  }

  useEffect(() => {
    const url = `${API_ENDPOINT}${region}`;
    if (region === "") {
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
        const regionData: SingleCountryType[] = data.map(
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
              //one field of returned data doesn't have capital property so app crashes
              //Don't remove the below line
              //Macau country doesn't have capital key
              capital: country.capital === undefined ? "" : country.capital[0],
              flags: country.flags.png,
            };
          }
        );

        dispatch(setCountryData(regionData));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
        dispatch(setIsError(true));
      });
  }, [region, dispatch]);

  return (
    <Select
      name="region"
      value={region}
      onChange={handleChange}
      variant="filled"
      size="md"
      w={[300, 400]}
    >
      <option value="">Filter By Region</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
      <option value="africa">Africa</option>
      <option value="asia">Asia</option>
      <option value="america">America</option>
    </Select>
  );
}
