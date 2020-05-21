const { Client } = require('pg')
const { getTextBySelector } = require('./Crawler')
const sources = require('./sources');

(async function () {
  try {
    const wordsOfDay = await Promise.all(sources.map(getTextBySelector))

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })

    const query = 'INSERT INTO users(word) VALUES($1)'
    await client.query(query, wordsOfDay)

    console.log(wordsOfDay)
  } catch (err) {
    console.err(err)
  }
})()
