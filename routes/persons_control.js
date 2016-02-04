/**
 * Created by Nick on 2/4/2016.
 */
var Person = require('../models/Person');

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
        var person = new Person(req.body);
        person.save().then(function (model) {
            res.status(200).send(model)
        })
    });

    router.put('/persons_control', function (req, res, next) {
        var person = new Person(req.body);
        if (person.attributes.dateOfBirth == "") {
            person.attributes.dateOfBirth = null
        }
        person.save();
        res.status(200).send(person);
    });

    router.delete('/persons_control', function (req, res, next) {
        var person = new Person(req.body);
        console.log(person);
        person.destroy().then(function () {
                res.status(200)
            }
        )
    });
};