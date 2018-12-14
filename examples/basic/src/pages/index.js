import React from "react"
import Image from "gatsby-image"
import Img from "../generated"

function HelloWorld() {
  function renderImage({ file: { name, img } }) {
    return (
      <Image
        style={{ width: 300 }}
        alt={name.replace("-", " ")}
        fluid={img.fluid}
      />
    )
  }

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[1, 2, 3].map(name => (
        <Img key={name} name={`image-${name}.jpg`} render={renderImage} />
      ))}
      {/* <Img name={`image_1_jpg.js`} render={renderImage} /> */}
    </div>
  )
}

export default HelloWorld
