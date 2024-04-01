import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CountertopsIcon from "@mui/icons-material/Countertops";
import { useState } from "react";

const MainNavigation = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/", { replace: true });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="w-full bg-gray-500 shadow-lg text-white text-xs sm:text-base">
      <nav className="flex justify-between h-16 items-center px-8">
        <div className="flex items-center justify-center gap-3 sm:gap-16">
          <Link
            to="/"
            className="text-inherit flex items-center justify-center no-underline sm:mb-1 gap-1 hover:transition-all hover:ease-in-out hover:text-yellow-400 active:text-yellow-400"
          >
            <CountertopsIcon></CountertopsIcon>
            <div className="flex items-center justify-center font-mono">
              <span className="text-inherit">Pyszne</span>
              <span className="text-inherit">Pomysły</span>
            </div>
          </Link>
          <Link
            to="/"
            className="text-inherit no-underline hover:transition-all hover:ease-in-out hover:text-yellow-400 active:text-yellow-400"
          >
            PRZEPISY
          </Link>
          <Link
            to="/"
            className="text-inherit no-underline hover:transition-all hover:ease-in-out hover:text-yellow-400 active:text-yellow-400"
          >
            WYSZUKAJ
          </Link>
          {token && (
            <Link
              to="/"
              className="text-inherit no-underline hover:transition-all hover:ease-in-out hover:text-yellow-400 active:text-yellow-400"
            >
              DODAJ PRZEPIS
            </Link>
          )}
        </div>
        <div className="text-inherit">
          {!token && (
            <Link
              to="/login"
              className="text-inherit no-underline hover:transition-all hover:ease-in-out hover:text-yellow-400 active:text-yellow-400"
            >
              LOGOWANIE
            </Link>
          )}
          {token && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className="hover:transition-all hover:ease-in-out hover:text-yellow-400 active:text-yellow-400"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Mój profil</MenuItem>
                <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
  // return (
  //   <header className={classes.header}>
  //     <nav>
  //       <ul className={classes.list}>
  //         <li>
  //           <Link to="/">Strona główna</Link>
  //         </li>
  //         {!token && (
  //           <li>
  //             <Link to="/register">Rejestracja</Link>
  //           </li>
  //         )}
  //         {!token && (
  //           <li>
  //             <Link to="/login">Logowanie</Link>
  //           </li>
  //         )}
  //         {token && (
  //           <li>
  //             <a onClick={handleLogout}>Wyloguj</a>
  //           </li>
  //         )}
  //       </ul>
  //     </nav>
  //   </header>
  // );
};

export default MainNavigation;
