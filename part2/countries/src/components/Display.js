import React, { useState } from "react";
import Country from "./Country";
import Countrylist from "./Countrylist";

const Display = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleCountry = (country) => {
    setSelectedCountry(country);
  };

  if (countries.length === 1 || selectedCountry) {
    return (
      <Country country={selectedCountry ? selectedCountry : countries[0]} />
    );
  } else if (countries.length > 1 && countries.length <= 10) {
    return (
      <>
        <Countrylist countries={countries} handleCountry={handleCountry} />
      </>
    );
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return <p>No matches, specify another filter</p>;
  }
};
export default Display;
