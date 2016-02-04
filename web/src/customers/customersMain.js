/**
 * Created by Nick on 2/4/2016.
 */
define(['backbone', 'jquery', 'validation',
        'text!./template/customersMainTemplate.htm',
        './model/CustomerModel.js',
        './customersView.js'], function(Backbone, $, Validation, customersMainTemplate, CustomerModel, CustomersView) {

    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + '"' + attr + '"' + ']'),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + '"' + attr + '"' + ']'),
                $group = $el.closest('.form-group');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });

    var CustomersMain = Backbone.View.extend({

        el: customersMainTemplate,

        events: {
            "click button#add": "_add",
            "keyup input": "_change"
        },

        initialize: function () {
            this.model = new CustomerModel();
            this.render();
            this._getrecords();

            Backbone.Validation.bind(this, {model : this.model});
        },

        _getrecords: function(){
            $.ajax({
                type: "GET",
                url: '/customers_control'
            }).done(function(customerRecords){
                customerRecords.forEach(
                    function(record){
                        self.customersView = new CustomersView({model: new CustomerModel(record)});
                    }
                )
            })
        },

        _add : function(event){
            event.preventDefault();
            this.model.set("dateOfBirth", $("#dateOfBirth").val());
            var self = this;
            if(this.model.isValid(true)) {
                this.model.save().done(function (model) {
                        self.model.set(model);
                        console.log(self.model);
                        self.customersView = new CustomersView(
                            {model: self.model}
                        );
                        self.model = new CustomerModel();
                    }
                );
            }
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

    return CustomersMain;
});