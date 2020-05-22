const { getTextBySelector } = require('./Crawler')
const extractProp = require('./utils/extractProp')
const zip = require('./utils/zip')
const sources = require('./sources')

const extractUrl = extractProp('url')

;(async function () {
  const wordsOfDay = await Promise.all(sources.map(getTextBySelector))
  const urlsOfSources = sources.map(extractUrl)

  console.log(zip(urlsOfSources, wordsOfDay))
})()
