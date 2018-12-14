const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

function checkGeneratedDir() {
  const dir = path.resolve(__dirname, "../generated")
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
  }
}

function isGatsbyImageInstalled() {
  try {
    require.resolve(`gatsby-image`)
    return true
  } catch (e) {
    console.log(`Please install "gatsby-image" to use "gatsby-image-query"`)
    return false
  }
}

exports.onPreExtractQueries = ({ getNodesByType }, pluginOptions) => {
  console.log(pluginOptions)
  if (!isGatsbyImageInstalled()) {
    return
  }
  checkGeneratedDir()

  const nodes = getNodesByType("File").map(node => node.relativePath)

  const template = fs
    .readFileSync(path.resolve(__dirname, "templates/image.js"))
    .toString()
  const indexTemplate = fs
    .readFileSync(path.resolve(__dirname, "templates/index.js"))
    .toString()

  const basePath = process.cwd()
  nodes.forEach(item => {
    const name = item.replace(/-|\./g, "_")

    const queryPath = path.resolve(basePath, "src/generated", `${name}.js`)
    const indexPath = path.resolve(basePath, "src/generated/index.js")

    fs.writeFileSync(indexPath, indexTemplate)

    if (fs.existsSync(queryPath)) {
      fs.truncateSync(queryPath, 0)
    }

    const stream = fs.createWriteStream(queryPath, { flags: "a" })

    stream.write(
      template
        .replace(/___RELATIVE_PATH___/g, item)
        .replace(/___NAME___/g, name),
    )
  })
}
