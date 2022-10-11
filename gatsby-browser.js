import CartProvider from "./src/providers/CartProdiver";
import Nav from './src/components/Nav'
import React from "react";
import { NextUIProvider } from '@nextui-org/react';

export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <NextUIProvider>
      <Nav />
      {element}
    </NextUIProvider>
  </CartProvider>
);
