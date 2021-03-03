const { promisify } = require('util'),
  fs = require('fs'),
  { join } = require('path'),
  readdir = promisify(fs.readdir),
  isDirectory = require('./isDirectory')

const getItems = async (dir, options) => {
  const { recursive } = options || {}
  let dirs = []
  let items = await readdir(dir)
  for (let item of items) {
    item = join(dir, item)
    if (recursive && await isDirectory(item)) {
      const sub = await getItems(item, options)
      dirs.push(...sub)
    }
    dirs.push(item)
  }
  return dirs
}

module.exports = getItems
