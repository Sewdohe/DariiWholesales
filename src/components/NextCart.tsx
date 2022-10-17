import React, { useContext, useEffect } from "react";
import { navigate } from "gatsby";
import CartContext from "../contexts/CartContext";
import { CartContextType } from "../@types/cart";

import { Button, Modal, Text, Table, Loading } from "@nextui-org/react";
import { FirebaseCartLine } from "../providers/CartProdiver";
import { useAuthValue } from "../components/AuthContext";

export const NextCart = () => {
  const { currentUser } = useAuthValue();

  // CART VARIABLES
  const { cart, total, getTotal } = useContext(CartContext) as CartContextType;

  // MODAL VARIABLES
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  useEffect(() => {
      getTotal();
  }, [ cart, currentUser ])

  return (
    <div>
      {cart ? (
        <div>
          <Button light auto color="secondary" onPress={handler}>
            Cart ({total})
          </Button>
          <Modal
            width="60%"
            blur
            closeButton
            open={visible}
            onClose={closeHandler}
          >
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
                    <p>nothing</p>
                  )}
                </Table.Body>
              </Table>
            </Modal.Body>

            <Modal.Footer>
              <Button onPress={() => navigate("/cart")}>View Cart</Button>
              <Button color="error" onPress={closeHandler}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
