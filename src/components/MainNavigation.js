import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./MainNavigation.css";

function MainNavigation() {
  return (
    <header className="header">
      <nav>
        <ul className="list">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
              // style={({isActive}) => }
              end
              // One of the properties you can pass to the NavLink component is end, which determines whether the active state should be applied only when the link is at the end of the URL path. By default, the active state is applied to the link whenever the URL path matches the to property of the NavLink.
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/products"
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
