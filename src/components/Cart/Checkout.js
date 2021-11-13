import styles from "./Checkout.module.css";
import { useState, useRef } from "react";

const Checkout = (props) => {
  const nameIn = useRef();
  const streetIn = useRef();
  const cityIn = useRef();
  const codeIn = useRef();

  const [userForm, setUserForm] = useState({
    name: "a",
    street: "a",
    city: "a",
    postalCode: "aaaaa",
  });

  const submitHandler = (event) => {
    event.preventDefault();

    setUserForm({
      name: nameIn.current.value,
      street: streetIn.current.value,
      city: cityIn.current.value,
      postalCode: codeIn.current.value,
    });

    if (
      nameIn.current.value.trim() !== "" &&
      streetIn.current.value.trim() !== "" &&
      cityIn.current.value.trim() !== "" &&
      codeIn.current.value.trim().length === 5
    ) {
      //submit
      props.onSubmit({
        name: nameIn.current.value,
        street: streetIn.current.value,
        city: cityIn.current.value,
        postalCode: codeIn.current.value,
      });
    } else {
      return;
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div
        className={`${styles.control} ${
          userForm.name.trim() !== "" ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Your name:</label>
        <input type="text" id="name" ref={nameIn} />
        {userForm.name.trim() === "" && <p>Please enter a valid name!</p>}
      </div>
      <div className={styles.control}>
        <b>Your address</b>
      </div>
      <div
        className={`${styles.control} ${
          userForm.street.trim() !== "" ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Street:</label>
        <input type="text" id="street" ref={streetIn} />
        {userForm.street.trim() === "" && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${styles.control} ${
          userForm.postalCode.trim().length === 5 ? "" : styles.invalid
        }`}
      >
        <label htmlFor="code">Postal code:</label>
        <input type="text" id="code" ref={codeIn} />
        {userForm.postalCode.trim().length !== 5 && (
          <p>Please enter a valid Postal code!</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          userForm.city.trim() !== "" ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">City:</label>
        <input type="text" id="city" ref={cityIn} />
        {userForm.city.trim() === "" && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Confirm
        </button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
