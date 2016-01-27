/**
 * Created by Nick on 1/26/2016.
 */
var bookshelf = require('../bookshelf');
var Customer = bookshelf.Model.extend({
    tableName: "Customer"
});
module.exports = Customer;