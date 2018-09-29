#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');
var directory = require('./directory');
var targetDirectory;

program
  .arguments('<dir>')
  .option('-s, --size <size>', 'specify size in Megabytes')
  .option('-f, --force', 'continue without confirmation')
  .option('-v, --verbose', 'display more info')
  // .option('-k, --keep [extensions]', 'Specify extensions to ignore')
  .action((dir) => {
    targetDirectory = dir;
  })
  .parse(process.argv);

if (targetDirectory) {
  directory.cleanup(targetDirectory, program);
};
