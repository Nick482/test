define(['backbone', 'underscore',
        'src/persons/model/PersonModel.js'], function(Backbone, _, Person){

    var Customer = Person.extend({
        defaults: _.extend({}, Person.prototype.defaults, {
            companyName: "",
            phone: {
                mobile: 0,
                work: 0
            },
            skype: ""
        }),
        url: "/customers_control",
        idAttribute: "id"
    });
    return Customer;
});