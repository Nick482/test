define(['backbone'], function(Backbone){

var Person = Backbone.Model.extend(
    {defaults: {
        name: {
            first: "",
            last: ""
        },
        dateOfBirth: ""
    },
        url: "/persons_control",
        idAttribute: "id"
    }
	);
    return Person;
});