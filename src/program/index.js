const { command, option } = require('termkit'),
  { junk, metadata } = require('../actions')

const program = command('cleanup')
  .version(process.env.npm_package_version)
  .description('A cli for cleaning up your file system.  \nThis could potentially be dangerous if you don\'t know what you are doing or aren\'t careful.  \n\nUSE AT YOUR OWN RISK!  \nYOU HAVE BEEN WARNED!')
  .commands([
    command('junk', '[dir]')
      .description('Clean junk files and directories that match given criteria')
      .option('i', 'includes', '<str>', 'Delete items with names that include a given string')
      .option('e', 'excludes', '<str>', 'Delete items with names that exclude a given string')
      .option(null, 'extension', '<str>', 'Delete files with a given extension')
      .option('s', 'size', '<num>', 'Delete items under given size in megabytes')
      .option('r', 'recursive', null, 'Scan directories recursively')
      .option('v', 'verbose', null, 'Display more info')
      .option('f', 'force', null, 'Forego confirmation')
      .action(junk),
    command('metadata', '[dir]')
      .description('Clean file title and comment metadata')
      .option('r', 'recursive', null, 'Scan directories recursively')
      .option('v', 'verbose', null, 'Display more info')
      .option('f', 'force', null, 'Forego confirmation')
      .action(metadata)
  ])

module.exports = program
