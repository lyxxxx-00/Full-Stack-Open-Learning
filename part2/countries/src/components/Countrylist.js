import { Fragment } from "react";

const Countrylist = ({ countries, handleCountry }) => {
  return (
    <div>
      {countries.map((country) => (
        <Fragment key={country}>
          <p>{country}</p>
          <button onClick={() => handleCountry(country)}>show</button>
        </Fragment>
      ))}
    </div>
  );
};
export default Countrylist;
