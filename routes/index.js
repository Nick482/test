var express = require('express');
var router = express.Router();
var Person = require('../models/Person');
var Customer = require('../models/Customer');

require('./persons_control')(router);
require('./customers_control')(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/persons', function(req, res, next){
    res.render('persons');
});

router.get('/customers', function(req, res, next){
    res.render('customers', {title: 'Express'});
});

module.exports = router;
