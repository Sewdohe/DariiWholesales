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
      <Box sx={{ flexGrow: 1, minWidth: '80vw', width: '100%' }}>
        <Stack direction="row" spacing={1}>
          <Box sx={{ flexGrow: 1, minWidth: '80vw', width: '100%', margin: '1rem' }}>
            <Grid
              flexGrow={1}
              container
              rowSpacing={1}
              columnSpacing={2}
              alignItems="space-around"
              justifyContent="space-evenly"
              sx={{ width: '100%' }}
            >
              {
                data.allWcProducts.edges.map(({ node: Product }) => {
                  return (
                    <Grid key={Product.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
                      <ProductCard item={Product}></ProductCard>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: '20vw', maxWidth: '20vw' }}>
            <CategorySidebar />
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
