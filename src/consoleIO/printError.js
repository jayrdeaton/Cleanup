const cosmetic = require('cosmetic')

module.exports = (error) => console.log(`${cosmetic.red(`${error.name}:`)} ${error.message}`)
