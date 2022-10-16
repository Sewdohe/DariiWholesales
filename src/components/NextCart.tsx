import React, { useContext, useState, useEffect } from "react";
import { navigate } from "gatsby";
import CartContext from "../contexts/CartContext";
import { CartContextType, CartLine } from "../@types/cart";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Button, Badge, Modal, Text, Table } from "@nextui-org/react";

export const NextCart = () => {
  // CART VARIABLES
  const { cart, getTotalQty } = useContext(CartContext) as CartContextType;
  const [qty, setQty] = useState(getTotalQty);
  useEffect(() => {
    setQty(getTotalQty);
  }, [cart]);

  // MODAL VARIABLES
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Button light auto color="secondary" onPress={handler}>
        Cart
      </Button>
      <Modal width="60%" blur closeButton open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text css={{ fontSize: "1.5rem" }}>Shopping Cart</Text>
        </Modal.Header>

        <Modal.Body>
          <Table css={{ height: "auto", minWidth: "100%" }}>
            <Table.Header>
              <Table.Column>Item Name</Table.Column>
              <Table.Column>Type/Flavor</Table.Column>
              <Table.Column>Quantity</Table.Column>
            </Table.Header>
            <Table.Body>
              {/* IF CART HAS ITEMS */}
              {cart.map((line: CartLine) => {
                return (
                  <Table.Row key={line.product.id}>
                    <Table.Cell>{line.product.name}</Table.Cell>
                    <Table.Cell>{line.variation}</Table.Cell>
                    <Table.Cell>{line.qty}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>

          {/* IF CART IS EMPTY */}
          {cart.length != 0 ? null : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                css={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              >
                your cart is empty
              </Text>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onPress={() => navigate("/cart")}>View Cart</Button>
          <Button color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
