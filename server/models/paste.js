var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var phonetic = require('phonetic');
var moment   = require('moment');

var pasteSchema = new Schema({
    id: {type: String, unique: true},
    content: String,
    language: String,
    meta: {
        chars: Number,
        lines: Number,
        views: {type: Number, default: 0},
    },
    status: {type: String, default: "OK"},
    created: String,
    user: String,
});

pasteSchema.pre('save', async function (next) {
    let syllables = 2;
    let simplicity = 5;

    this.id = await getUUID(syllables, simplicity);
    this.created = await moment().toISOString();

    let lines = this.content.split(/\n/).length; // Linebreaks will always be LF (never CRLF).
    this.meta.lines = lines;
    this.meta.chars = this.content.length - lines + 1;
    next();

    async function getUUID(syllables, simplicity) {
        if(simplicity == 0) {
            syllables++;
            simplicity = 5;
        }
        let uuid = phonetic.generate({capFirst: false, syllables: syllables, phoneticSimplicity: simplicity});
        const count = await Paste.count({id: uuid});

        return !count ? uuid : await getUUID(syllables, --simplicity);
    }
})

var Paste = mongoose.model('Paste', pasteSchema);
module.exports = Paste;