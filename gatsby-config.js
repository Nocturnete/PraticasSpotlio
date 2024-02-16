module.exports = {
    siteMetadata: {
      title: `Nocturnete Project`,
    },
    plugins: [
      "gatsby-plugin-image",
      "gatsby-plugin-sharp",
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: `blog`,
          path: `${__dirname}/blog`,
        },
      },
      "gatsby-plugin-mdx",
      "gatsby-transformer-sharp",
      {
        resolve: 'gatsby-plugin-web-font-loader',
        options: {
        },
      },
    ],
  };
