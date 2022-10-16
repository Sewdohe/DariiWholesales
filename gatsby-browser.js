import CartProvider from "./src/providers/CartProdiver";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import theme from './src/styles/nextUITheme';

import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

import AuthProvider from "./src/components/AuthContext";

export const wrapRootElement = ({ element }) => (
    <AuthProvider>
      <CartProvider>
        <NextUIProvider theme={theme}>
          {element}
        </NextUIProvider>
      </CartProvider>
    </AuthProvider>
);
