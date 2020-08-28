const { command, option } = require('termkit'),
  { cleanup } = require('../actions')

const program = command('cleanup', '[dir]')
  .version(process.env.npm_package_version)
  .description('A cli for cleaning up files and directories given criteria.  \nThis could potentially be dangerous if you don\'t know what you are doing or aren\'t careful.  \n\nUSE AT YOUR OWN RISK!  \nYOU HAVE BEEN WARNED!')
  .option('i', 'includes', '<str>', 'Delete items with names that include a given string')
  .option('e', 'excludes', '<str>', 'Delete items with names that exclude a given string')
  .option(null, 'extension', '<str>', 'Delete files with a given extension')
  .option('s', 'size', '<num>', 'Delete items under given size in megabytes')
  // .option('R', 'recursive', null, 'Scan directories recursively')
  .option('v', 'verbose', null, 'Display more info')
  .option(null, 'force', null, 'Forego confirmation')
  .action(cleanup)

module.exports = program
