const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:  {type: String, require: true},
    image:  {type: String, require: true},
    category: {type: String, require: true},
    content:  {type: String, require: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false}
}, {timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);