/**
 * Created by Nick on 2/4/2016.
 */
var Person = require('../models/Person');
var Checkit = require('checkit');

module.exports = function(router) {
    router.get('/persons_control', function (req, res, next) {
        new Person().fetchAll().then(
            function (records) {
                if (records.length == 0) {
                    res.status(200).send([])
                }
                else {
                    res.status(200).send(records)
                }
            }
        )
    });

    router.post('/persons_control', function (req, res, next) {
        var checkit = new Checkit({
           name: 'object',
           dateOfBirth: 'alphaDash'
        });
        var person = new Person(req.body);
        checkit.run(req.body).then(function(validated){
            person.save().then(function (model) {
                res.status(200).send(model)
            })
        }).catch(function(error){
            console.log("error occurred")
        });
    });

    router.put('/persons_control', function (req, res, next) {
        var checkit = new Checkit({
            name: 'object',
            dateOfBirth: 'alphaDash'
        });
        var person = new Person(req.body);
        checkit.run(req.body).then(function(validated){
            person.save();
            res.status(200).send(person);
        }).catch(function(error){
            console.log("error occurred")
        })
    });

    router.delete('/persons_control', function (req, res, next) {
        var person = new Person(req.body);
        person.destroy().then(function () {
                res.status(200)
            }
        )
    });
};