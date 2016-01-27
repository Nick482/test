/**
 * Created by Nick on 1/27/2016.
 */
define(function(require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery');

    var customerTemplate = _.template(require('text!./templates/customerTemplate.htm'));

    var CustomerView = Backbone.View.extend({

        events: {
        "click #delete": "_delete",
        "click #update": "_update",
        "keyup input": "_change"
        },

        el: function(model){
            return customerTemplate({model: model})
        },

        constructor: function (options) {
            this.model = options.model;
            this.initialize();
        },

        initialize: function () {
            var mod = this.model.toJSON();
            if (typeof mod.name === 'string') {
                this.model.set("name", JSON.parse(mod.name));
            }
            var date = new Date(this.model.get("dateOfBirth"));
            var year = date.getFullYear();
            var month = date.getDate().length > 1 ? date.getDate() : "0" + date.getDate();
            var day = date.getDay().length > 1 ? date.getDay() : "0" + date.getDay();

            var formattedDate = [year, month, day].join("-");
            this.model.set("dateOfBirth", formattedDate);
            this.setElement(this.el(this.model.toJSON()));
            this.render()
        },

        _update: function(event){
            var self = this;
            this.model.set("dateOfBirth", $("#dateOfBirth").val());
            this.model.save().done(function(model) {
                self.model.set(model);
            })
        },

        _delete: function(event){
            console.log(this.model);
            this.model.destroy({
                contentType: 'application/json',
                data: JSON.stringify(this.model)});
            this.$el.remove();
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
    return CustomerView;
});