import React, { useEffect } from "react";
import CartContext from "../contexts/CartContext";
import { Product } from "../@types/product";

import { useAuthValue } from "../components/AuthContext";
import { db } from "../components/Firebase";
import {
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

export interface FirebaseCartLine {
  itemName: string;
  quantity: number;
  variation: string[] | undefined;
  id: string;
}

export interface FirebaseCart extends Array<FirebaseCartLine> {}

const CartProvider: React.FC<React.ReactNode> = ({ children }) => {
  const { currentUser } = useAuthValue();

  const [cart, updateCart] = React.useState<FirebaseCart | null>(null);
  const [cartTotal, setCartTotal] = React.useState<number>(0);

  useEffect(() => {
    if (currentUser) {
      const unSub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        console.log("cart init!");
        let data = doc.data();
        updateCart(data?.cart);
        getCartTotal();
      });
    }
  }, [currentUser]);

  // This function is a doozy. Lemme document this bytch...
  const addToCart = (
    newItem: Product,
    qty: number,
    variation: string[] | undefined
  ) => {
    let prevValue = cart;

    // Convert passed variables into the CartLine type
    let newLine: FirebaseCartLine = {
      itemName: newItem.name,
      quantity: qty,
      variation: variation,
      id: newItem.id,

    };

    const existingIndex: number | undefined = cart?.findIndex((cart) => {
      // get the index of the item in the cart array
      // if the user has already added it to their cart.
      return cart.id == newItem.id;
    });
    console.log(existingIndex == -1 ? 'Item is a new line, no variations' : 'the item is already in the cart')

    if (existingIndex == -1 && cart) {
      console.log('adding new item line')
      // if eI == -1 than we didn't find the item in the cart already.
      // this is a new item, so add it as a new cart-line.
      console.log("fresh item, added to the cart.");
      console.log(variation);
      let newCart = cart!.slice();
      newCart.push(newLine);

      if (currentUser) {
        // ensure we don't write the same thing to the databse and start "the loop"
        let docRef = doc(db, "users", currentUser.uid);
        updateDoc(docRef, {
          cart: arrayUnion({
            itemName: newItem.name,
            id: newItem.id,
            quantity: qty,
            variation: variation,
          }),
        }).then(() => {
          console.log("item push successful!");
        }).catch((e) => console.error(e));
      } else {
        console.log("user is not logged in or cart is the same");
      }
    } else {
      console.log('item is in the cart, so its a new variation or a qty adjustment')
      // we found the item in the cart.
      // we will be modifying it in some way, so create a copy using slice
      let newCart = cart!.slice();

      // we have to do a find index again, narrowing it down to the attrib this time
      const attribIndex = cart!.findIndex((cart) => {
        return (
          cart.variation![0] == variation![0] &&
          cart.variation![1] == variation![1] &&
          cart.variation![2] == variation![2] &&
          cart.variation![3] == variation![3]
        );
      });

      if (attribIndex != -1) {
        // if we land here, this variation is already in the cart. Adjust qty only.
        console.log('this is a qty adjustment on a variation')
        newCart[attribIndex].quantity = prevValue![attribIndex].quantity + qty;

        console.log("sending cart to firebase");
        if (currentUser && prevValue != newCart) {
          let docRef = doc(db, "users", currentUser.uid);
          updateDoc(docRef, {
            cart: newCart
          }).then(() => {
            console.log("item push successful!");
          });
        }
      } else {
        // this variation doesn't exist already. treat as a new line.
        newCart = [...prevValue!, newLine];
        console.log("sending cart to firebase", newCart);
        if (currentUser && prevValue != newCart) {
          let docRef = doc(db, "users", currentUser.uid);
          updateDoc(docRef, {
            cart: newCart
          }).then(() => {
            console.log("item push successful!");
          });
        }
      }
    }
  };

  const getCartTotal = () => {
    let total = 0;
    if (cart?.length) {
      // make sure the cart isn't undefined
      cart.forEach((line: FirebaseCartLine) => {
        total = total + line.quantity;
      });
    }
    setCartTotal(total);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addToCart: addToCart,
        total: cartTotal,
        getTotal: getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
