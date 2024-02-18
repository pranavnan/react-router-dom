import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

const CitiesContext = createContext({
  cities: [],
  isLoading: '',
  currentCity: {},
  getCity: () => {},
  createCity: () => {},
  deleteCity: () => {},
});

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action?.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case 'cities/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case 'cities/deleted':
      return {
        ...state,
        cities: state.cities.filter(city => +city.id !== +action.payload),
        isLoading: false,
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error(`Unknown action type ${action?.type}`);
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState();

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`http://localhost:8000/cities`);
        const citiesData = await res.json();

        console.log({ citiesData });

        dispatch({ type: 'cities/loaded', payload: citiesData });
      } catch (err) {
        alert(`There is an error while fetching the cities, ${err.message}`);
        dispatch({
          type: 'rejected',
          payload: `There was an error while loading the cities`,
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(cityId) {
      if (Number(cityId === currentCity.id)) {
        return;
      }
      try {
        dispatch({ type: 'loading' });

        const res = await fetch(`http://localhost:8000/cities/${cityId}`);
        const cityData = await res.json();

        console.log({ CitiesContext_40: cityData });

        dispatch({ type: 'city/loaded', payload: cityData });
      } catch (err) {
        alert(`There is an error while creating the cities, ${err.message}`);
        dispatch({ type: 'loading' });
      }
    },
    [currentCity.id]
  );

  async function createCity(city) {
    try {
      dispatch({ type: 'loading' });

      const res = await fetch(`http://localhost:8000/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
      });

      const cityData = await res.json();

      console.log({ CitiesContext_63: cityData });

      // making in-sync with remote state whenever we adding the new city
      dispatch({ type: 'cities/created', payload: cityData });
    } catch (err) {
      alert(`There is an error while fetching the cities, ${err.message}`);
      dispatch({
        type: 'rejected',
        payload: `There was an error while creating the city`,
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });

      const res = await fetch(`http://localhost:8000/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'cities/deleted', payload: id });
    } catch (err) {
      alert(`There is an error while creating the cities, ${err.message}`);
      dispatch({
        type: 'rejected',
        payload: `There was an error while deleting the city`,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error('CitiesContext was used outside the CitiesProvider');
  }
  return context;
}

export { useCities, CitiesProvider };
