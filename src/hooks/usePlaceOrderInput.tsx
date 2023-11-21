import { useState } from "react";
import useInput from "./useInput";

const usePlaceOrderInput = () => {
  const [billingAddressIsChecked, setBillingAddressIsChecked] = useState(true);
  const toggleDeliveryAddress = () => {
    setBillingAddressIsChecked(!billingAddressIsChecked);
  };

  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    isValid: enteredFirstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "" && /^[a-zA-Z]+$/.test(value));

  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    isValid: enteredLastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== "" && /^[a-zA-Z]+$/.test(value));

  const {
    value: enteredBillingCountry,
    hasError: billingCountryHasError,
    isValid: billingCountryIsValid,
    valueChangeHandler: billingCountryChangeHandler,
    inputBlurHandler: billingCountryBlurHandler,
  } = useInput((value) => value !== "Country Selection" && value !== "");

  const {
    value: enteredBillingAddress,
    hasError: billingAddressHasError,
    isValid: billingAddressIsValid,
    valueChangeHandler: billingAddressChangeHandler,
    inputBlurHandler: billingAddressBlurHandler,
  } = useInput((value) => value.trim() !== "" && value.length >= 30);

  const {
    value: enteredBillingPhone,
    hasError: billingPhoneHasError,
    isValid: billingPhoneIsValid,
    valueChangeHandler: billingPhoneChangeHandler,
    inputBlurHandler: billingPhoneBlurHandler,
  } = useInput(
    (value) => value.trim() !== "" && /^\d+$/.test(value) && value.length <= 13
  );

  const {
    value: enteredDeliveryCountry,
    hasError: deliveryCountryHasError,
    isValid: deliveryCountryIsValid,
    valueChangeHandler: deliveryCountryChangeHandler,
    inputBlurHandler: deliveryCountryBlurHandler,
  } = useInput((value) => value !== "Country Selection" && value !== "");

  const {
    value: enteredDeliveryAddress,
    hasError: deliveryAddressHasError,
    isValid: deliveryAddressIsValid,
    valueChangeHandler: deliveryAddressChangeHandler,
    inputBlurHandler: deliveryAddressBlurHandler,
  } = useInput((value) => value.trim() !== "" && value.length >= 30);

  const {
    value: enteredDeliveryPhone,
    hasError: deliveryPhoneHasError,
    isValid: deliveryPhoneIsValid,
    valueChangeHandler: deliveryPhoneChangeHandler,
    inputBlurHandler: deliveryPhoneBlurHandler,
  } = useInput(
    (value) => value.trim() !== "" && /^\d+$/.test(value) && value.length <= 13
  );

  const {
    value: enteredDeliveryDate,
    hasError: deliveryDateHasError,
    isValid: deliveryDateIsValid,
    valueChangeHandler: deliveryDateChangeHandler,
    inputBlurHandler: deliveryDateBlurHandler,
  } = useInput((value) => value !== "");

  const { value: observations, valueChangeHandler: observationsChangeHandler } =
    useInput((value) => (value ? true : false));

  let formIsValid = false;

  if (
    billingAddressIsChecked &&
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    billingAddressIsValid &&
    billingPhoneIsValid &&
    billingCountryIsValid &&
    deliveryDateIsValid
  ) {
    formIsValid = true;
  } else if (
    !billingAddressIsChecked &&
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    billingAddressIsValid &&
    billingPhoneIsValid &&
    deliveryAddressIsValid &&
    deliveryPhoneIsValid &&
    deliveryCountryIsValid &&
    deliveryPhoneIsValid &&
    deliveryDateIsValid
  ) {
    formIsValid = true;
  }

  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    enteredFirstName,
    firstNameHasError,
    firstNameChangeHandler,
    firstNameBlurHandler,
    enteredLastName,
    lastNameHasError,
    lastNameChangeHandler,
    lastNameBlurHandler,
    enteredBillingCountry,
    billingCountryHasError,
    billingCountryChangeHandler,
    billingCountryBlurHandler,
    enteredBillingAddress,
    billingAddressHasError,
    billingAddressChangeHandler,
    billingAddressBlurHandler,
    enteredBillingPhone,
    billingPhoneHasError,
    billingPhoneChangeHandler,
    billingPhoneBlurHandler,
    enteredDeliveryCountry,
    deliveryCountryHasError,
    deliveryCountryChangeHandler,
    deliveryCountryBlurHandler,
    enteredDeliveryAddress,
    deliveryAddressHasError,
    deliveryAddressChangeHandler,
    deliveryAddressBlurHandler,
    enteredDeliveryPhone,
    deliveryPhoneHasError,
    deliveryPhoneChangeHandler,
    deliveryPhoneBlurHandler,
    enteredDeliveryDate,
    deliveryDateHasError,
    deliveryDateChangeHandler,
    deliveryDateBlurHandler,
    formIsValid,
    toggleDeliveryAddress,
    billingAddressIsChecked,
    getCurrentDate,
    observations,
    observationsChangeHandler,
  };
};

export default usePlaceOrderInput;
