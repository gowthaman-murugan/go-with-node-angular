var app = require('../app');
var config = require('../config/config');


app.set('port', process.env.PORT || config.port);
   
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port + '(' +  process.env.NODE_ENV + ')');
});
