exports.createPages = async ({ graphql, actions }) => {
    const { createRedirect } = actions
  
    createRedirect({
      fromPath: `/about/`,
      toPath: `/blog/`,
      redirectInBrowser: true,
    })
  }