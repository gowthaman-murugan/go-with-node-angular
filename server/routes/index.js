 var auth = require('../../config/authorization');

 module.exports = function(app) {


     var article = require('../controllers/articleController');
     app.route('/api/articles')
         .post(auth.requiresLogin,article.create)
         .get(auth.requiresLogin, article.getArticles);
     app.route('/api/articles/:articleId')
         .get(article.show)
         .put(article.update);
     app.param('articleId', article.getArticleById);

     var user = require('../controllers/userController');

     app.get('/api/login', function(req, res) {
         res.render('login', {
             user: req.user
         });
     });

     app.route('/api/auth/users')
         .post(user.create);

     app.route('/api/auth/session')
         .get(auth.requiresLogin, user.session)
         .post(user.login)
         .delete(user.logout)

 };
