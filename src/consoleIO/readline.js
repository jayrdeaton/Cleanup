let { createInterface } = require('readline');

module.exports = createInterface({
  input: process.stdin,
  output: process.stdout
});
