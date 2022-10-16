import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import { Product } from "../../@types/product";
import styled from "styled-components";
import { Button } from "react-bootstrap";

// @ts-ignore
import CounterInput from "react-bootstrap-counter";
import { CartContext } from "../../contexts/CartContext";
import { CartContextType } from "../../@types/cart";

import Select from "@mui/material/Select";
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

  let hasAttributes: boolean;
  let attributes: string[] = [];

  const { cart: products, addToCart } = React.useContext(
    CartContext
  ) as CartContextType;
  const [qty, setQty] = useState(1);

  // SET ATTRIBUTE STATES
  // THE MAX ATTRIBUTES OF ANY ITEM ARE 4
  const [attrib0, setAttrib0] = useState(
    product.attributes ? product.attributes[0]?.options?.[0] : ""
  );
  const [attrib1, setAttrib1] = useState(
    // @ts-ignore
    product.attributes ? product.attributes[1]?.options?.[0] : ""
  );
  const [attrib2, setAttrib2] = useState(
    // @ts-ignore
    product.attributes ? product.attributes[2]?.options?.[0] : ""
  );
  const [attrib3, setAttrib3] = useState(
    // @ts-ignore
    product.attributes ? product.attributes[3]?.options?.[0] : ""
  );

  if(attrib1 === undefined){
    setAttrib1("")
  }
  if(attrib2 === undefined){
    setAttrib2("")
  }
  if(attrib3 === undefined){
    setAttrib3("")
  }


  // @ts-ignore
  product.attributes.length != 0
    ? (hasAttributes = true)
    : (hasAttributes = false);

  const addItemToCart = () => {
    addToCart(product, qty, [attrib0, attrib1, attrib2, attrib3]);
  };

  return (
    <Layout>
      {/* PRODUCT NAME */}
      <h1>{product.name}</h1>

      {/* PRODUCT IMAGE */}
      <div>
        {product.images.length > 0 ? (
          <img
            style={{ maxWidth: "175px", maxHeight: "175px" }}
            src={product.images[0].src}
            alt={"product image"}
          />
        ) : (
          <span>no image</span>
        )}
      </div>

      {/* ATTRIBUTE BOXES */}
      <Box sx={{ minWidth: "100px" }}>
        {product.attributes?.map((attribute, index) => {
          return (
            <FormControl
              key={"attrib" + attribute?.name}
              fullWidth
              style={{ margin: "10px" }}
            >
              <InputLabel id="demo-simple-select-label">
                {attribute?.name}
              </InputLabel>
              <Select
                labelId="attrib-select-id"
                id="attrib-select"
                // @ts-ignore
                value={window["attrib" + index]}
                label={attribute?.name}
                onChange={(e) => {
                  // setAttrib0(e.target.value);
                  switch (index) {
                    case 0:
                      setAttrib0(e.target.value);
                      break;
                    case 1:
                      setAttrib1(e.target.value);
                      break;
                    case 2:
                      setAttrib2(e.target.value);
                      break;
                    case 3:
                      setAttrib3(e.target.value);
                      break;
                  }
                }}
              >
                {attribute.options?.map((o) => {
                  return (
                    <MenuItem value={o} key={o}>
                      {o}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        })}
      </Box>

      {/* ITEM DESCRIPTION AREA */}
      <div style={{ margin: "1rem 1rem" }}>
        {product.description ? (
          <p>{product.description}</p>
        ) : (
          <p>no description for product</p>
        )}
      </div>

      {/* PRODUCT PRICE */}
      <PriceText>${product.price * 1}</PriceText>
      <div style={{ width: "100px", padding: "8px" }}>
        <CounterInput
          style={{ width: "100px" }}
          onChange={(value: number) => {
            setQty(value);
          }}
          value={1}
        />
      </div>

      {/* BUY BUTTON */}
      <Button onClick={addItemToCart}>Add to Cart</Button>
    </Layout>
  );
};

export const query = graphql`
  query ItemQuery($id: String!) {
    wcProducts(id: { eq: $id }) {
      ...ProductData
    }
  }
`;

export default ProductTemplate;
