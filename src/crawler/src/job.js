const extractProp = require('./utils/extractProp')
const zip = require('./utils/zip')

const extractUrl = extractProp('url')

async function job({ sources, crawler, persister }) {
  const wordsOfSources = await Promise.allSettled(
    sources.map(crawler.getTextBySelector)
  )

  const urlsOfSources = sources.map(extractUrl)

  const wordsOfDays = zip(urlsOfSources, wordsOfSources)
  const wordsOfDaysResolved = wordsOfDays.filter(
    ([_, { status }]) => status === 'fulfilled'
  )
  const normalizedWordOfDays = wordsOfDaysResolved.map(([url, { value }]) => ({
    url,
    word: value,
  }))

  persister(normalizedWordOfDays)
}

module.exports = job
