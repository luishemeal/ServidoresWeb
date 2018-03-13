
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





router.route('/')	
	.get(function(req, res){
		mongoose.model('personas').find({}, 
			function(err, personas){
				if (err) {
					return console.error(err); 
				} else {
					console.log(personas);
					res.format({
						html:function () {
							res.render('personas/index',
								{title:'Lista personas', 'personas':personas});
						},
						json:function () {
							res.json(personas);
						}
					});
				}
			});
	});

router.get('/agregar', function(req,res){
	res.render('personas/agregar',{title: "Agregar Persona"});
});

router.post('/guardar',function(req, res){
		var nombre = req.body.nombre;
		var apellido= req.body.apellido;
		var telefono = req.body.telefono;
		var email= req.body.email;
		var fecha_nacimiento = req.body.fecha_nac;


		mongoose.model('personas').create({'nombre' : nombre,
			'apellido' : apellido,
			'telefono' : telefono,
			'email' : email,
			'fecha_nacimiento' : fecha_nacimiento}, 
			function(error, persona){
				if (error) {
					res.send("Error al guardar dato"); 
				} else {
					console.log("Dato Guardado" + persona);
					res.format({
						html:function (argument) {
							res.location("/personas");
							res.redirect("/personas");
						},
						json: function(){
							res.json(persona);
						}
					});
				}
			});
	});

router.get('/editar/:email', function(req,res){
	mongoose.model('personas').findOne({'email':req.params.email}, function(error,persona){
		if(error)
			console.log("no se encontro");
		else{
			console.log(persona);
			res.format({
				html:function(){
					res.render('personas/editar',{title:"Editar Persona", 'persona':persona});
				}
			});
			
		}
	});
});


router.post('/editar',function(req, res){
		var nombreN = req.body.nombre;
		var apellidoN= req.body.apellido;
		var telefonoN = req.body.telefono;
		var emailN= req.body.email;
		var fecha_nacimientoN = req.body.fecha_nac;

		mongoose.model('personas').update({'email': emailN},{'nombre' : nombreN,
			'apellido' : apellidoN,
			'telefono' : telefonoN,
			'email' : emailN,
			'fecha_nacimiento' : fecha_nacimientoN},
			function(error,persona){
				if(error){
					res.send("Error al actualizar dato");
				} else {
					console.log("Dato actualizado" + persona);
					res.format({
						html:function(argument){
							res.location("/personas");
							res.redirect("/personas");
						},
						json: function(){
							res.json(persona);
						}
					});
				}
			});
	});


router.get('/eliminar/:email', function(req,res){
	mongoose.model('personas').remove({'email': req.params.email}, function(error,persona){
		if(error)
			console.log("no se elimino");
		else{
			console.log("Dato eliminado" + persona);
					res.format({
						html:function(argument){
							res.location("/personas");
							res.redirect("/personas");
						},
						json: function(){
							res.json(persona);
						}
					});
		}
	});
});


router.get('/buscarEspecifico', function(req,res){
	res.render('personas/buscar',{title: "Agregar Persona"});
});

router.post('/buscarPer',function(req, res){
	var NombreBuscado = req.body.nombre;
		mongoose.model('personas').find({'nombre': NombreBuscado},function(error,personas){
				if(error){
					res.send("Error al buscar dato");
				} else {
					console.log("Dato encontrado" + personas);
					res.format({
						html:function (argument) {
							res.render('personas/index',
								{title:'Lista personas', 'personas':personas});
						},
						json:function () {
							res.json(personas);
						}
					});
				}
			});
	});


router.get('/ejemploPer', function(req,res){
	mongoose.model('personas').find({}, function(err,personas){
		if(error)
			console.log("no se hizo la consulta");
		else{
			console.log("consulta hecha" + personas);
					res.format({
						html:function (argument) {
							res.render('personas/index',
								{title:'Lista personas', 'personas':personas});
						},
						json:function () {
							res.json(personas);
						}
					});
		}
	});
});

router.get('/login', function(req,res){
	res.render('personas/login',{title: "Iniciar Sesion"});
});

router.post('/login',function(req, res){
	var usuarioBuscado = req.body.nombreUsuario;
	var contraBuscado = req.body.password;
		mongoose.model('personas').find({'nombreUsuario': usuarioBuscado, 'contrasenia': contraBuscado},function(error,usuario){			
					if (err) {
					return console.error(err); 
					res.send("Error al buscar dato");
					} else {
					console.log("Dato encontrado" + usuario);
					
						res.format({
							html:function () {
								res.render('personas/bienvenido',
									{title:'Bienvenido', 'usuario':usuario});
							},
							json:function () {
								res.json(usuario);
							}
						});
					}
			});
	});

module.exports = router;






