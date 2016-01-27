/**
 * Created by Nick on 1/26/2016.
 */
module.exports =  function(bookshelf){
    var Person = bookshelf.model.extend({
        tableName: "Customer"
    });
    return Person;
};