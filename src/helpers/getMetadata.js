const { read } = require('ffmetadata')

module.exports = (dir) => new Promise((resolve, reject) => {
  read(dir, (err, data) => {
    if (err) return reject(err)
    resolve(data)
  })
})
