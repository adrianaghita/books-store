import useInput from "./useInput";

const useLogInInput = () => {
  const {
    value: enteredLogInEmail,
    valueChangeHandler: logInEmailChangeHandler,
    inputBlurHandler: logInEmailBlurHandler,
    isValid: logInEmailIsValid,
    hasError: logInEmailHasError,
  } = useInput((value) => value.includes("@") && value.trim() !== "");

  const {
    value: enteredLogInPassword,
    valueChangeHandler: logInPasswordChangeHandler,
    inputBlurHandler: logInPasswordBlurHandler,
    isValid: logInPasswordIsValid,
    hasError: logInPasswordHasError,
  } = useInput((value) => value !== "" && value.length >= 5);

  return {
    enteredLogInEmail,
    logInEmailChangeHandler,
    logInEmailBlurHandler,
    logInEmailIsValid,
    logInEmailHasError,
    enteredLogInPassword,
    logInPasswordChangeHandler,
    logInPasswordBlurHandler,
    logInPasswordIsValid,
    logInPasswordHasError,
  };
};

export default useLogInInput;
