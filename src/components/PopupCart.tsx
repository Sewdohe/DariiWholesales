import React, {useContext} from 'react'
import CartContext from "../contexts/CartContext";
import { CartContextType } from "../@types/cart";
import { Product } from '../@types/product';

export const PopupCart = () => {
  const { cart } = useContext(CartContext) as CartContextType;
  return (
    <ul>
      {cart.map((product: Product) => {
        return (
          <li>{product.name}</li>
        )
      })}
    </ul>
  )
}
