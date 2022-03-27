import React, {useEffect, useState} from "react";

import styled from "styled-components";
import { BsCart } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "gatsby";

import { CartContext } from "../contexts/CartContext";
import { CartContextType } from "../@types/cart";

import { ThemeContextType } from "../@types/theme";
import { ThemeContext } from "../contexts/themeContext";
import ThemeToggler from "./ThemeToggler";

const NavText = styled(Link)`
  color: rgba(0, 0, 0, 0.55);
  padding: 0.5rem;
  text-decoration: none;
`;

const Navigation = () => {
  const { cart, getTotalQty } = React.useContext(CartContext) as CartContextType;
  const { theme } = React.useContext(ThemeContext) as ThemeContextType;
  const [qty, setQty] = useState(getTotalQty);

  useEffect(() => {
    setQty(getTotalQty);
  }, [cart])

  return (
    <>
      <Navbar bg={theme} variant={theme}>
        <Container>
          <Navbar.Brand href="#home">Dari Wholesales</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="me-auto">
            <NavText to="/">Home</NavText>
            <NavText to="/shop">Shop</NavText>
            <NavText to="#pricing">Open Account</NavText>
          </Nav>
          <Nav>
            <NavText to="#cart" className="justify-content-end">
              <BsCart /> Cart ({qty})
            </NavText>
            <NavText to="#invoices" className="justify-content-end">
              <FaFileInvoice /> Invoices
            </NavText>
            {/* <ThemeToggler></ThemeToggler> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
