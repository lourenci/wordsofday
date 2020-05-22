/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('words', {
    id: 'id',
    word: { type: 'varchar(1000)', notNull: true },
    link: { type: 'varchar(1000)' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}
