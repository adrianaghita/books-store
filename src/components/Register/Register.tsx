import { Link } from "react-router-dom";
import RegisterImage from "../../assets/LogIn&RegisterImage/image.jpg";
import styles from "./Register.module.scss";
import useRegisterInput from "../../hooks/useRegisterInput";

const Register = () => {
  const {
    enteredRegistrationEmail,
    emailChangeHandler,
    emailBlurHandler,
    emailHasError,
    enteredRegistrationPassword,
    passwordChangeHandler,
    passwordBlurHandler,
    passwordHasError,
    enteredRegistrationConfirmedPassword,
    confirmedPasswordChangeHandler,
    confirmedPasswordBlurHandler,
    confirmedPasswordHasError,
    handleRegistration,
    formIsValid,
    isEmailUsed,
  } = useRegisterInput();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className={styles[`register-section`]}>
      <figure>
        <img
          src={RegisterImage}
          alt="Library"
          className={styles[`register-image`]}
        />
      </figure>
      <section>
        <form className={styles[`register-form`]} onSubmit={submitHandler}>
          <h2 className={styles[`register-form-title`]}>Register</h2>
          <p className={styles[`register-form-description`]}>
            Create a new account
          </p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="true"
            value={enteredRegistrationEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className={styles[`invalid-input`]}>
              Please enter a valid email address
            </p>
          )}
          {isEmailUsed(enteredRegistrationEmail) && (
            <p className={styles[`invalid-input`]}>
              This email is already registered. Please use a different email
              address.
            </p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={enteredRegistrationPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <p className={styles[`invalid-input`]}>
              Please enter a valid password
            </p>
          )}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={enteredRegistrationConfirmedPassword}
            onChange={confirmedPasswordChangeHandler}
            onBlur={confirmedPasswordBlurHandler}
          />
          {confirmedPasswordHasError && (
            <p className={styles[`invalid-input`]}>
              Password and confirmation must be identical. Please re-enter.
            </p>
          )}
          <Link to={"/logIn"}>
            <button
              className={
                formIsValid
                  ? styles[`register-form-btn`]
                  : styles[`register-form-btn-disabled`]
              }
              onClick={handleRegistration}
              disabled={!formIsValid}
            >
              Register
            </button>
          </Link>
        </form>
      </section>
    </section>
  );
};

export default Register;
