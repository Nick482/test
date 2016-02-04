/**
 * Created by Nick on 2/4/2016.
 */
define(['backbone', 'jquery', 'validation',
    'text!./template/personsMainTemplate.htm',
    './model/PersonModel.js',
    './personsView.js'], function(Backbone, $, Validation, mainTemplate, PersonModel, PersonsView) {

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

    var PersonsMain = Backbone.View.extend({

        el: mainTemplate,

        events: {
            "click button#add": "_add",
            "keyup input": "_change"
        },

        initialize: function () {
            this.model = new PersonModel();
            this.render();
            this._getrecords();

            Backbone.Validation.bind(this, {model : this.model});
        },

        _getrecords: function(){
            $.ajax({
                type: "GET",
                url: '/persons_control'
            }).done(function(personRecords){
                personRecords.forEach(
                    function(record){
                        self.personsView = new PersonsView({model: new PersonModel(record)});
                    }
                )
            })
        },

        _add : function(event){
            event.preventDefault();
            var self = this;
            this.model.set("dateOfBirth", $("#dateOfBirth").val());
            if(this.model.isValid(true)) {
                this.model.save().done(function (model) {
                        console.log(model);
                        self.model.set(model);
                        self.personsView = new PersonsView(
                            {model: self.model}
                        );
                        self.model = new PersonModel();
                    }
                );
            }
        },
        _change: function(event){
            event.preventDefault();
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

    return PersonsMain;
});