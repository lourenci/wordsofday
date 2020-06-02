const { Pool } = require('pg')

const DATABASE_URL = process.env.DATABASE_URL

async function persistWords(words) {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  })

  const queryForPersistWord = persistWord(pool.query.bind(pool))

  await Promise.all(words.map(queryForPersistWord))
}

function persistWord(query) {
  return async function ({ url, word }) {
    const queryObject = {
      text: 'INSERT INTO words(word, url) VALUES($1, $2)',
      values: [word, url],
    }

    await query(queryObject)
  }
}

module.exports = persistWords
