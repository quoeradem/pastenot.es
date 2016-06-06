var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pasteSchema = new Schema({
    id: { type: String, unique: true },
    content: String,
    language: String,
    meta: {
        created: String,
        char_count: Number,
        line_count: Number,
        views: Number,
    },
});

var Paste = mongoose.model('Paste', pasteSchema);
module.exports = Paste;