import CartProvider from "./src/providers/CartProdiver";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { lightTheme, darkTheme } from './src/styles/nextUITheme';
import "./src/styles/global.css"
import useDarkMode from 'use-dark-mode';

import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

import AuthProvider from "./src/components/AuthContext";

const darkMode = useDarkMode(false);

export const wrapRootElement = ({ element }) => (
    <AuthProvider>
      <CartProvider>
            <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
          {element}
        </NextUIProvider>
      </CartProvider>
    </AuthProvider>
);
