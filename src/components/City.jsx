import { useParams, useSearchParams } from 'react-router-dom';
import styles from './City.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../context/CitiesContext';
import Spinner from './Spinner';
import BackButton from './BackButton';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  console.log({ id });

  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  const [searchParam, setSearchParam] = useSearchParams();

  // How to set the the new query param we have to pass the object
  // setSearchParam({
  //   lat: 13,
  //   lng: 85,
  // });

  const lat = searchParam.get('lat');
  const lng = searchParam.get('lng');

  // TEMP DATA
  // const currentCity = {
  //   cityName: 'Lisbon',
  //   emoji: '🇵🇹',
  //   date: '2027-10-31T15:59:59.138Z',
  //   notes: 'My favorite city so far!',
  // };

  const { cityName, emoji, date, notes } = currentCity || {};

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
