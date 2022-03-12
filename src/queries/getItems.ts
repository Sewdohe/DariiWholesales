import { graphql } from "gatsby";

export const ProductData = graphql`
  fragment ProductData on wcProducts {
    description
    name
    price
    id
    sku
    images {
      src
    }
    product_variations {
      attributes {
        name
        option
      }
      image {
        src
      }
    }
  }
`