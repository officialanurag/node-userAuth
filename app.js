/**
 * CREATED ON 20 NOV, 2018
 * DESCRIPTION: REST APIs for twitt resemblance
 */

var app    = require('express')(),	
	bodyParser = require('body-parser'),	
	middleware = require('./routes/middlewares/route'),	
	login = require('./core/login'),
	register = require('./core/register');	

/**
 * To read POST data
 * ACCEPT: 'Content-Type': 'application/x-www-form-urlencoded'
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * PORT: By default or 8080
 * NATURE: Variable
 */
var port = process.env.PORT || 8080;

/**
 * Middleware for every request
 * LOGGING
 */
middleware.init(app); 

/**
 * DESCRIPTION: All POST API requests will be listen here  
 * API version v1.0.0 
 */

app.post('/api/v1.0.0/:api', function(req, res) {	
	var output;
	switch(req.params.api){

		/* API: User registration */
		case 'register':
			register.createUser(req.body, function(output){
				res.status(200).json(output);
			});					
		break;

		/* API: User Login */
		case 'login':
			login.auth(req.body, function(output) {
				res.status(200).json(output);
			});				
		break;

		case 'test':
			res.status(200).json('hello');
		break;

		/* INVALID API PATH */
		default:
			output = {
				status: 404,
				msgCode: 'INVALID_PATH'	
			};
			res.status(404).json(output);
		break;	
	}	
});



app.listen(port, ()=>{console.log('Magic happens on port ' + port)});

