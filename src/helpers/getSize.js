const { promisify } = require('util'),
  getFolderSize = promisify(require('get-folder-size'))

module.exports = (dir) => getFolderSize(dir)
