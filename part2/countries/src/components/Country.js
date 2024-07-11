import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const [countryDetail, setCountryDetail] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country.toLowerCase()}`)
      .then((response) => {
        setCountryDetail(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
        setCountryDetail(null); // 可选：如果请求失败，也可以设置为一个默认值或者空对象
      });
  }, [country]);

  return countryDetail ? (
    <CountryDetail countryDetail={countryDetail} />
  ) : (
    <p>Loading...</p>
  );
};

const CountryDetail = ({ countryDetail }) => {
  const languages = Object.values(countryDetail.languages);

  return (
    <>
      <h1>{countryDetail.name.common}</h1>
      <p>capital {countryDetail.capital[0]}</p>
      <p>population {countryDetail.population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={countryDetail.flag} alt="flag" width="100px" />
    </>
  );
};
export default Country;
