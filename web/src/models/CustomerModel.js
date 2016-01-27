define(function(require){
    var Backbone = require('backbone'),
        _ = require('underscore'),
        Person = require('./PersonModel.js');

    var Customer = Person.extend({
        defaults: _.extend({}, Person.prototype.defaults, {
            companyName: "",
            phone: {
                mobile: 0,
                work: 0
            },
            skype: ""
        }),
        url: "/customers",
        idAttribute: "id"
    });
    return Customer;
});