import { graphql } from "gatsby";

export const ProductData = graphql`
  fragment ProductData on wcProducts {
    description
    name
    price
    id
    sku
    wordpress_id
    slug
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