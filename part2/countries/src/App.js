import React, { useEffect, useState } from "react";
import axios from "axios";
import Display from "./components/Display";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data.map((country) => country.name.common));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.toLowerCase().includes(countryName.toLowerCase())
  );

  const handleCountryChange = (event) => {
    setCountryName(event.target.value);
  };

  return (
    <div>
      <form>
        find countries:
        <input value={countryName} onChange={handleCountryChange} />
      </form>
      <Display countries={countriesToShow} />
    </div>
  );
}

export default App;
