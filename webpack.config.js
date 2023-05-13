const path = require('path')
let fs = require('fs')

module.exports = {
  entry: getfiles(path.resolve() + "/assets/js/pages/"),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
};

function getfiles(pathFolder = "") {
  if (pathFolder.endsWith("/"))
      pathFolder = pathFolder.slice(0, pathFolder.length - 1)

  const jsFolders = fs.readdirSync(pathFolder)
  const entries = {}

  if (jsFolders) {


      jsFolders.forEach(dirname => {

          const jsFiles = fs.readdirSync(`${pathFolder}/${dirname}`)

          if (jsFiles)
              jsFiles.forEach(filename => {
                  filename = filename.replace(".js","")
                  entries[filename] = `${pathFolder}/${dirname}/${filename}`
              })

      })
  }
  return entries;
}