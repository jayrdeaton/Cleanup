const cosmetic = require('cosmetic'),
  { resolve } = require('path'),
  { promisify } = require('util'),
  ffmetadata = require('ffmetadata'),
  readMetadata = promisify(ffmetadata.read),
  writeMetadata = promisify(ffmetadata.write),
  { prompt } = require('../consoleIO'),
  { getItems } = require('../helpers'),
  CLEANUP = cosmetic.magenta('cleanup')

module.exports = async (options) => {
  let { dir, force, verbose } = options
  dir = resolve(dir || '.')
  console.log(`${CLEANUP} metadata in ${dir}`)
  const items = await getItems(dir)
  const clean = []
  for (const item of items) try {
    const data = await readMetadata(item)
    if (data.comment || data.title) {
      clean.push({ item, data })
      if (verbose) console.log(item)
    }
  } catch (err) {}
  if (clean.length === 0) return console.log(`no items to ${CLEANUP}`)
  if (!force) {
    const confirm = await prompt(`${CLEANUP} metadata from ${clean.length === 1 ? 'this' : 'these'} ${clean.length} ${clean.length === 1 ? 'item' : 'items'}? (Y/n) `)
    if (confirm.toLowerCase() !== 'y') return console.log(`${CLEANUP} aborted`)
  }
  for (const { item, data } of clean) try {
    await writeMetadata(item, Object.assign(data, { title: '', comment: '' }))
    if (verbose) console.log(`cleaned ${item}`)
  } catch (err) {
    console.log(`error cleaning ${item} ${err}`)
  }
  console.log(`finished ${CLEANUP}`)
}
