import React from "react"

export default ({ name, render }) => {
  const path = name.replace(/-|\./g, "_").concat(".js")
  const Comp = require(`./${path}`).default
  return <Comp render={render} />
}
