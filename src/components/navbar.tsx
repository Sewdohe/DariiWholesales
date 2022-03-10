import * as React from 'react'
// import styled from "styled-components"

import { Navbar, Container, Nav } from 'react-bootstrap'

const Navigation = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Dari Wholesales</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#features'>Shop</Nav.Link>
            <Nav.Link href='#pricing'>Open Account</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
