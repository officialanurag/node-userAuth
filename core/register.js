var users = require('./../db/models/users.js');

module.exports = {
	/**
	 * Create User Module
	 */
	createUser: function(request, callback) {
		users.ifExists([{userName: request.userName}, {email: request.email}, {phone: request.phone}], function(output) {				
			if(!output){
				request.time = new Date();
				users.insert([request], function(response){
					output = {
						status: 200,
						msgCode: 'USER_CREATION_SUCCESSFULL',
						message: 'User created succesfully with _id:'+response[0]._id,
						insertedCount: response.length,
						data: response	
					};
					callback(output);
				});
			}
			else{
				output = output = {
					status: 204,
					msgCode: 'USER_EXISTS',
					message: 'Username, email or phone already exists.'	
				};
				callback(output);
			}
		});
	}
}