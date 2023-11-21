import OrderItem from "../OrderItem/OrderItem";
import { TbTruckDelivery } from "react-icons/tb";

import styles from "./OrdersList.module.scss";
import { DeliveryStatus } from "../OrderItem/OrderItem";
import { Order, useOrdersContext } from "../../../context/OrdersContext";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { orderHistory } = useOrdersContext();
  return (
    <div className={styles[`order-list`]}>
      {orderHistory.length === 0 ? (
        <div className={styles[`empty-list`]}>
          <h2>
            You have not placed any orders.
            <TbTruckDelivery className={styles.icon} />
          </h2>
          <Link to={"/"}>
            <button className={styles[`cart-button-bright`]}>
              View the products
            </button>
          </Link>
        </div>
      ) : (
        <h2 className={styles[`order-list-title`]}>Your Products</h2>
      )}
      {orderHistory.map((order: Order) => (
        <OrderItem
          orderNumber={order.orderId}
          deliveryStatus={DeliveryStatus.InProgress}
          numOfItems={order.itemsNumber}
          orderPrice={order.orderPrice}
          key={order.orderId}
        />
      ))}
    </div>
  );
};

export default OrderList;
