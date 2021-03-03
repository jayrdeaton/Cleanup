const readline = require('./readline')

module.exports = (prompt) => new Promise((resolve, reject) => {
  if (!prompt) prompt = '> '
  readline.question(prompt, (input) => {
    resolve(input)
  })
})
