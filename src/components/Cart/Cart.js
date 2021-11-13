import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import React from "react";

const Cart = (props) => {
  const baseURL_FB =
    "https://pragmatic-star-317122-default-rtdb.europe-west1.firebasedatabase.app/orders.json";

  const cartCtx = useContext(CartContext);

  const [show, setShow] = useState(false);
  const [submitting, isSubmitting] = useState(false);
  const [submited, isSubmited] = useState(false);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setShow(true);
  };

  async function submitHandler(userData) {
    isSubmitting(true);
    const response = await fetch(baseURL_FB, {
      method: "POST",
      body: JSON.stringify({
        ...userData,
        ordered: cartCtx.items,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    isSubmitting(false);
    isSubmited(true);
    console.log(data);
    cartCtx.clearCart();
  }

  const modalContent = (
    <React.Fragment>
      {!show && (
        <ul className={styles["cart-items"]}>
          {cartCtx.items.map((x) => (
            <CartItem
              key={x.id}
              onRemove={cartItemRemoveHandler.bind(null, x.id)}
              onAdd={cartItemAddHandler.bind(null, x)}
              name={x.name}
              amount={x.amount}
              price={x.price}
            />
          ))}
        </ul>
      )}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {show && (
        <Checkout onCancel={props.onHideCart} onSubmit={submitHandler} />
      )}
      {!show && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems > 0 && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!submitting && !submited && modalContent}
      {submitting && <p>Your order is being processed!</p>}
      {!submitting && submited && (
        <p>Your orded is submitted and is on its way!</p>
      )}
    </Modal>
  );
};

export default Cart;
