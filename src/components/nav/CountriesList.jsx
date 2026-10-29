import styles from "../css_modules/CountryList.module.css";
import Spinner from "../nav/Spinner";

import Message from "../nav/Message";
import CountryItem from "./CountryItem";
import { useCities } from "../../contexts/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map "}
      />
    );

  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      return [
        ...acc,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    }
    return acc;
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </div>
  );
}

export default CountriesList;
