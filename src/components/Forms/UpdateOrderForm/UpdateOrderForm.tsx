import { Link, useParams } from "react-router-dom";
import styles from "./UpdateOrderForm.module.scss";
import { useEffect, useState } from "react";
import { Country, fetchCountries } from "../../../services/CountriesService";
import Alert from "../Alert/Alert";
import useUpdateOrderInput from "../../../hooks/useUpdateOrderInput";
import { OrderDetails, useOrdersContext } from "../../../context/OrdersContext";
import FormsImage from "../FormsImage/FormsImage";
import usePlaceOrderInput from "../../../hooks/usePlaceOrderInput";

const UpdateOrderForm = () => {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const { orderDetails } = useOrdersContext();
  const { orderId } = useParams<{ orderId?: string }>();
  const parsedBookId = orderId ? parseInt(orderId, 10) : undefined;
  const order = orderDetails.find((order) => order.orderId === parsedBookId);
  if (!order) {
    return <h1>Order not found</h1>;
  }

  const { billingAddressIsChecked, toggleDeliveryAddress } =
    usePlaceOrderInput();

  const {
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
  } = useUpdateOrderInput(order);

  const updatedDetails: OrderDetails = {
    orderId: order.orderId,
    firstName: firstName,
    lastName: lastName,
    billingCountry: billingCountry,
    billingAddress: billingAddress,
    billingPhoneNumber: billingPhone,
    deliveryCountry: deliveryCountry,
    deliveryAddress: deliveryAddress,
    deliveryPhoneNumber: deliveryPhone,
    deliveryDate: deliveryDate,
    observations: observations,
  };

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleUpdateClick = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const countries = await fetchCountries();
      setCountryList(countries);
    };
    fetchData();
  }, []);

  return (
    <div className={styles[`update-order`]}>
      <FormsImage />
      <form
        className={styles.form}
        name="OrderDetailsForm"
        onSubmit={formSubmissionHandler}
      >
        <h2 className={styles[`form-title`]}>Order Details</h2>
        <fieldset name="contactDetails">
          <legend id="contactDetailsLegend">Contact Details</legend>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={firstNameChangeHandler}
              autoComplete="on"
            />
            {!firstNameIsValid && (
              <p className={styles[`form-error-message`]}>
                Please provide a valid first name
              </p>
            )}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={lastNameChangeHandler}
              autoComplete="on"
            />
            {!lastNameIsValid && (
              <p className={styles[`form-error-message`]}>
                Please provide a valid last name
              </p>
            )}
          </div>
        </fieldset>
        <fieldset name="billingAddress">
          <legend id="billingAddressLegend">Billing Address</legend>
          <div>
            <select
              name="Country Selection"
              value={billingCountry}
              onChange={billingCountryChangeHandler}
            >
              <option value="Country Selection">
                {order.billingCountry
                  ? order.billingCountry
                  : "Country Selection"}
              </option>
              {countryList.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {!billingCountryIsValid && (
              <p className={styles[`form-error-message`]}>
                Please choose a country
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="billingAddress"
              placeholder="Address"
              value={billingAddress}
              onChange={billingAddressChangeHandler}
              autoComplete="on"
            />
            {!billingAddressIsValid && (
              <p className={styles[`form-error-message`]}>
                Please provide a valid address
              </p>
            )}
            <input
              type="tel"
              name="billingPhone"
              placeholder="Phone Number"
              value={billingPhone}
              onChange={billingPhoneChangeHandler}
              autoComplete="on"
            />
            {!billingPhoneIsValid && (
              <p className={styles[`form-error-message`]}>
                Please enter a valid phone number.
              </p>
            )}
            <div>
              <input
                type="checkbox"
                id="useBillingForDelivery"
                checked={billingAddressIsChecked}
                onChange={toggleDeliveryAddress}
              />
              <label htmlFor="useBillingForDelivery" id="useBillingForDelivery">
                Use address for delivery
              </label>
            </div>
          </div>
        </fieldset>
        {!billingAddressIsChecked && (
          <fieldset id="deliveryAddress">
            <legend id="deliveryAddressLegend">Delivery Address</legend>
            <div>
              <select
                name="Country Selection"
                value={deliveryCountry}
                onChange={deliveryCountryChangeHandler}
              >
                <option value="Country Selection">
                  {order.deliveryCountry
                    ? order.deliveryCountry
                    : "Country Selection"}
                </option>
                {countryList.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {!deliveryCountryIsValid && (
                <p className={styles[`form-error-message`]}>
                  Please choose a country
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="deliveryAddress"
                placeholder="Address"
                value={deliveryAddress}
                onChange={deliveryAddressChangeHandler}
                autoComplete="on"
              />
              {!deliveryAddressIsValid && (
                <p className={styles[`form-error-message`]}>
                  Please provide a valid address
                </p>
              )}
              <input
                type="tel"
                name="deliveryPhone"
                placeholder="Phone Number"
                value={deliveryPhone}
                onChange={deliveryPhoneChangeHandler}
                autoComplete="on"
              />
              {!deliveryPhoneIsValid && (
                <p className={styles[`form-error-message`]}>
                  Please enter a valid phone number.
                </p>
              )}
            </div>
          </fieldset>
        )}
        <fieldset id="paymentSelection">
          <legend id="paymentSelectionLegend">Payment Type</legend>
          <input
            type="radio"
            id="onlinePayment"
            name="paymentType"
            defaultChecked
          />
          <label htmlFor="onlinePayment" id="onlinePaymentLabel">
            Online
          </label>
          <input type="radio" id="cashPayment" name="paymentType" />
          <label htmlFor="cashPayment" id="cashPaymentLabel">
            Cash
          </label>
        </fieldset>
        <fieldset id="deliveryDateSelection">
          <legend id="deliveryDateLegend">Delivery Date</legend>
          <input
            name="deliveryDate"
            type="text"
            min={getCurrentDate()}
            placeholder={order.deliveryDate}
            onFocus={(e) => {
              e.target.type = "date";
            }}
            onBlur={(e) => {
              e.target.type = order.deliveryDate;
            }}
            value={deliveryDate}
            onChange={deliveryDateChangeHandler}
          />
          {!deliveryDateIsValid && (
            <p className={styles[`form-error-message`]}>
              Please select a delivery date
            </p>
          )}
        </fieldset>
        <fieldset id="observationsSection">
          <legend id="observationsSectionLegend">Observations</legend>
          <textarea
            placeholder="Observations"
            rows={3}
            value={observations}
            name="Observations"
            onChange={observationsChangeHandler}
          ></textarea>
        </fieldset>
        <fieldset id="RecommendationSection">
          <legend id="recommendationSectionLegend">
            Would You Recommend Us?
          </legend>
          <input type="checkbox" id="recommendation" />
          <label htmlFor="recommendation" id="recommendation">
            Would you recommend us?
          </label>
        </fieldset>
        <div className={styles[`form-buttons`]}>
          <Link to={"/cart"}>
            <button type="button" className={styles[`form-button-bright`]}>
              Cancel Order
            </button>
          </Link>
          <button
            type="submit"
            className={
              formIsValid
                ? styles[`form-button-dark`]
                : styles[`form-button-disabled`]
            }
            onClick={() => {
              handleUpdateClick();
            }}
            disabled={!formIsValid}
          >
            Update Order
          </button>
          {showAlert && (
            <Alert
              title="Confirmation"
              message="Confirm order details changes?"
              updatedDetails={updatedDetails}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
