const cosmetic = require('cosmetic'),
  { resolve } = require('path'),
  { promisify } = require('util'),
  rimraf = promisify(require('rimraf')),
  { prompt } = require('../consoleIO'),
  { getItems, getJunk } = require('../helpers'),
  { Counter } = require('../models'),
  CLEANUP = cosmetic.magenta('cleanup')

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
  const counter = new Counter({ onChange: (count) => process.stdout.write(`getting files ${count}\r`) })
  const items = await getItems(dir, options, counter)
  process.stdout.clearLine()
  console.log(`got ${items.length} files`)
  counter.count = 0
  counter.onChange = (count) => process.stdout.write(`checking files ${count} / ${items.length}\r`)
  const clean = await getJunk(items, options, counter)
  if (clean.length === 0) return console.log(`no items to ${CLEANUP}`)
  if (!force) {
    const confirm = await prompt(`${CLEANUP} ${clean.length === 1 ? 'this' : 'these'} ${clean.length} junk ${clean.length === 1 ? 'item' : 'items'}? (Y/n) `)
    if (confirm.toLowerCase() !== 'y') return console.log(`${CLEANUP} aborted`)
  }
  counter.count = 0
  counter.onChange = (count) => process.stdout.write(`cleaning files ${count} / ${clean.length}\r`)
  for (let item of clean) try {
    counter.up()
    await rimraf(item)
    if (verbose) {
      process.stdout.clearLine()
      console.log(`deleted ${item}`)
    }
  } catch (err) {
    process.stdout.clearLine()
    console.log(`error cleaning ${item} ${err}`)
  }
  process.stdout.clearLine()
  console.log(`finished ${CLEANUP} of ${clean.length} files`)
}
