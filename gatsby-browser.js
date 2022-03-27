import ThemeProvider from "./src/providers/ThemeProvider";
import CartProvider from "./src/providers/CartProdiver";
import React from "react";


export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <ThemeProvider>
      {element}
    </ThemeProvider>
  </CartProvider>
);
