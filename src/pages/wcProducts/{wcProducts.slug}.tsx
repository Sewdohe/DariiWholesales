import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { Product } from "../../@types/product";
import styled from "styled-components";
import { DropdownButton, Dropdown } from "react-bootstrap";

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

const ProductTemplate = ({ data }: Data) => {
  const { wcProducts: product } = data;
  let hasAttributes;

  // @ts-ignore
  product.product_variations.length != 0
    ? (hasAttributes = true)
    : (hasAttributes = false);

  console.log(hasAttributes ? "Has attributes" : "No Attributes");

  return (
    <Layout>
      <h1>
        {product.name}
        {console.log(product)}
      </h1>
      <div>
        {product.images.length > 0 ? (
          <img
            style={{ maxWidth: "300px", maxHeight: "300px" }}
            src={product.images[0].src}
          />
        ) : (
          <span>no image</span>
        )}
      </div>

      <div>
        {hasAttributes ? (
          <DropdownButton
            id="variation"
            title={
              hasAttributes == true
                ? " " + product.product_variations?.[0].attributes?.[0].name + " "
                : "option"
            }
          >
            {product.product_variations.map((variation) => {
              return variation.attributes != undefined ? (
                <Dropdown.Item key={variation.attributes[0].option}>
                  {variation.attributes[0].option}
                  {console.log(variation)}
                </Dropdown.Item>
              ) : (
                <span>none</span>
              );
            })}
          </DropdownButton>
        ) : (
          <span></span>
        )}
      </div>

      <div style={{ margin: "1rem 1rem" }}>
        {product.description ? (
          <p>{product.description}</p>
        ) : (
          <p>no description for product</p>
        )}
      </div>
      <PriceText>${product.price * 1}</PriceText>
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
