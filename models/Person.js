/**
 * Created by Nick on 1/26/2016.
 */
var bookshelf = require('../bookshelf');
var Person = bookshelf.Model.extend({
    tableName: "Person"
});
module.exports = Person;