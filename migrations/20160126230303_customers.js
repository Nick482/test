
exports.up = function(knex, Promise) {
    return knex.schema.createTable("Customer", function (table) {
           table.increments();
           table.json("name");
           table.date("dateOfBirth");
           table.string("companyName");
           table.json("phone");
           table.string("skype");
           table.timestamps();
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Customer')
};