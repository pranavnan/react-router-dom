/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../context/CitiesContext';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate(); // used to call getHistory in previous version
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState();
  const [emoji, setEmoji] = useState();
  const [geoCodingError, setGeoCodingError] = useState();

  const { createCity, isLoading } = useCities();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newObj = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    console.log(newObj);
    await createCity(newObj);
    navigate('/app');
  }

  useEffect(() => {
    if (!lat && !lng) {
      return;
    }
    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError('');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        console.log({ data });
        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        }
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoCodingError(err.message);
        console.log({ Form_fetchCityData_catch_err_36: err });
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) {
    return <Spinner />;
  }

  if (!lat && !lng) {
    return <Message message={'Start by clicking somewhere on the map'} />;
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? 'loading' : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input id="date" onChange={e => setDate(e.target.value)} value={date} />
         */}

        <DatePicker
          id="date"
          onChange={date => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        {/* If we want to navigate back we just need to give the - with number of step -1 means one step back and so on. */}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
