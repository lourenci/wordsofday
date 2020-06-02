const path = require('path')
const arg = require('arg')
const job = require('./job')
const sources = require('./sources')

const args = arg({
  '--crawler': String,
  '--persister': String,
})

;(async () => {
  const persister = require(path.resolve(__dirname, args['--persister']))
  const crawler = require(path.resolve(__dirname, args['--crawler']))

  await job({ sources, persister, crawler })
})()
