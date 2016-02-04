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
        idAttribute: "id",
        validation: {
            companyName: {
                required: true,
                msg: "Please enter company name"
            },
            'phone.mobile': {
                    required: true,
                    msg: "Please enter mobile phone"
            },
            'phone.work': {
                    required: true,
                    msg: "Please enter work phone"
            },
            skype: {
                required: true,
                msg: "Please enter Skype ID"
            }
        }
    });
    return Customer;
});