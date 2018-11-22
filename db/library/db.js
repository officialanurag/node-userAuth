/**
 * Created On October 24, 2018
 *
 * Description: Contains mongoDB CRUD functions. It contains driver, connection
 * and method to drive operation on mongoDB. 
 *  
 * Git Link: https://github.com/officialanurag/anu-mongo-node/
 * MIT License
 */

var config = require('./../../config/config.js');

// ------ Settings -------
var URL = config.DB_CONNECTION+'://'+config.DB_HOST+':'+config.DB_PORT+'/';
var DATABASE = config.DB_DATABASE;

/**
 * Creating Connection
 * MongoDB Driver 'mongodb'
 */

try{
	var mongo = require('mongodb').MongoClient; 	
	var ObjectID = require('mongodb').ObjectID;
	emit('MongoDB client initiated successfully.');	
}
catch(err){
	emit("You don't have installed MongoDB driver for Node Js.");
	emit("Please run this command in console: npm install mongodb --save");	
}

var COLLECTION = '';

/**
 * Description: To connect mongodb instance and proceed with given action.
 * @method anu_mongo_exec
 * 
 */

function anu_mongo_exec(action,payload,condition, callback){	
	mongo.connect(URL, { useNewUrlParser: true }, function(err, db){
		var dbo = db.db(DATABASE);
		switch(action){
			case 'insertOne':						        
				dbo.collection(COLLECTION).insertOne((payload)[0], function(err, res) {
				    if (err) throw err;
				    emit('Query Result: ' + res.result);
				    emit('Inserted Documents: ' + res.insertedCount);
				    callback(res.ops);
				    db.close();
				});			
			break;

			case 'insert':
				dbo.collection(COLLECTION).insertMany(payload, function(err, res) {
				    if (err) throw err;
				    emit('Query Result: ' + JSON.stringify(res.result));
				    emit('Inserted Documents: ' + res.insertedCount);
				    callback(res.ops);
				    db.close();
				});
			break;

			case 'delete':
				dbo.collection(COLLECTION).deleteMany(payload, function(err, res) {
				    if (err) throw err;
				    emit(res.result.n + " document(s) deleted");
				    db.close();
				});
			break;

			case 'update':
				dbo.collection(COLLECTION).updateOne(condition, {$set: payload}, function(err, res) {
				    if (err) throw err;
				    emit(res.result.nModified + " document(s) updated");
				    callback(res.result);
				    db.close();
				});
			break;	

			case 'fetch':
				dbo.collection(COLLECTION).find(payload).toArray(function(err, res) {
				    if (err) throw err;				    
				    callback(res);
				    db.close();
				});
			break;		
		}
	});			
}

module.exports = {
	/**
	 * Description: Setting collection name
	 */

	setCollection: function (collectionName) {
		COLLECTION = collectionName;
	},

	/**
	 * Description: To insert data in mongoDB.
	 * @method insert
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */

	insert : function (payload, callback){
		var count = Object.keys(payload).length;					
		if(count == 1){
			anu_mongo_exec('insertOne', payload, null, function(output) {
				callback(output);
			});
		}
		else{
			anu_mongo_exec('insert', payload, null, function(output) {
				callback(output);
			});
		}		
	},

	/**
	 * Description: To update data in mongoDB.
	 * @method update
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */

	update : function (condition, payload, callback){	
		anu_mongo_exec('update', payload, condition, function(output) {
			callback(output);
		});
	}, 

	/**
	 * Description: To delete data in mongoDB.
	 * @method delete
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */	

	delete : function (payload, callback){	
		anu_mongo_exec('delete', payload, null, function(output) {
			callback(output);
		});
	},

	/**
	 * Description: To fetch data from mongoDB.
	 * @method fetch
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */	

	fetch : function (payload, callback){	
		anu_mongo_exec('fetch', payload, null, function(output) {
			callback(output);
		});
	},

	/**
	 * Description: To check if data is already present in mongoDB.
	 * @method ifExists
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */

	ifExists : function (payload, callback){				
		anu_mongo_exec('fetch', { $or : payload }, null, function(output) {						
			callback(output.length >= 1 ? true : false);
		});
	},

	/**
	 * ObjectID for _id field
	 */

	oid : function(value) {
		return ObjectID(value);
	}
}




/**
 * Description: To print messages in console.
 * @method emit
 * @param msg
 *
 * @return console output
 */

function emit(msg){
	console.log(msg);
}