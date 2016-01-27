
exports.up = function(knex, Promise) {
    return  knex.schema.createTable("Person", function (table) {
            table.increments();
            table.json("name");
            table.date("dateOfBirth");
            table.timestamps();
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Person')
};