let { command, option } = require('termkit'),
  { cleanup } = require('../actions');

let program = command('cleanup', '[dir]')
  .version(process.env.npm_package_version)
  .description('A cli for cleaning up directories')
  .options([
    option('s', 'size', '<size>', 'Specify size in Megabytes'),
    option('f', 'force', null, 'Forego confirmation'),
    option('v', 'verbose', null, 'Display more info')
  ])
  .action(async (options) => await cleanup(options));

module.exports = program;
