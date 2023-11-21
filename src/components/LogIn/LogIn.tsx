import { Link } from "react-router-dom";
import logInImage from "../../assets/LogIn&RegisterImage/image.jpg";
import styles from "./LogIn.module.scss";
import useLogInInput from "../../hooks/useLogInInput";
import { useState } from "react";
import { useLoggedInContext } from "../../context/LoggedInContext";

const LogIn = () => {
  const { logInSuccessful } = useLoggedInContext();
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    enteredLogInEmail,
    logInEmailChangeHandler,
    enteredLogInPassword,
    logInPasswordChangeHandler,
  } = useLogInInput();

  const handleLogInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!logInSuccessful(enteredLogInEmail, enteredLogInPassword)) {
      setErrorMessage(true);
      event.preventDefault();
    }
  };

  return (
    <section className={styles[`logIn-section`]}>
      <figure>
        <img src={logInImage} alt="Library" className={styles[`logIn-image`]} />
      </figure>
      <section className={styles[`logIn-form`]}>
        <h2 className={styles[`logIn-form-title`]}>Log in</h2>
        <p className={styles[`logIn-form-description`]}>
          Use a local account to log in
        </p>
        <form>
          <label htmlFor="email"> Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            autoComplete="on"
            value={enteredLogInEmail}
            onChange={logInEmailChangeHandler}
          />

          <label htmlFor="password"> Password </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={enteredLogInPassword}
            onChange={logInPasswordChangeHandler}
            autoComplete="on"
          />
          {errorMessage && (
            <p className={styles[`error-message`]}>
              Looks like either your email address or password were incorrect.
              Do you want to try again?
            </p>
          )}

          <input
            type="checkbox"
            id="rememberLogIn"
            className={styles[`logIn-form-checkbox-input`]}
          />

          <label
            htmlFor="rememberLogIn"
            className={styles[`logIn-form-regular-label`]}
          >
            Remember me?
          </label>
          <Link to={"/"}>
            <button
              className={styles[`logIn-form-btn`]}
              onClick={handleLogInClick}
            >
              Log in
            </button>
          </Link>
          <Link to={"/"} className={styles[`logIn-form-links`]}>
            Forgot your password?
          </Link>
          <Link to={"/register"} className={styles[`logIn-form-links`]}>
            Register as new user
          </Link>
        </form>
      </section>
    </section>
  );
};

export default LogIn;
