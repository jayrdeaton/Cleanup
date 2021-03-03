const cosmetic = require('cosmetic'),
  { resolve } = require('path'),
  { prompt } = require('../consoleIO'),
  { getItems, getJunk } = require('../helpers'),
  CLEANUP = cosmetic.magenta('cleanup'),
  { promisify } = require('util'),
  rimraf = promisify(require('rimraf'))

module.exports = async (options) => {
  let { dir, force, includes, excludes, extension, recursive, size, verbose } = options
  dir = resolve(dir || '.')
  if (extension && !extension.startsWith('.')) extension = `.${extension}`
  if (!includes && !excludes && !extension && !size) return console.log(`${CLEANUP} requires at least one condition (includes, excludes, extension, size)`)

  console.log(`${CLEANUP} junk in ${dir}`)

  if (includes) console.log(`items with name including ${includes}`)
  if (excludes) console.log(`items with name excluding ${excludes}`)
  if (extension) console.log(`files with extension ${extension}`)
  if (size) console.log(`items smaller than ${size} MB`)

  const items = await getItems(dir, { directories: true, recursive })
  const clean = await getJunk(items, options)

  if (clean.length === 0) return console.log(`no items to ${CLEANUP}`)

  if (!force) {
    const confirm = await prompt(`${CLEANUP} ${clean.length === 1 ? 'this' : 'these'} ${clean.length} junk ${clean.length === 1 ? 'item' : 'items'}? (Y/n) `)
    if (confirm.toLowerCase() !== 'y') return console.log(`${CLEANUP} aborted`)
  }
  for (let item of clean) {
    await rimraf(item)
    if (verbose) console.log(`deleted ${item}`)
  }
  console.log(`finished ${CLEANUP}`)
}
