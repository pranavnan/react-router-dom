/* eslint-disable react/prop-types */
import { useCities } from '../context/CitiesContext';
import CitiItem from './CitiItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (cities.length <= 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CitiItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
