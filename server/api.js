var fs          = require('fs');
var moment      = require('moment');
var mongoose    = require('mongoose');
var phonetic    = require('phonetic');
var Promise     = require('bluebird');
var jwt         = require('jsonwebtoken');

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
                meta: paste.meta,
                status: paste.status,
            })
        }
    })

    router.get('/paste/v1/paste/history', async (ctx,next) => {
        // Read JWT from cookie, verify, and return user ID
        let token = await ctx.cookies.get('token');
        var uid; try {uid = jwt.verify(token, config.secret).id} catch(err) {};

        if(typeof uid !== 'undefined') { // User is valid
            const pastes = await Paste.find({user: uid}).sort('-created');

            let items = pastes.map(arr => {return {
                kind: "paste#note",
                id: arr.id,
                content: arr.content.substring(0, 200),
                language: arr.language,
                meta: arr.meta,
                status: arr.status,
                created: arr.created
            }});

            ctx.body = JSON.stringify({
                totalItems: pastes.length,
                itemsPerPage: 30,
                nextPageToken: "",
                items: items
            });
        } else { // User was either invalid or not provided
            ctx.body = "An error in MY api call?";
            ctx.status = 403;
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
                meta: paste.meta,
                status: paste.status
            })
        }
    })

    router.post('/paste/v1/paste', async (ctx, next) => {
        let content  = ctx.request.body.content;
        let language = ctx.request.body.language;
        let lines    = content.split(/\n/).length; // Linebreaks will always be LF (never CRLF).
        let chars    = content.length - lines + 1;

        // Read JWT from cookie, verify, and return user ID
        let token = await ctx.cookies.get('token');
        var uid; try {uid = jwt.verify(token, config.secret).id} catch(err) {};

        var paste;

        if(chars - 5 >>> 0 > 39995) {
            ctx.body = "Invalid paste length. accepted values: 5 < length < 40000"
            ctx.status = 400;
        } else if(typeof uid !== 'undefined') { // User is valid
            paste = await new Paste({
                content: content, language: language,
                meta: {char_count: chars, line_count: lines, views: 0},
                status: "OK",
                created: moment().toISOString(),
                user: uid,
            }).save();
        } else { // User was either invalid or not provided
            paste = await new Paste({
                content: content, language: language,
                meta: {char_count: chars, line_count: lines, views: 0},
                status: "OK",
                created: moment().toISOString(),
            }).save();
        }

        ctx.body = JSON.stringify({
            kind: "paste#note",
            id: paste.id,
            meta: paste.meta,
        })
    })
}