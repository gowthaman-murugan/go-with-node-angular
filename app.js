'use strict';

// Module dependencies.

var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var swig = require('swig');
var bodyParser = require('body-parser');
var assetmanager = require('assetmanager');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var compression = require('compression');
var passport = require('passport');
var config = require('./config/config');
var path = require('path');
var workboards = require('./server/routes/index');
var VIEWS_DIR = __dirname + '/public/views';

var app = express();

require('./config/passport')(passport)
mongoose.connect(config.db);

// Only use logger for development environment
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Should be placed before express.static
// To ensure that all assets and data are compressed (utilize bandwidth)
app.use(compression({
    // Levels are specified in a range of 0 to 9, where-as 0 is
    // no compression and 9 is best compression, but slowest
    level: 9
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret: 'Workbo@r$',
    name: 'WB',
    store: new mongoStore({
        db: config.db,
        collection: 'sessions'
    }), // connect-mongo session store
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


var assets = assetmanager.process({
    assets: require('./config/assets.json'),
    debug: (process.env.NODE_ENV !== 'production'),
    webroot: /public\/|views\//g
});
// Add assets to local variables
app.use(function(req, res, next) {
    res.locals.assets = assets;
    next(); 
});


// cache=memory or swig dies in NODE_ENV=production
app.locals.cache = 'memory';
// This is where all the magic happens!
 app.engine('html', swig.renderFile);

app.set('view engine', 'html');
//app.set('views', __dirname + '/public');
app.set('views', VIEWS_DIR);


app.get('/', function(req, res) {
    res.render('index');
});

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({
    cache: false
});
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!



require('./server/routes/index')(app);


/*if (app.get('env') === 'development') {

}*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/views')));


module.exports = app;
