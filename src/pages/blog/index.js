import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { Link, graphql } from 'gatsby'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <h1 className="text-5xl flex justify-center mb-10">Blog</h1>
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <h2 className="flex justify-center mb-4 text-lg text-blue-600 font-semibold">
              <Link to={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC }}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
        excerpt
      }
    }
  }
  `

export const Head = () => <Seo title="My Blog Posts" />
export default BlogPage 