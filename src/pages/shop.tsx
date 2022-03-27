import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { ProductCard } from "../components/productCard";
import { Product } from "../@types/product";
import Layout from "../components/layout";
import CategorySidebar from "../components/categorySidebar";
import styled from "styled-components"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


interface QueryResult {
  allWcProducts: {
    edges: [
      {
        node: Product;
      }
    ];
  };
}

const ShopContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 80% 15%;
`

const Shop: React.FC<PageProps<QueryResult>> = ({ data }) => {
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1}>
          <Grid flexGrow={1} container rowSpacing={3} columnSpacing={ 3 }>
              {data.allWcProducts.edges.map(({ node: product }) => {
                return (
                  <Grid item xs={2}>
                    <ProductCard item={product}></ProductCard>
                  </Grid>
                );
              })}
          </Grid>
          <CategorySidebar></CategorySidebar>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Shop;

export const query = graphql`
  query {
    allWcProducts(filter: { featured: { eq: true } }) {
      edges {
        node {
          ...ProductData
        }
      }
    }
  }
`;
