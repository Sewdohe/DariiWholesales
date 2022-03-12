import React from "react";
import { Card, Button } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import styled from "styled-components";
import { Product } from "../types/Types";
import { ThemeContextType, Theme } from "../@types/theme";
import { ThemeContext } from "../contexts/themeContext";

interface Props {
  item: Product;
}

const PriceText = styled.span`
  color: green;
  font-weight: bold;
  font-size: 1.3rem;
`


export const ProductCard = ({ item }: Props) => {
  const { theme, changeTheme } = React.useContext(
    ThemeContext
  ) as ThemeContextType;

  return (
    <>
      <Card bg={theme} text={theme == 'light' ? 'dark' : 'light'} style={{ margin: "12px 12px" }}>
        {item.node.images.length > 0 ? (
          <Card.Img variant="top" width="250" height="250" src={item.node.images[0].src} />
        ) : (
          <span>no image</span>
        )}
        <Card.Body>
          <Card.Title>{item.node.name}</Card.Title>
          <Card.Text>
            {/* Using price * 1 to remove the trailing zeros from the number returned from wordpress */}
            <PriceText>${item.node.price * 1}</PriceText> 
          </Card.Text>
          <Button variant="primary">View Item</Button>
        </Card.Body>
      </Card>
    </>
  );
};
