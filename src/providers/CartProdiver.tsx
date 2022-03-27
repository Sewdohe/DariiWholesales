import React, {useEffect, useState} from 'react';
import CartContext  from '../contexts/CartContext';
import { Products, Product } from '../@types/product';
import { Cart, CartContextType, CartLine } from '../@types/cart';
import { arrayBuffer } from 'stream/consumers';

const CartProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [cart, updateCart] = React.useState<Cart>([]);

  // This function is a doozy. Lemme document this bytch...
  const addToCart = (newItem: Product, qty: number, variation: string) => {
    updateCart((prevValue: Cart) => {
      let newLine: CartLine = {product: newItem, qty: qty, variation: variation }; // aggregate the passed variables into an object of CarLine type
      const existingIndex: number = prevValue.findIndex((prevvalue) => {
        // get the index of the item in the cart array
        // if the user has already added it to thier cart.
        return prevvalue.product.id == newItem.id;
        // TODO: Check the flavor on the item, and if it's a new flavor then
        // add it as a new cart item.
      })
      if(existingIndex == -1) {
        // if eI == -1 than we didn't find the item in the cart already.
        console.log("fresh item, added to the cart.")
        return [...prevValue, newLine]; // so, we return the old cart + the new cart line
      } else {
        // we found the item in the cart.
        const newCart = cart.slice(); // so we create a copy of the cart
        console.log("Current existing item index is: " + existingIndex) 
        newCart[existingIndex].qty = prevValue[existingIndex].qty + qty; // then modify the qty variable of the cart line
        return [ ...newCart ] // ...and return the new cart
      }
    })
    console.log("new Cart:")
    console.log(cart)
  }

  const getCartTotal = () => {
    let total = 0;
    if(cart?.length) { // make sure the cart isn't undefined
      cart.forEach((line: CartLine) => {
        total = total + line.qty; // add to the total items variable for each invoice line.
      })
    }
    return total;
  }
  
  
  return (
    <CartContext.Provider value={{ cart: cart, addToCart: addToCart, getTotalQty: getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider