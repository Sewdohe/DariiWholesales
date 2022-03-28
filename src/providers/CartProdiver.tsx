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
        let newCart = cart.slice(); 
        newCart.push(newLine)
        console.log(newCart)
        return newCart // so, we return the old cart + the new cart line
      } else {

        // we found the item in the cart.
        // we will be modifying it in some way, so create a copy
        let newCart = cart.slice(); // so we create a copy of the cart
        // we have to do a find index again, narrowing it down to the attrib this time
        const attribIndex = prevValue.findIndex((prevvalue) => {
          return prevvalue.variation == variation;
        })

        if(attribIndex != -1) {
          // if we land here, this variation is alreay in the cart. Adjust qty.
          console.log("Current existing item index is: " + attribIndex) 
          console.log("variation is the same...adding qty")
          newCart[attribIndex].qty = prevValue[attribIndex].qty + qty;
          console.log(newCart)
          return newCart
        } else {
          // this variation doesn't exist already. treat as a new line.
          console.log("Current existing item index is: " + attribIndex)
          console.log("variation is new...adding new line")
          newCart = [...prevValue, newLine]
          console.log(newCart)
          return newCart;
        }
      }
    })
    console.log("new Cart:")
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