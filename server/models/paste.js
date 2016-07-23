const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const phonetic = require('phonetic');
const moment   = require('moment');

const pasteSchema = new Schema({
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

const Paste = mongoose.model('Paste', pasteSchema);

pasteSchema.pre('save', async function (next) {
    const syllables = 2, simplicity = 5;

    this.id = await getUUID(syllables, simplicity);
    this.created = await moment().toISOString();

    const lines = this.content.split(/\n/).length; // Linebreaks will always be LF (never CRLF).
    this.meta.lines = lines;
    this.meta.chars = this.content.length - lines + 1;
    next();

    /* recursive fn to generate UUID for paste */
    async function getUUID(_syllables, _simplicity) {
        let syllables = _syllables, phoneticSimplicity = _simplicity;
        if(simplicity === 0) {
            syllables++;
            phoneticSimplicity = 5;
        }
        const uuid = phonetic.generate({capFirst: false, syllables, phoneticSimplicity});
        const count = await Paste.count({id: uuid});

        return count ? await getUUID(syllables, --phoneticSimplicity) : uuid;
    }
})

module.exports = Paste;