import useInput from "./useInput";
import { OrderDetails } from "../context/OrdersContext";
import usePlaceOrderInput from "./usePlaceOrderInput";

const useUpdateOrderInput = (order: OrderDetails) => {
  const { billingAddressIsChecked } = usePlaceOrderInput();

  const {
    value: firstName,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
  } = useInput(
    (value) => value.trim() !== "" && /^[a-zA-Z]+$/.test(value),
    order.firstName
  );

  const {
    value: lastName,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
  } = useInput(
    (value) => value.trim() !== "" && /^[a-zA-Z]+$/.test(value),
    order.lastName
  );

  const {
    value: billingCountry,
    isValid: billingCountryIsValid,
    valueChangeHandler: billingCountryChangeHandler,
  } = useInput(
    (value) => value !== "Country Selection" && value !== "",
    order.billingCountry
  );

  const {
    value: billingAddress,
    isValid: billingAddressIsValid,
    valueChangeHandler: billingAddressChangeHandler,
  } = useInput(
    (value) => value.trim() !== "" && value.length >= 25,
    order.billingAddress
  );

  const {
    value: billingPhone,
    isValid: billingPhoneIsValid,
    valueChangeHandler: billingPhoneChangeHandler,
  } = useInput(
    (value) => value.trim() !== "" && /^\d+$/.test(value) && value.length <= 13,
    order.billingPhoneNumber
  );

  const {
    value: deliveryCountry,
    isValid: deliveryCountryIsValid,
    valueChangeHandler: deliveryCountryChangeHandler,
  } = useInput(
    (value) => value !== "Country Selection" && value !== "",
    order.deliveryCountry
  );

  const {
    value: deliveryAddress,
    isValid: deliveryAddressIsValid,
    valueChangeHandler: deliveryAddressChangeHandler,
  } = useInput(
    (value) => value.trim() !== "" && value.length >= 30,
    order.deliveryAddress
  );

  const {
    value: deliveryPhone,
    isValid: deliveryPhoneIsValid,
    valueChangeHandler: deliveryPhoneChangeHandler,
  } = useInput(
    (value) => value.trim() !== "" && /^\d+$/.test(value) && value.length <= 13,
    order.deliveryPhoneNumber
  );

  const {
    value: deliveryDate,
    isValid: deliveryDateIsValid,
    valueChangeHandler: deliveryDateChangeHandler,
  } = useInput((value) => value !== "", order.deliveryDate);

  const { value: observations, valueChangeHandler: observationsChangeHandler } =
    useInput((value) => (value ? true : false), order.observations);

  let formIsValid = true;

  if (
    billingAddressIsChecked &&
    (!firstNameIsValid ||
      !lastNameIsValid ||
      !billingAddressIsValid ||
      !billingPhoneIsValid ||
      !billingCountryIsValid ||
      !deliveryDateIsValid)
  ) {
    formIsValid = false;
  } else if (
    !billingAddressIsChecked &&
    (!firstNameIsValid ||
      !lastNameIsValid ||
      !billingAddressIsValid ||
      !billingPhoneIsValid ||
      !deliveryAddressIsValid ||
      !deliveryPhoneIsValid ||
      !deliveryCountryIsValid ||
      !deliveryPhoneIsValid ||
      !deliveryDateIsValid)
  ) {
    formIsValid = false;
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
    firstName,
    firstNameIsValid,
    firstNameChangeHandler,
    lastName,
    lastNameIsValid,
    lastNameChangeHandler,
    billingCountry,
    billingCountryIsValid,
    billingCountryChangeHandler,
    billingAddress,
    billingAddressIsValid,
    billingAddressChangeHandler,
    billingPhone,
    billingPhoneIsValid,
    billingPhoneChangeHandler,
    deliveryCountry,
    deliveryCountryIsValid,
    deliveryCountryChangeHandler,
    deliveryAddress,
    deliveryAddressIsValid,
    deliveryAddressChangeHandler,
    deliveryPhone,
    deliveryPhoneIsValid,
    deliveryPhoneChangeHandler,
    deliveryDate,
    deliveryDateIsValid,
    deliveryDateChangeHandler,
    formIsValid,
    getCurrentDate,
    observations,
    observationsChangeHandler,
  };
};

export default useUpdateOrderInput;
