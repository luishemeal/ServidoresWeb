//Nuevo controlador
var express = require('express');
var router = express.Router(),
	mongoose = require('mongoose'), //usando la coma no hace falta usar la palabra reservada "var"
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');


router.use(bodyParser.urlencoded({extended:true}));

router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body == 'object' && '_method' in req.body) {
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
