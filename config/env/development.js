var port = 3002 ;

module.exports = {
	port: port,
	db: 'mongodb://localhost:27017/myDB',
	  templateEngine: 'swig',

	facebook: {
		clientID: '******************************',
		clientSecret: '******************************',
		callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
	},
	twitter: {
		clientID: '******************************',
		clientSecret:'******************************',
		callbackURL: 'http://localhost:'+ port +'/oauth/twitter/callback'
	}
};