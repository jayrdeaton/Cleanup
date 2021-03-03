const { basename, extname } = require('path'),
  { promisify } = require('util'),
  getSize = promisify(require('get-folder-size'))

module.exports = async (items, { includes, excludes, extension, size, verbose }, counter) => {
  let deletes = []
  let i = 1
  if (size) size = size * 1024 * 1024

  for (const item of items) {
    if (counter) counter.up()
    const name = basename(item)
    const item_size = size ? await getSize(item) : null

    let del = true
    if (includes && !name.includes(includes)) del = false
    if (excludes && name.includes(excludes)) del = false
    if (extension && extname(item) !== extension) del = false
    if (size && item_size > size) del = false

    if (del) {
      deletes.push(item)
      if (verbose) {
        process.stdout.clearLine()
        console.log(item)
      }
    }
  }
  return deletes
}
