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
    router.get('/about', async (ctx) => {
        const aboutContent = fs.readFileSync('./assets/about.md', {encoding: 'utf-8'});
        ctx.body = JSON.stringify({kind: "paste#about", content: aboutContent});
    })

    router.get('/paste/v1/:id', async (ctx, next) => {
        const paste = await Paste.findOne({id: ctx.params.id});
        if(paste == null) {
            ctx.body = "Not found";
            ctx.status = 404;
        } else {
            ctx.body = JSON.stringify({
                kind: "paste#note",
                id: paste.id,
                content: paste.content,
                language: paste.language,
                meta: paste.meta
            })
        }
    })

    router.put('/paste/v1/:id', async (ctx, next) => {
        const paste = await Paste.findOneAndUpdate({id: ctx.params.id}, {$inc: {"meta.views": 1}});
        if(paste == null) {
            ctx.body = "Not found";
            ctx.status = 404;
        } else {
            ctx.body = JSON.stringify({
                kind: "paste#note",
                id: paste.id,
                content: paste.content,
                language: paste.language,
                meta: paste.meta
            })
        }
    })

    router.post('/paste/v1/paste', async (ctx, next) => {
        let content  = ctx.request.body.content;
        let language = ctx.request.body.language;
        let lines    = content.split(/\n/).length; // Linebreaks will always be LF (never CRLF).
        let chars    = content.length - lines + 1;

        if(chars - 5 >>> 0 > 39995) {
            ctx.body = "Invalid paste length. accepted values: 5 < length < 40000"
            ctx.status = 400;
        } else {
            const paste = await new Paste({
                content: content, language: language,
                meta: {created: moment().toISOString(), char_count: chars, line_count: lines, views: 0}
            }).save();

            ctx.body = JSON.stringify({
                kind: "paste#note",
                id: paste.id,
                meta: paste.meta,
            })
        }
    })
}