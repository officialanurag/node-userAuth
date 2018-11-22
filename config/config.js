/**
 * CREATED ON 21 NOV, 2018
 * DESCRIPTION: Configuration File of Project
 */

const config = {
	
	/**
	 * Database Configurations
	 */
	DB_CONNECTION: 'mongodb',
	DB_HOST: 'localhost',
	DB_PORT: 27017,
	DB_DATABASE: 'myDB',
	DB_USERNAME: '',
	DB_PASSWORD: '',

	/**
	 * SMTP Mail Configurations
	 */
	MAIL_DRIVER: 'smtp',
	MAIL_HOST: '',
	MAIL_PORT: '465',
	MAIL_USERNAME: '',
	MAIL_PASSWORD: '',
	MAIL_ENCRYPTION: '',

	/**
	 * Token Configuration
	 */
	SECRET: 'fssdafdsvregsdafasdgretbfdbvfdbd',
	PORT: 3000,
	TOKEN_LIFE: Math.floor(Date.now() / 1000) + (10 * (60 * 60)),
	REFRESH_TOKEN_SECRET: 'asdgfdsvrtnfdbfgnfddbnsdfb',
	REFRESH_TOKEN_LIFE: 86400
	 
};


module.exports = config;