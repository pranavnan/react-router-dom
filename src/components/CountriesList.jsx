/* eslint-disable react/prop-types */
import { useCities } from '../context/CitiesContext';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

const CountriesList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  const countries = cities.reduce((acc, curr) => {
    if (!acc.find(ele => ele.country === curr.country)) {
      return [...acc, { country: curr.country, emoji: curr.emoji }];
    } else {
      return acc;
    }
  }, []);

  if (countries.length <= 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountriesList;
