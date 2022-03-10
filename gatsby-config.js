/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
      title: `new`,
    siteUrl: `https://www.dariwholesales.com`
  },
  plugins: ["gatsby-plugin-styled-components", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  {
  resolve: "@pasdo501/gatsby-source-woocommerce",
  options: {
    // Base URL of WordPress site
    api: 'dariwholesales.com',
    // true if using https. false otherwise.
    https: true,
    api_keys: {
      consumer_key: `ck_8b56d6ee7e862bc2836d0d8e1fbeab603f93ba3c`,
      consumer_secret: `cs_9dbd2ee350f0a9cdf06b2fd7c831e029ad047976`,
    },
    // Array of strings with fields you'd like to create nodes for...
    fields: ['products', 'products/categories', 'products/attributes'],
  }
},]
};
