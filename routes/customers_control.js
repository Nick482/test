/**
 * Created by Nick on 2/4/2016.
 */
var Customer = require('../models/Customer');

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
        var customer = new Customer(req.body);
        customer.save().then(function (model) {
            res.status(200).send(model)
        })
    });

    router.put('/customers_control', function (req, res, next) {
        var customer = new Customer(req.body);
        if (customer.attributes.dateOfBirth == "") {
            customer.attributes.dateOfBirth = null
        }
        customer.save();
        res.status(200).send(customer);
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