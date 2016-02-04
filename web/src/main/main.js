/**
 * Created by Nick on 1/26/2016.
 */
define(['backbone',
        'text!./template/mainTemplate.htm'], function(Backbone, mainTemplate) {

    var Main = Backbone.View.extend({

        el: mainTemplate,

        events: {
            "click button#viewPersons": "_viewPersons",
            "click button#viewCustomers": "_viewCustomers"
        },

        initialize: function () {
            this.render();
        },

        _viewPersons: function(){
            window.location.href = "/persons"
        },

        _viewCustomers: function(){
            window.location.href = "/customers"
        },

        render: function () {
            $('body').append(this.$el)
        }
    });

    return Main;
});