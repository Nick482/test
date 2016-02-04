define(['backbone'], function(Backbone){

var Person = Backbone.Model.extend({
        defaults: {
        name: {
            first: "",
            last: ""
        },
        dateOfBirth: ""
    },
        url: "/persons_control",
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
        }
    }

});
    return Person;
});