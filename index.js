#!/usr/bin/env node
const { consoleIO, program } = require('./src'),
  { printError, readline } = consoleIO

const run = async(args) => {
  try {
    await program.parse(args)
  } catch(err) {
    printError(err)
  }
  process.exit()
}

process.on('exit', () => {
  readline.close()
  process.stdin.destroy()
})

run(process.argv)
