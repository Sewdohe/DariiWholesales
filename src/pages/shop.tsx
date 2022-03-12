import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { ProductCard } from "../components/productCard";
import { Product, Products } from "../types/Types";
import Layout from "../components/layout";
import { Container, Row, Col } from "react-bootstrap";

interface QueryResult {
  allWcProducts: {
    edges: Products;
  };
}

const Shop: React.FC<PageProps<QueryResult>> = ({ data }) => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          {data.allWcProducts.edges.map((product: Product) => (
            <Col lg="2">
              <ProductCard item={product}></ProductCard>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Shop;

export const query = graphql`
  query {
    allWcProducts(filter: {featured: {eq: true}}) {
      edges {
        node {
          ...ProductData
        }
      }
    }
  }
`;
