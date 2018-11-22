var users = require('./../db/models/users.js'),
    jwt = require('jsonwebtoken'),
    config = require('./../config/config.js');

module.exports = {
	/**
	 * Login Authentication Module
	 */
	auth: function(request, callback) {
		users.ifExists([{userName: request.userName}], function(output) {				
			if(output){
				request.time = new Date();				
				users.fetch({userName: request.userName}, function(response){
					if(response[0].password == request.password){
						const generatedToken = jwt.sign({exp: config.TOKEN_LIFE, data: request.userName}, config.SECRET);
						users.update({userName : request.userName}, {token : generatedToken, tokenCreatedOn: new Date()}, function(responseUpdate){
							console.log(responseUpdate);																					
							output = {
								status: 200,
								msgCode: 'LOGIN_SUCCESSFULL',
								message: 'User loggedIn successfully. Use generated token for furhter auth. Token will be live for 12 hours.',
								token: generatedToken,									
							};
							callback(output);
						});
					}						
				});
			}
			else{
				output = {
					status: 204,
					msgCode: 'USER_NOT_EXISTS',
					message: 'User with this username not exists in our system'	
				};
				callback(output);
			}
		});
	}
};

/**
 * FUNCTIONS
 */

function generateToken() {
  var token = "";
  var alphaNumericSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 51; i++)
    token += alphaNumericSet.charAt(Math.floor(Math.random() * alphaNumericSet.length));

  return token;
} 
