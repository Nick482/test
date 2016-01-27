/**
 * Created by Nick on 1/26/2016.
 */
var dbconfig = require('./dbconfig');
var knex = require('knex')(dbconfig);
module.exports = require('bookshelf')(knex);