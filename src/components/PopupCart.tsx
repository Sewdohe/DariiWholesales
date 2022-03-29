import React, { useContext, useState, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import { CartContextType, CartLine } from "../@types/cart";

import Box from "@mui/material/Box";
import Badge from '@mui/material/Badge';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";

export const PopupCart = () => {
  const { cart, getTotalQty } = useContext(CartContext) as CartContextType;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setQty(getTotalQty);
  }, [cart]);
  const [qty, setQty] = useState(getTotalQty);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // TODO: make this component use a data table. preferrably,
  // the component should have buttons to increment/decrement the quantity

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <Badge badgeContent={qty} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: "300px", height: "500px" }}>
          <List dense>
            {cart.map((line: CartLine) => {
              return (
                <ListItem
                  sx={{ fontSize: 10 }}
                  key={line.product.id + line.variation}
                >
                  {line.product.name} | {line.variation} | x{line.qty}
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
      </Popover>
    </div>
  );
};
