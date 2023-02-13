import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  function navigatehandler() {
    navigate("products");
  }
  return (
    <>
      <h1>My Home Page</h1>
      <Link to="products">Products List</Link>
      <button onClick={navigatehandler}>Navigate</button>
    </>
  );
}

export default Home;
