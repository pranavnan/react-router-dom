import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>My Home Page</h1>
      <Link to="/products">Products List</Link>
    </>
  );
}

export default Home;
