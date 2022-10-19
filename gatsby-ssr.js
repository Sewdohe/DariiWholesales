import CartProvider from "./src/providers/CartProdiver";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import {lightTheme, darkTheme} from './src/styles/nextUITheme';
import "./src/styles/global.css"

import AuthProvider from "./src/components/AuthContext";

import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

export const wrapRootElement = ({ element }) => (
    <AuthProvider>
        <CartProvider>
            <NextUIProvider theme={lightTheme}>
                {element}
            </NextUIProvider>
        </CartProvider>
    </AuthProvider>
);
