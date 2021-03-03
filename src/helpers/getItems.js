const { promisify } = require('util'),
  fs = require('fs'),
  { join } = require('path'),
  readdir = promisify(fs.readdir),
  isDirectory = require('./isDirectory')

const getItems = async (dir, options, counter) => {
  try {
    const { recursive } = options || {}
    let dirs = []
    let items = await readdir(dir)
    for (let item of items) {
      item = join(dir, item)
      if (recursive && await isDirectory(item)) {
        const sub = await getItems(item, options, counter)
        dirs.push(...sub)
      }
      if (counter) counter.up()
      dirs.push(item)
    }
    return dirs
  } catch (err) {
    process.stdout.clearLine()
    console.log(`error getting files in ${dir}`)
    return []
  }
}

module.exports = getItems
