import useInput from "./useInput";

export interface User {
  email: string;
  password: string;
  confirmedPassword: string;
}

const useRegisterInput = () => {
  const {
    value: enteredRegistrationEmail,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = useInput((value) => value.includes("@") && value.trim() !== "");

  const {
    value: enteredRegistrationPassword,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    isValid: passwordIsValid,
    hasError: passwordHasError,
  } = useInput((value) => value !== "" && value.length >= 5);

  const {
    value: enteredRegistrationConfirmedPassword,
    valueChangeHandler: confirmedPasswordChangeHandler,
    inputBlurHandler: confirmedPasswordBlurHandler,
    isValid: confirmedPasswordIsValid,
    hasError: confirmedPasswordHasError,
  } = useInput(
    (value) =>
      value !== "" && value.length >= 5 && value === enteredRegistrationPassword
  );

  const handleRegistration = () => {
    const usersString = localStorage.getItem("users");
    const users: User[] = usersString ? JSON.parse(usersString) : [];

    users.push({
      email: enteredRegistrationEmail,
      password: enteredRegistrationPassword,
      confirmedPassword: enteredRegistrationConfirmedPassword,
    });

    localStorage.setItem("users", JSON.stringify(users));
  };

  const isEmailUsed = (enteredEmail: string): boolean => {
    const usersString = localStorage.getItem("users");
    if (usersString) {
      const users: User[] = JSON.parse(usersString);
      if (users.find((user) => user.email === enteredEmail)) {
        return true;
      }
    }

    return false;
  };

  let formIsValid = false;

  if (
    emailIsValid &&
    passwordIsValid &&
    confirmedPasswordIsValid &&
    !isEmailUsed(enteredRegistrationEmail)
  ) {
    formIsValid = true;
  }

  return {
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
  };
};

export default useRegisterInput;
