import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShown, setCart] = useState(false);
  
  const shownCartHandler = () => {
    setCart(true);
  };

  const hideCartHandler = () => {
    setCart(false);
  };

  return (
    <CartProvider>
      {cartShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={shownCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
