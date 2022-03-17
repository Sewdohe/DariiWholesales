// import type { GatsbyNode } from "gatsby";
// import path from "path";

// exports.createPages = async ({ 
//   actions, graphql
// }) => {
//   const { data: {allWcProducts} } = await graphql(`
//     query {
//       allWcProducts(filter: { featured: { eq: true } }) {
//         edges {
//           node {
//             description
//             name
//             price
//             id
//             sku
//             wordpress_id
//             images {
//               src
//             }
//             product_variations {
//               attributes {
//                 name
//                 option
//               }
//               image {
//                 src
//               }
//             }
//           }
//         }
//       }
//     }
//   `);

//   return (
//     allWcProducts.edges.forEach(({ node: product }) => {
//       console.log("creating page for ", product.wordpress_id)
//       const wp_id = product.wordpress_id;
//       actions.createPage({
//         path: `/products/${wp_id}`,
//         component: require.resolve("./src/templates/productTemplate.tsx"),
//         context: { id: wp_id },
//       });
//     })
//   );
// };

