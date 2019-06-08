'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('todos', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      title: 'string',
      notes: 'text',
      due_date: 'datetime',
      created_at: 'datetime'
    },
    ifNotExists: true
  });
};

exports.down = function(db) {
  return db.dropTable('todos');
};

exports._meta = {
  "version": 1
};
