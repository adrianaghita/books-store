import { ReactNode, createContext, useContext, useState } from "react";

export interface Order {
  itemsNumber: number;
  orderPrice: number;
  orderId: number;
}

export interface OrderDetails {
  orderId: number;
  firstName: string;
  lastName: string;
  billingCountry: string;
  billingAddress: string;
  billingPhoneNumber: string;
  deliveryCountry: string;
  deliveryAddress: string;
  deliveryPhoneNumber: string;
  deliveryDate: string;
  observations: string;
}

interface OrdersContextType {
  orderHistory: Order[];
  orderDetails: OrderDetails[];
  placeOrder: (order: Order, orderDetails: OrderDetails) => void;
  updateOrder: (orderDetails: OrderDetails) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrdersContext = () => {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrdersContext must be used within a LoggedInProvider");
  }
  return context;
};

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);

  const placeOrder = (order: Order, orderDetails: OrderDetails) => {
    setOrderHistory((prevHistory) => [order, ...prevHistory]);
    setOrderDetails([orderDetails]);
  };

  const updateOrder = (orderDetails: OrderDetails) => {
    setOrderDetails((prevOrderDetails) => [orderDetails, ...prevOrderDetails]);
  };

  return (
    <OrdersContext.Provider
      value={{
        orderHistory,
        placeOrder,
        orderDetails,
        updateOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
