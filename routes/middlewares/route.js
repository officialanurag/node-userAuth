var config = require('./../../config/config.js'),
	jwt = require('jsonwebtoken');

module.exports = {
	init: function (route){
		route.use(function(req, res, next) { 
			nrUrl = ['/api/v1.0.0/login', '/api/v1.0.0/register'];
			if(!nrUrl.includes(req.url)){
				const token = req.headers['x-access-token']
			    if (token) {				    
				    jwt.verify(token, config.SECRET, function(err, decoded) {
				        if (err) {
				            return res.status(401).json({status:401, msgCode: 'UNAUTHORIZED_ACCESS', message: 'Your token is expired. Pleas login again' });
				        }
					    req.decoded = decoded;
					    next();
				    });
				} 
				else {				    
				    return res.status(403).send({
				        status: 403,
				        msgCode: 'TOKEN_REQUIRED',
				        message: 'No token provided.'
				    });
				}
			}
			else{
				next();
			}		    
		});
	}
}	