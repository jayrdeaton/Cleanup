const cosmetic = require('cosmetic'),
  { resolve } = require('path'),
  { promisify } = require('util'),
  ffmetadata = require('ffmetadata'),
  readMetadata = promisify(ffmetadata.read),
  writeMetadata = promisify(ffmetadata.write),
  { prompt } = require('../consoleIO'),
  { getItems } = require('../helpers'),
  { Counter } = require('../models'),
  CLEANUP = cosmetic.magenta('cleanup')

module.exports = async (options) => {
  let { dir, force, verbose } = options
  dir = resolve(dir || '.')
  console.log(`${CLEANUP} metadata in ${dir}`)
  const counter = new Counter({ onChange: (count) => process.stdout.write(`getting files ${count}\r`) })
  const items = await getItems(dir, options, counter)
  const clean = []
  process.stdout.clearLine()
  console.log(`got ${items.length} files`)
  counter.count = 0
  counter.onChange = (count) => process.stdout.write(`checking files ${count} / ${items.length}\r`)
  for (const item of items) try {
    counter.up()
    const data = await readMetadata(item)
    if (data.comment || data.title) {
      clean.push({ item, data })
      if (verbose) {
        process.stdout.clearLine()
        console.log(item)
      }
    }
  } catch (err) {}
  process.stdout.clearLine()
  if (clean.length === 0) return console.log(`no items to ${CLEANUP}`)
  if (!force) {
    const confirm = await prompt(`${CLEANUP} metadata from ${clean.length === 1 ? 'this' : 'these'} ${clean.length} ${clean.length === 1 ? 'file' : 'files'}? (Y/n) `)
    if (confirm.toLowerCase() !== 'y') return console.log(`${CLEANUP} aborted`)
  }
  counter.count = 0
  counter.onChange = (count) => process.stdout.write(`cleaning files ${count} / ${clean.length}\r`)
  for (const { item, data } of clean) try {
    counter.up()
    await writeMetadata(item, Object.assign(data, { title: '', comment: '' }))
    if (verbose) {
      process.stdout.clearLine()
      console.log(`cleaned ${item}`)
    }
  } catch (err) {
    process.stdout.clearLine()
    console.log(`error cleaning ${item} ${err}`)
  }
  process.stdout.clearLine()
  console.log(`finished ${CLEANUP} of ${clean.length} files`)
}
