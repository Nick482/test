define(function(require){

var Backbone = require('backbone');

var Person = Backbone.Model.extend(
	{defaults:{
        name: {
            first: "",
            last: ""
        },
        dateOfBirth: ""
    }}
	);
    return Person;
});