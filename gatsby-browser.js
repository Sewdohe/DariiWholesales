import ThemeProvider from "./src/providers/ThemeProvider";
import CartProvider from "./src/providers/CartProdiver";
import Navbar from './src/components/Navbar';
import React from "react";


export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <ThemeProvider>
      <Navbar />
      {element}
    </ThemeProvider>
  </CartProvider>
);
