import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";

import CartContext from "../contexts/CartContext";
import { CartContextType, } from "../@types/cart";
import { FirebaseCartLine } from "../providers/CartProdiver";
import { Table, Loading, } from "@nextui-org/react";

const CartPage = () => {
  const { cart, total } = useContext(CartContext) as CartContextType;
  // Leaving this here in case I let the user edit the cart on this page
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  return (
    <Layout>
      {cart ? (
        <Table css={{ height: "auto", minWidth: "100%" }}>
        <Table.Header>
          <Table.Column>Item Name</Table.Column>
          <Table.Column>Type/Flavor</Table.Column>
          <Table.Column>Quantity</Table.Column>
        </Table.Header>
        <Table.Body>
          {cart ? (
            cart.map((line: FirebaseCartLine) => {
              return (
                <Table.Row key={line.id + line.variation}>
                  <Table.Cell>{line.itemName}</Table.Cell>
                  <Table.Cell>{line.variation}</Table.Cell>
                  <Table.Cell>{line.quantity}</Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <p></p>
          )}
        </Table.Body>
      </Table>
      ) : <Loading></Loading>}
    </Layout >
  );
};

export default CartPage;
