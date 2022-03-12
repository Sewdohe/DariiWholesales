import * as React from "react";
import styled from "styled-components"
import { BsCart } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa"

import { Navbar, Container, Nav } from "react-bootstrap";
import { Theme } from "../@types/theme";
import ThemeToggler from "./ThemeToggler";

const NavText = styled(Nav.Link)`
  margin: 0px 6px;
`

interface Props {
  theme?: Theme;
}

const Navigation = ({theme}: Props) => {
  return (
    <>
      <Navbar bg={theme} variant={theme}>
        <Container>
          <Navbar.Brand href="#home">Dari Wholesales</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="#pricing">Open Account</Nav.Link>
          </Nav>
          <Nav>
            <NavText href="#cart" className="justify-content-end">
              <BsCart /> Cart
            </NavText>
            <NavText href="#invoices" className="justify-content-end">
              <FaFileInvoice /> Invoices
            </NavText>
            <ThemeToggler></ThemeToggler>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
