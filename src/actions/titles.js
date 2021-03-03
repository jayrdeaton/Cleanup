const cosmetic = require('cosmetic'),
  { resolve } = require('path'),
  { prompt } = require('../consoleIO'),
  { deleteItems, getDeletes, getItems, getMetadata, writeMetadata } = require('../helpers'),
  CLEANUP = cosmetic.magenta('cleanup')

module.exports = async (options) => {
  let { _parents: { cleanup: { dir } } } = options
  dir = resolve(dir || '.')

  const items = await getItems(dir)
  for (const item of items) try {
    const data = await getMetadata(item)
    if (data.comment || data.title) await writeMetadata(item, Object.assign(data, { comment: '', title: '' }))
  } catch (err) {
    console.log('error', err)
  }

  // if (options.extension && !options.extension.startsWith('.')) options.extension = `.${options.extension}`
  // const { force, includes, excludes, extension, size, verbose } = options
  // const dir = resolve(options.dir || '.')
  // if (!includes && !excludes && !extension && !size) return console.log(`${CLEANUP} requires at least one condition (includes, excludes, extension, size)`)
  //
  // console.log(`${CLEANUP} ${dir}`)
  //
  // if (includes) console.log(`items with name including ${includes}`)
  // if (excludes) console.log(`items with name excluding ${excludes}`)
  // if (extension) console.log(`files with extension ${extension}`)
  // if (size) console.log(`items smaller than ${size} MB`)
  //
  // console.log()
  //
  // const items = await getItems(dir, options)
  // const deletes = await getDeletes(items, options)
  //
  // if (deletes.length === 0) return console.log(`no items to ${CLEANUP}`)
  //
  // if (!force) {
  //   const confirm = await prompt(`are you sure you want to delete these ${deletes.length} items? (Y/n) `)
  //   if (confirm.toLowerCase() !== 'y') return console.log(`${CLEANUP} aborted`)
  // }
  // await deleteItems(deletes, verbose)
}
