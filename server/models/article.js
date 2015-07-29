var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
     },
    author: {
        type: Schema.ObjectId,
        ref: 'User' 
    }
});


module.exports = mongoose.model('Article', articleSchema);
