import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Product, Products } from "../queries/newestTen";

interface newestItems {
  allWcProducts: {
    edges: Product[];
  };
}

interface queryResult {
  allWcProducts: {
    edges: Products;
  }
}

const Shop: React.FC<PageProps<newestItems>> = ({ data }) => {
  return (
    <div>
      <ul>
        {data.allWcProducts.edges.map((product) => (
          <li key={product.node.id}>
            <span>{product.node.name}</span>
            {product.node.images ? (
              <img src={product.node.images[0].src} />
            ) : (
              <span>no image</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const query = graphql`
  query {
    allWcProducts(limit: 10) {
      edges {
        node {
          description
          name
          price
          sku
          id
          images {
            src
          }
        }
      }
    }
  }
`;

export default Shop;
