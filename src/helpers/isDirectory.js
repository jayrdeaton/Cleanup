const { promisify } = require('util'),
  fs = require('fs'),
  lstat = promisify(fs.lstat)


module.exports = async (path) => {
  try {
    const stat = await lstat(path)
    return stat.isDirectory()
  } catch (err) {
    return false
  }
}
