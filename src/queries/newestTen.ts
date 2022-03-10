import { graphql } from "gatsby";

export interface newestItems {
  allWcProducts: {
    edges: Product[];
  };
}

export interface Products extends Array<Product>{};

export interface Product {
  node: {
    description: string;
    name: string;
    price: number;
    id: string;
    sku: number;
    images: [{ src: string }];
  };
}

export const productFragment = graphql`
  fragment prod on allWcProducts {
    edges {
      ...Product
    }
  }
`;
