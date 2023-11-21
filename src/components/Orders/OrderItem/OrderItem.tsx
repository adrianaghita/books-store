import { Link } from "react-router-dom";
import Book from "../../../assets/OrdersIcons/icons8-book.svg";
import Edit from "../../../assets/OrdersIcons/icons8-edit.svg";
import styles from "./OrderItem.module.scss";

interface OrderItemProps {
  orderNumber: number;
  deliveryStatus: string;
  numOfItems: number;
  orderPrice: number;
}

export const DeliveryStatus = {
  InProgress: "In Progress",
  Delivered: "Delivered",
  Shipped: "Completed",
};

const OrderItem = ({
  orderNumber,
  deliveryStatus,
  numOfItems,
  orderPrice,
}: OrderItemProps) => {
  return (
    <article className={styles[`order-item`]}>
      <section className={styles[`order-item-image`]}>
        <img src={Book} alt="Book icon" />
      </section>
      <section>
        <h3 className={styles[`order-item-number`]}>Order #{orderNumber}</h3>
        <p className={styles[`order-item-number-of-items`]}>
          Items: <span>{numOfItems}</span>
        </p>
        <p className={styles[`order-item-delivery-status`]}>
          Delivery Status: <span>{deliveryStatus}</span>
        </p>
      </section>
      <section className={styles[`order-item-price-container`]}>
        <p className={styles[`order-item-price`]}> {`$ ${orderPrice}`}</p>
        {deliveryStatus === DeliveryStatus.InProgress ? (
          <Link to={`/updateOrder/${orderNumber}`}>
            <button className={styles[`order-item-action`]}>
              <img
                src={Edit}
                alt="icon"
                className={styles[`order-item-action-icon`]}
              />
              Edit Order Details
            </button>
          </Link>
        ) : (
          ""
        )}
      </section>
    </article>
  );
};

export default OrderItem;
