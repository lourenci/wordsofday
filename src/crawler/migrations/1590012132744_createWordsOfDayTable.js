/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('words', {
    id: 'id',
    word: { type: 'varchar(1000)', notNull: true },
    url: { type: 'varchar(1000)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}
