import React from "react";
import { Link } from "react-router-dom";
import "./MainNavigation.css";

function MainNavigation() {
  return (
    <header className="header">
      <nav>
        <ul className="list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
