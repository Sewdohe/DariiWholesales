import React from "react";
import { Product, Products } from "./product";

export type CartContextType = {
  cart: Cart;
  addToCart: (item: Product, qty: number, variation?: string[]) => void;
  getTotalQty: () => number
};

export interface CartLine {
  product: Product,
  qty: number,
  variation: string[] | undefined
}

export interface Cart extends Array<CartLine> {};