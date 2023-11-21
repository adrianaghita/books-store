import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { GoHome } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePerson3 } from "react-icons/md";
import logo from "../../../src/assets/Logo/LogoITP.svg";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { useLoggedInContext } from "../../context/LoggedInContext";
import { useState } from "react";

const Header = () => {
  const { itemsCounter } = useShoppingCartContext();
  const { isLoggedIn, loggedEmail, logOut } = useLoggedInContext();
  const [loggedOutIsShown, setLogOutIsShown] = useState(false);

  const toggleShowLogOutMenu = () => {
    setLogOutIsShown(!loggedOutIsShown);
  };

  return (
    <nav>
      <ul className={styles.navBar}>
        <li className={styles[`navBar-brand`]}>
          <NavLink to={"/"}>
            <span>
              <img src={logo} className={styles[`navBar-logo`]} />{" "}
            </span>
            ITP Library
          </NavLink>
        </li>
        <li className={styles[`navBar-item`]}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? styles[`active-link`] : styles[`inactive-link`]
            }
          >
            <GoHome className={styles[`navBar-icon`]} />
            Home
          </NavLink>
        </li>
        <li className={styles[`navBar-item`]}>
          <NavLink
            to={"cart"}
            className={({ isActive }) =>
              isActive ? styles[`active-link`] : styles[`inactive-link`]
            }
          >
            <CiShoppingCart className={styles[`navBar-icon`]} />
            Shopping Cart
            {itemsCounter > 0 && (
              <span className={styles[`items-counter`]}>{itemsCounter}</span>
            )}
          </NavLink>
        </li>

        <li className={styles[`navBar-item`]}>
          {isLoggedIn ? (
            <NavLink
              to={"orders"}
              className={({ isActive }) =>
                isActive ? styles[`active-link`] : styles[`inactive-link`]
              }
            >
              <TbTruckDelivery className={styles[`navBar-icon`]} />
              Orders
            </NavLink>
          ) : (
            <span className={styles[`link-disabled`]}>
              <TbTruckDelivery className={styles[`navBar-icon`]} />
              Orders
            </span>
          )}
        </li>

        <li className={styles[`navBar-item`]}>
          {isLoggedIn ? (
            <div className={styles.loggedin}>
              <button
                className={styles[`user-name`]}
                onClick={toggleShowLogOutMenu}
              >
                <MdOutlinePerson3 className={styles[`navBar-icon`]} />
                {loggedEmail}
              </button>
              <div
                className={
                  loggedOutIsShown
                    ? styles[`loggedin-menu`]
                    : styles[`display-none`]
                }
              >
                <p className={styles[`favorite-list`]}>
                  <Link to={"/favoriteList"}>Saved Items</Link>
                </p>
                <button onClick={logOut}>LOGOUT</button>
              </div>
            </div>
          ) : (
            <NavLink
              to={"/logIn"}
              className={({ isActive }) =>
                isActive ? styles[`active-link`] : styles[`inactive-link`]
              }
            >
              <MdOutlinePerson3 className={styles[`navBar-icon`]} />
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
