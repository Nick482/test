/**
 * Created by Nick on 2/4/2016.
 */
var Customer = require('../models/Customer');
var Checkit = require('checkit');

module.exports = function(router) {
    router.get('/customers_control', function (req, res, next) {
        new Customer().fetchAll().then(
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

    router.post('/customers_control', function (req, res, next) {
        var checkit = new Checkit({
            name: 'object',
            dateOfBirth: 'alphaDash',
            companyName: 'alphaDash',
            phone: "object",
            skype: 'alphaDash'
        });
        var customer = new Customer(req.body);
        checkit.run(req.body).then(function(validated){
            customer.save().then(function (model) {
                res.status(200).send(model)
            })
        }).catch(function(error){
            console.log("error occurred")
        })
    });

    router.put('/customers_control', function (req, res, next) {
        var checkit = new Checkit({
            name: 'object',
            dateOfBirth: 'alphaDash',
            companyName: 'alphaDash',
            phone: "object",
            skype: 'alphaDash'
        });
        var customer = new Customer(req.body);
        checkit.run(req.body).then(function(validated) {
            customer.save();
            res.status(200).send(customer);
        }).catch(function(error){
            console.log("error occurred")
        })
    });

    router.delete('/customers_control', function (req, res, next) {
        var customer = new Customer(req.body);
        console.log(customer);
        customer.destroy().then(function () {
                res.status(200)
            }
        )
    });
};