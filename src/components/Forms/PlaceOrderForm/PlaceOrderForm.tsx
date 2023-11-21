import { Link } from "react-router-dom";
import { useShoppingCartContext } from "../../../context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { fetchCountries, Country } from "../../../services/CountriesService";
import FormsImage from "../FormsImage/FormsImage";
import styles from "./PlaceOrderForm.module.scss";
import {
  Order,
  OrderDetails,
  useOrdersContext,
} from "../../../context/OrdersContext";
import usePlaceOrderInput from "../../../hooks/usePlaceOrderInput";

const PlaceOrderForm = () => {
  const [countryList, setCountryList] = useState<Country[]>([]);

  const { emptyCart, itemsCounter, totalPrice } = useShoppingCartContext();
  const { placeOrder } = useOrdersContext();

  const {
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
  } = usePlaceOrderInput();

  const order: Order = {
    itemsNumber: itemsCounter,
    orderPrice: totalPrice,
    orderId: Date.now(),
  };

  const orderDetails: OrderDetails = {
    orderId: order.orderId,
    firstName: enteredFirstName,
    lastName: enteredLastName,
    billingCountry: enteredBillingCountry,
    billingAddress: enteredBillingAddress,
    billingPhoneNumber: enteredBillingPhone,
    deliveryCountry: enteredDeliveryCountry,
    deliveryAddress: enteredDeliveryAddress,
    deliveryPhoneNumber: enteredDeliveryPhone,
    deliveryDate: enteredDeliveryDate,
    observations: observations,
  };

  const handlePlaceOrder = () => {
    placeOrder(order, orderDetails);
  };

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchData = async () => {
      const countries = await fetchCountries();
      setCountryList(countries);
    };
    fetchData();
  }, []);

  return (
    <div className={styles[`place-order-details`]}>
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
              value={enteredFirstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              autoComplete="on"
            />

            {firstNameHasError && (
              <p className={styles[`form-error-message`]}>
                Please provide a valid first name
              </p>
            )}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={enteredLastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              autoComplete="on"
            />
            {lastNameHasError && (
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
              value={enteredBillingCountry}
              onChange={billingCountryChangeHandler}
              onBlur={billingCountryBlurHandler}
            >
              <option value="Country Selection">Country Selection</option>
              {countryList.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {billingCountryHasError && (
              <p className={styles[`form-error-message`]}>
                Please choose a country
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="Address"
              placeholder="Address"
              value={enteredBillingAddress}
              onChange={billingAddressChangeHandler}
              onBlur={billingAddressBlurHandler}
              autoComplete="on"
            />
            {billingAddressHasError && (
              <p className={styles[`form-error-message`]}>
                Please provide a valid address
              </p>
            )}
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={enteredBillingPhone}
              onChange={billingPhoneChangeHandler}
              onBlur={billingPhoneBlurHandler}
              autoComplete="on"
            />

            {billingPhoneHasError && (
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
                value={enteredDeliveryCountry}
                onChange={deliveryCountryChangeHandler}
                onBlur={deliveryCountryBlurHandler}
              >
                <option value="Country Selection">Country Selection</option>
                {countryList.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {deliveryCountryHasError && (
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
                value={enteredDeliveryAddress}
                onChange={deliveryAddressChangeHandler}
                onBlur={deliveryAddressBlurHandler}
                autoComplete="on"
              />
              {deliveryAddressHasError && (
                <p className={styles[`form-error-message`]}>
                  Please provide a valid address
                </p>
              )}
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={enteredDeliveryPhone}
                onChange={deliveryPhoneChangeHandler}
                onBlur={deliveryPhoneBlurHandler}
                autoComplete="on"
              />
              {deliveryPhoneHasError && (
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
            type="text"
            min={getCurrentDate()}
            placeholder="Delivery Date"
            onFocus={(e) => {
              e.target.type = "date";
            }}
            onBlur={(e) => {
              e.target.type = "date";
              deliveryDateBlurHandler();
            }}
            value={enteredDeliveryDate}
            onChange={deliveryDateChangeHandler}
          />
          {deliveryDateHasError && (
            <p className={styles[`form-error-message`]}>
              Please select a delivery date
            </p>
          )}
        </fieldset>

        <fieldset id="observationsSection">
          <legend id="observationsSectionLegend">Observations</legend>
          <textarea
            name="observations"
            placeholder="Observations"
            rows={3}
            value={observations}
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

          <Link to={"/"}>
            <button
              type="submit"
              className={
                formIsValid
                  ? styles[`form-button-dark`]
                  : styles[`form-button-disabled`]
              }
              onClick={() => {
                emptyCart();
                handlePlaceOrder();
              }}
              disabled={!formIsValid}
            >
              Place order
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrderForm;
