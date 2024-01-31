import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            {/* by default NavLink actually checks whether the path of the currently active route starts with one of those NavLinks and that NavLinks considered to be active */}
            <NavLink
              to=""
              // className={({ isActive }) => (isActive ? styles.active : "")}
              // style={({ isActive }) => ({
              //   textAlign: isActive ? "center" : "end",
              //   backgroundColor: isActive ? "red" : "blue",
              // })}
              end
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="products"
              // className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
