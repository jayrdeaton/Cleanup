let { promisify } = require('util'),
  { readdir } = require('fs'),
  { join } = require('path');

readdir = promisify(readdir);

module.exports = async (dir) => {
  let dirs = [];
  let items = await readdir(dir);
  for (let item of items) dirs.push(join(dir, item));
  return dirs;
};
