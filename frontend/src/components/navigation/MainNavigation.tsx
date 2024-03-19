import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/">Strona główna</Link>
          </li>
          <li>
            <Link to="/register">Rejestracja</Link>
          </li>
          <li>
            <Link to="/login">Logowanie</Link>
          </li>
          <li>
            <Link to="/details">Przepis</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
