define(['backbone', 'underscore',
        'src/persons/model/PersonModel.js'], function(Backbone, _, Person){

    var Customer = Person.extend({
        defaults: _.extend({}, Person.prototype.defaults, {
            companyName: "",
            phone: {
                mobile: "",
                work: ""
            },
            skype: ""
        }),
        url: "/customers_control",
        idAttribute: "id",
        validation: {
            'name.first': {
                required: true,
                msg: "Please enter first name"
            },
            'name.last': {
                required: true,
                msg: "Please enter last name"
            },
            dateOfBirth: {
                required: true,
                msg: "Please enter date of birth"
            },
            companyName: {
                required: true,
                msg: "Please enter company name"
            },
            'phone.work': {
                required: true,
                msg: "Please enter work phone"
            },
            'phone.mobile': {
                    required: true,
                    msg: "Please enter mobile phone"
            },
            skype: {
                required: true,
                msg: "Please enter Skype ID"
            }
        }
    });
    return Customer;
});