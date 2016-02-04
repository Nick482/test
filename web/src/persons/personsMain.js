/**
 * Created by Nick on 2/4/2016.
 */
define(['backbone', 'jquery',
    'text!./template/personsMainTemplate.htm',
    './model/PersonModel.js',
    './personsView.js'], function(Backbone, $, mainTemplate, PersonModel, PersonsView) {

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

        _add : function(){
            var self = this;
            this.model.set("dateOfBirth", $("#dateOfBirth").val());
            this.model.save().done(function(model){
                    self.model.set(model);
                    self.personsView = new PersonsView(
                        {model: self.model}
                    );
                    self.model = new PersonModel();
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

    return PersonsMain;
});