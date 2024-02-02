import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities`);
        const citiesData = await res.json();

        console.log({ citiesData });

        setCities(citiesData);
      } catch (err) {
        alert(`There is an error while fetching the cities, ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="product" element={<Product />} />

        <Route path="pricing" element={<Pricing />} />

        {/* Below is the example of nested route */}
        <Route path="app" element={<AppLayout />}>
          {/* Navigate component to use to navigate to the route "replace" props to use to go back and fourth  */}
          {/* Below 3 Route viz cities, countries and form is the child route of app and we need to tell the app where it should rendered thats why we use the <Outlet /> component in the app layout  */}
          <Route index element={<Navigate to="cities" replace />} />

          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />

          <Route path="cities/:id" element={<City />} />

          <Route
            path="countries"
            element={<CountriesList cities={cities} isLoading={isLoading} />}
          />

          <Route path="form" element={<Form />} />
        </Route>
        {/* Nested route example over */}

        <Route path="login" element={<Login />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
