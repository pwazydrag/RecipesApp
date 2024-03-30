import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/">Strona główna</Link>
          </li>
          {!token && (
            <li>
              <Link to="/register">Rejestracja</Link>
            </li>
          )}
          {!token && (
            <li>
              <Link to="/login">Logowanie</Link>
            </li>
          )}
          {token && (
            <li>
              <a onClick={handleLogout}>Wyloguj</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
