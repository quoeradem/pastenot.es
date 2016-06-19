var fs          = require('fs');
var moment      = require('moment');
var mongoose    = require('mongoose');
var phonetic    = require('phonetic');
var Promise     = require('bluebird');

import Paste from './models/paste';
import config from '../shared/config';

/* init mongoose connection */
mongoose.connect(config.mongoURI);

export default function routes(router) {
    router.get('/about', async (ctx) => { /* GET :: retrieve about page */
        const aboutContent = fs.readFileSync('./assets/about.md', {encoding: 'utf-8'});
        ctx.body = JSON.stringify({kind: "paste#about", content: aboutContent});
    })

    router.get('/paste/v1/:id', async (ctx, next) => { /* GET :: retrieve paste */
        let id = ctx.params.id;

        if(id === 'undefined') {
            ctx.body = "Paste not found m8";
            ctx.status = 404;
        } else {
            var resolver = Promise.defer();

            Paste.findOneAndUpdate({id: id}, { $inc: {"meta.views": 1} }, function(err, paste) {
                if(err) throw err;
                if(paste == null) {
                    resolver.resolve("Not found")
                } else {
                    resolver.resolve(JSON.stringify({
                        kind: "paste#note",
                        id: paste.id,
                        content: paste.content,
                        language: paste.language,
                        meta: paste.meta
                    }))
                }
            });
            ctx.body = await resolver.promise;
        }
    })

    router.post('/paste/v1/paste', async (ctx, next) => { /* POST :: save paste */
        let content = ctx.request.body.content;
        let language = ctx.request.body.language;

        let lc = content.split(/\n/).length; // CM uses LF for linebreaks, not CRLF.
        let cc = content.length - lc + 1;

        /* Recursive function wrapper for 'phonetic' to generate unique ids
        TODO: implement 'compoundSimplicity' and 'seed' options */
        function getUUID(syllables, simplicity, cb) {
            // increase syllables if simplicity reaches 0
            if(simplicity == 0) {
                syllables++;
                simplicity = 5;
            }
            let _id = phonetic.generate({ syllables: syllables, phoneticSimplicity: simplicity});
            Paste.count({id: _id}, function(err, count) {
                if(!err && count == 0) { /* _id not found in collection -> callback */
                    cb(_id);
                } else { /* _id exists -> recurse */
                    getUUID(syllables, --simplicity, cb);
                }
            });
        }

        if(cc < 5) {
            ctx.body = "Paste is too short."
            ctx.status = 400;
        } else {
            var resolver = Promise.defer();
            getUUID(2, 5, function(uuid) {
                let newPaste = new Paste({
                    id: uuid, content: content, language: language,
                    meta: { created: moment().toISOString(), char_count: cc, line_count: lc, views: 0 }
                });
                newPaste.save();

                resolver.resolve(JSON.stringify({
                    kind: "paste#note",
                    id: newPaste.id,
                    meta: newPaste.meta,
                }))
            });
        }
        ctx.body = await resolver.promise;
    })
}