var Article = require('../models/article');
var _ = require('underscore');

exports.create = function(req, res) {
    var article = new Article(req.body);
    article.author = req.user;
    article.save(function(err, article) {
        if (err) {
            return res.json(400, err);
        }

        return res.jsonp(article).status(200);
    });
};
 
exports.update = function(req, res) {
    var article = req.article;
    article = _.extend(article, req.body);
    article.save(function(err, article) {
        if (err) {
            return res.json(400, err);
        }
        return res.jsonp(article).status(200);
    });
}

exports.show = function(req, res) {
    return res.jsonp(req.article).status(200);
};

exports.getArticles = function(req, res) {
    Article.find({
        "author": req.user._id
    }, function(err, articles) {
        if (err) {
            return res.jsonp(500, {
                error: 'Error while fetching articles'
            });
        }
        return res.jsonp(articles).status(200);
    })
};

exports.getArticleById = function(req, res, next, id) {
    Article.findOne({
        "_id": id
    }, function(err, article) {
        if (err) {
            return res.jsonp(500, {
                error: 'Error while fetching article'
            });
        }
        req.article = article;
        next();

    })
};
