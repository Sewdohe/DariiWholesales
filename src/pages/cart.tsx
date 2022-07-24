import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";

import Box from "@mui/material/Box";
import CartContext from "../contexts/CartContext";
import { CartContextType, CartLine } from "../@types/cart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";

const CartPage = () => {
  const { cart, getTotalQty } = useContext(CartContext) as CartContextType;
  // Leaving this here in case I let the user edit the cart on this page
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  return (
    <Layout>
      <Box>
        <List dense>
          {cart.map((line: CartLine) => {
            return (
              <ListItem
                sx={{ fontSize: '1.2rem' }}
                key={line.product.id + line.variation}
              >
                {line.product.name} | {line.variation[0]} | x{line.qty}
              </ListItem>
            );
          })}
          {cart.length != 0 ? null : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 'bold',
                  fontSize: '1.4rem'
                }}
              >
                your cart is empty
              </Typography>
            </div>
          )}
        </List>
      </Box>
    </Layout>
  );
};

export default CartPage;
