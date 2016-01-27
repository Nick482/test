var express = require('express');
var router = express.Router();
var Person = require('../models/Person');
var Customer = require('../models/Customer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/customers', function(req, res, next){
    new Customer().fetchAll().then(
        function(records){
            if(records.length == 0){res.status(200).send([])}
            else{
                res.status(200).send(records)}
        }
    )
});

router.post('/customers', function(req, res, next){
    var customer = new Customer(req.body);
    customer.save().then(function(model){
        res.status(200).send(model)
    })
});

router.put('/customers', function(req, res, next){
        var customer = new Customer(req.body);
        if (customer.attributes.dateOfBirth == ""){
            customer.attributes.dateOfBirth = null
        }
        customer.save();
        res.status(200).send(customer);
});

router.delete('/customers', function(req, res, next){
    var customer = new Customer(req.body);
    console.log(customer);
    customer.destroy().then(function(){
        res.status(200)
    }
    )
});

module.exports = router;
