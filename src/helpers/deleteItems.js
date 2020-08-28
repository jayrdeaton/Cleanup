let { promisify } = require('util'),
  rimraf = require('rimraf')

rimraf = promisify(rimraf)

module.exports = async (deletes, verbose) => {
  for (let deletion of deletes) {
    // await rimraf(deletion);
    if (verbose) console.log(`Deleted ${deletion}`)
  }
}
