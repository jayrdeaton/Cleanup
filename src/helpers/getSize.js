let { promisify } = require('util'),
  getFolderSize = require('get-folder-size');

getFolderSize = promisify(getFolderSize);

module.exports = async (dir) => {
  return await getFolderSize(dir);
};
