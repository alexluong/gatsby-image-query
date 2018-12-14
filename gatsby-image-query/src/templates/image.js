import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default ({ render }) => (
  <StaticQuery
    query={graphql`
      {
        file(absolutePath: { regex: "/___RELATIVE_PATH___/" }) {
          name
          img: childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={render}
  />
)
