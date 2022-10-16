import React from "react";
import CartContext from "../contexts/CartContext";
import { Product } from "../@types/product";
import { Cart, CartLine } from "../@types/cart";

import { useAuthValue } from "../components/AuthContext";
import { db } from "../components/Firebase";
import { updateDoc, doc, arrayUnion, onSnapshot } from "firebase/firestore";

interface FirebaseCartLine {
  itemName: string,
  quantity: number,
  variation: string[] | undefined
  id: string
}

interface FirebaseCart extends Array<FirebaseCartLine>{}

const CartProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [cart, updateCart] = React.useState<Cart>([]);

  const { currentUser } = useAuthValue();

  let cartData: FirebaseCart;

  if(currentUser) { // if user is logged in, then get cart data from firebase
    const unSub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      let data = doc.data()
      cartData = data?.cart;
      console.log('Cart Data: ', cartData)
    })
  }


  // This function is a doozy. Lemme document this bytch...
  const addToCart = (
    newItem: Product,
    qty: number,
    variation: string[] | undefined
  ) => {
    updateCart((prevValue: Cart) => {
      // Convert passed variables into the CartLine type
      let newLine: CartLine = {
        product: newItem,
        qty: qty,
        variation: variation,
      };

      const existingIndex: number = cartData.findIndex((cart) => {
        // get the index of the item in the cart array
        // if the user has already added it to their cart.
        return cart.id == newItem.id;
      });

      if (existingIndex == -1) {
        // if eI == -1 than we didn't find the item in the cart already.
        // this is a new item, so add it as a new cart-line.
        console.log("fresh item, added to the cart.");
        console.log(variation)
        let newCart = cart.slice();
        newCart.push(newLine);

        console.log("sending new cart line to firebase")
        if(currentUser) {
          let docRef = doc(db, "users", currentUser.uid)
          updateDoc(docRef, {
            cart: arrayUnion({ itemName: newItem.name, id: newItem.id, quantity: qty, variation: variation })
          })
        }
        return newCart; // so, we return the old cart + the new cart line
      } else {
        // we found the item in the cart.
        // we will be modifying it in some way, so create a copy using slice
        let newCart = cart.slice();

        // we have to do a find index again, narrowing it down to the attrib this time
        const attribIndex = cartData.findIndex((cart) => {
          return (
            cart.variation![0] == variation![0] &&
            cart.variation![1] == variation![1] &&
            cart.variation![2] == variation![2] &&
            cart.variation![3] == variation![3]
          );
        });

        if (attribIndex != -1) {
          // if we land here, this variation is already in the cart. Adjust qty only.
          newCart[attribIndex].qty = prevValue[attribIndex].qty + qty;

          console.log("sending cart to firebase")
          if(currentUser) {
            let docRef = doc(db, "users", currentUser.uid)
            updateDoc(docRef, {
              cart: arrayUnion({ itemName: newItem.name, id: newItem.id, quantity: qty, variation: variation })
            })
          }
          return newCart;
        } else {
          // this variation doesn't exist already. treat as a new line.
          newCart = [...prevValue, newLine];
          console.log("sending cart to firebase")
          if(currentUser) {
            let docRef = doc(db, "users", currentUser.uid)
            updateDoc(docRef, {
              cart: arrayUnion({ itemName: newItem.name, id: newItem.id, quantity: qty, variation: variation })
            })
          }
          return newCart;
        }
      }
    });
  };

  const getCartTotal = () => {
    let total = 0;
    if (cart?.length) {
      // make sure the cart isn't undefined
      cart.forEach((line: CartLine) => {
        total = total + line.qty;
      });
    }
    return total;
  };

  return (
    <CartContext.Provider
      value={{ cart: cart, addToCart: addToCart, getTotalQty: getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
