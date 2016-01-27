/**
 * Created by Nick on 1/26/2016.
 */
define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery');

    var mainTemplate = require('text!./templates/mainTemplate.htm');
    var CustomerModel = require('./models/CustomerModel.js');
    var CustomerView = require('./customerView.js');

    var Main = Backbone.View.extend({

        el: mainTemplate,

        events: {
            "click button#add": "_add",
            "keyup input": "_change"
        },

        initialize: function () {
            this.model = new CustomerModel();
            this.render();
            this._getrecords();
        },

        _getrecords: function(){
            $.ajax({
                type: "GET",
                url: '/customers'
            }).done(function(customerRecords){
                customerRecords.forEach(
                    function(record){
                        self.customerView = new CustomerView({model: new CustomerModel(record)});
                    }
                )
            })
        },

        _add : function(){
            var self = this;
            this.model.set("dateOfBirth", $("#dateOfBirth").val());
            this.model.save().done(function(model){
                    self.model.set(model);
                    self.customerView = new CustomerView(
                        {model: self.model}
                    );
                    self.model = new CustomerModel();
                }

            );
        },
        _change: function(event){
            var currentTarget = $(event.currentTarget),
                value = $(event.currentTarget).val(),
                data = currentTarget.data("attr").split(":");

            if(data.length > 1){
                var attr = this.model.get(data[0]);
                attr[data[1]] = value;
                this.model.set(data[0], attr)
            }
            else {
                this.model.set(data[0], value)
            }
        },

        render: function () {
            $('body').append(this.$el)
        }
    });

    return Main;
});