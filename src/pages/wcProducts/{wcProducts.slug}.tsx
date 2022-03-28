import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { Product, Products } from "../../@types/product";
import styled from "styled-components";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
// @ts-ignore
import CounterInput from "react-bootstrap-counter";
import { CartContext } from "../../contexts/CartContext";
import { CartContextType } from "../../@types/cart";
import { PopupCart } from "../../components/PopupCart";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

interface Data {
  data: {
    wcProducts: Product;
  };
}

const PriceText = styled.span`
  font-size: 1.6rem;
  color: red;
  font-weight: bold;
`;

const ProductTemplate: React.FC<Data> = ({ data }: Data) => {
  const { wcProducts: product } = data;
  let hasAttributes;
  const { cart: products, addToCart } = React.useContext(
    CartContext
  ) as CartContextType;
  const [qty, setQty] = useState(1);
  const [attrib, setAttrib] = useState(
    product.product_variations
      ? product.product_variations[0].attributes[0].option
      : ""
  );

  // @ts-ignore
  product.product_variations.length != 0
    ? (hasAttributes = true)
    : (hasAttributes = false);

  const addItemToCart = () => {
    addToCart(product, qty, attrib);
  };

  return (
    <Layout>
      {console.log(product.attributes)}
      <h1>{product.name}</h1>
      <div>
        {product.images.length > 0 ? (
          <img
            style={{ maxWidth: "175px", maxHeight: "175px" }}
            src={product.images[0].src}
          />
        ) : (
          <span>no image</span>
        )}
      </div>

      <Box sx={{ minWidth: 120 }}>
        {hasAttributes ? (
          // TODO: Iterate thru each attribute and make a selector for each.
          // also, change the item model to account for multiple attributes...and then the cart.
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {hasAttributes == true
                ? " " +
                  product.product_variations?.[0].attributes?.[0].name +
                  " "
                : "option"}
            </InputLabel>
            <Select
              labelId="attrib-select-id"
              id="attrib-select"
              value={attrib}
              label={
                hasAttributes == true
                  ? " " +
                    product.product_variations?.[0].attributes?.[0].name +
                    " "
                  : "option"
              }
              onChange={(e) => {
                setAttrib(e.target.value);
              }}
            >
              {product.product_variations.map((variation) => {
                return variation.attributes != undefined ? (
                  <MenuItem
                    value={variation.attributes[0].option}
                    key={variation.attributes[0].option}
                  >
                    {variation.attributes[0].option}
                  </MenuItem>
                ) : (
                  <span>none</span>
                );
              })}
            </Select>
          </FormControl>
        ) : (
          <span>No Options</span>
        )}
      </Box>

      <div style={{ margin: "1rem 1rem" }}>
        {product.description ? (
          <p>{product.description}</p>
        ) : (
          <p>no description for product</p>
        )}
      </div>
      <PriceText>${product.price * 1}</PriceText>
      <div style={{ width: "100px" }}>
        <CounterInput
          style={{ width: "100px" }}
          onChange={(value: number) => {
            setQty(value);
          }}
          value={1}
        />
      </div>
      <Button onClick={addItemToCart}>Add to Cart</Button>
    </Layout>
  );
};

export const query = graphql`
  query ItemQuery($id: String!) {
    wcProducts(id: { eq: $id }) {
      description
      name
      price
      id
      sku
      wordpress_id
      images {
        src
      }
      product_variations {
        attributes {
          name
          option
          id
        }
        image {
          src
        }
      }
    }
  }
`;

export default ProductTemplate;
