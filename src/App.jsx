import { Suspense, lazy } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from './context/CitiesContext';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

import CityList from './components/CityList';
import CountriesList from './components/CountriesList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import HomePage from './pages/HomePage';
// import PageNotFound from './pages/PageNotFound';
// import AppLayout from './components/AppLayout';
// import Login from './pages/Login';
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const HomePage = lazy(() => import('./pages/Homepage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const AppLayout = lazy(() => import('./components/AppLayout'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <AuthContextProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />

              <Route path="product" element={<Product />} />

              <Route path="pricing" element={<Pricing />} />

              {/* Below is the example of nested route */}
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Navigate component to use to navigate to the route "replace" props to use to go back and fourth  */}
                {/* Below 3 Route viz cities, countries and form is the child route of app and we need to tell the app where it should rendered thats why we use the <Outlet /> component in the app layout  */}
                <Route index element={<Navigate to="cities" replace />} />

                <Route path="cities" element={<CityList />} />

                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<CountriesList />} />

                <Route path="form" element={<Form />} />
              </Route>
              {/* Nested route example over */}

              <Route path="login" element={<Login />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthContextProvider>
  );
}

export default App;
