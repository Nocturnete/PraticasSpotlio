import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <div>
        <h1 className="text-5xl flex justify-center mb-5">Home Page</h1>
        <p>I'm making this by following the Gatsby Tutorial.</p>
        <StaticImage className="mt-3 max-w-lg"
          alt="Gato pitufo"
          src="https://static.wikia.nocookie.net/youtubepedia/images/b/b8/Knekro_apariencia.PNG/revision/latest/scale-to-width-down/350?cb=20211117191847&path-prefix=es" />
      </div>
    </Layout>
  )
}


export const Head = () => <Seo title="Home Page" />
export default IndexPage
