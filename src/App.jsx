import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Root from "./pages/Root";
import Error from "./pages/Error";
import ProductDetails from "./pages/ProductDetails";

// absolute path are started after the domain name
// relative path starts with the currently active path

// while using the Link component we have access to "relative" props viz have two values a: "path", b: "route"
// with this relative prop we have control whether the to="/product" this segment here is added relative to the currently active route path or to the currently active path in the URL
// path:

// the path is the part after the domain
// The route or path viz start from "/" are considered as absolute path and they are always going to append after the domain name
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Root />, // in Root component we must specify where this child routes should rendered
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:productId", element: <ProductDetails /> },
      // defining the routes like above are going to append at the end of the wrapper route so these are the relative route viz going to append at the end of currently active route
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
