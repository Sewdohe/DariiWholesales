import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { Product, Products } from "../../@types/product";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ProductCard } from "../../components/productCard";
import CategorySidebar from "../../components/categorySidebar";

interface Data {
  data: {
    allWcProducts: {
      edges: [
        {
          node: Product;
        }
      ];
    };
  };
}

const ProductTemplate: React.FC<Data> = ({ data }: Data) => {
  const { allWcProducts: product } = data;

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, minWidth: '80vw' }}>
        <Stack direction="row" spacing={2}>
          <Box>
            <Grid
              flexGrow={1}
              container
              rowSpacing={2}
              columnSpacing={3}
              alignItems="flex-end"
              justifyContent="center"
            >
              {console.log(data)}
              {data.allWcProducts.edges.map(({ node: product }) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <ProductCard item={product}></ProductCard>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
            <CategorySidebar />
          <Box>
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query CategoryItemsQuery($id: String!) {
    allWcProducts(filter: { categories: { elemMatch: { id: { eq: $id } } } }) {
      edges {
        node {
          ...ProductData
        }
      }
    }
  }
`;

export default ProductTemplate;
