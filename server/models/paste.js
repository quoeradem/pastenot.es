var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var phonetic = require('phonetic');

var pasteSchema = new Schema({
    id: {type: String, unique: true},
    content: String,
    language: String,
    meta: {
        char_count: Number,
        line_count: Number,
        views: Number,
    },
    status: String,
    created: String,
    user: String,
});

pasteSchema.pre('save', async function (next) {
    let syllables = 2;
    let simplicity = 5;

    this.id = await getUUID(syllables, simplicity);
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