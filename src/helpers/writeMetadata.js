const { write } = require('ffmetadata')

module.exports = (dir, data) => new Promise((resolve, reject) => {
  write(dir, data, (err, data) => {
    if (err) return reject(err)
    resolve()
  })
})
