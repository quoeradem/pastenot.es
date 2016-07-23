const fs          = require('fs');
const mongoose    = require('mongoose');
const jwt         = require('jsonwebtoken');

import Paste from './models/paste';
import config from '../shared/config';

/* init mongoose connection */
mongoose.connect(config.mongoURI);

export default function routes(router) {
    router.get('/about', async ctx => {
        const aboutContent = fs.readFileSync('./assets/about.md', {encoding: 'utf-8'});
        ctx.body = JSON.stringify({kind: "paste#about", content: aboutContent});
    })

    router.get('/paste/v1/:id', async (ctx, next) => {
        const paste = await Paste.findOne({id: ctx.params.id});
        if(paste === null) {
            ctx.body = JSON.stringify({
                error: {
                    errors: [{
                        domain: "global",
                        reason: "notFound",
                        message: `Paste not found ${ctx.params.id}`,
                    }],
                    code: 404,
                    message: `Paste not found ${ctx.params.id}`
                }
            })
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

    router.get('/paste/v1/paste/history', async (ctx, next) => {
        let uid = null; try { // Get user ID ⇔ ∃ auth cookie ^ JWT valid
            const token = await ctx.cookies.get('authtoken');
            uid = jwt.verify(token, config.secret).id;
        } catch(ignore) {
            // Silence is golden.
        }

        if(uid !== null) { // User is valid
            const pastes = await Paste.find({user: uid}).sort('-created');

            const items = pastes.map(arr => (
                {
                    kind: "paste#note",
                    id: arr.id,
                    content: arr.content.substring(0, 200),
                    language: arr.language,
                    meta: arr.meta,
                    status: arr.status,
                    created: arr.created
                }
            ));

            ctx.body = JSON.stringify({
                totalItems: pastes.length,
                itemsPerPage: 30,
                nextPageToken: "",
                items,
            });
        } else { // User was either invalid or not provided
            ctx.body = "An error in MY api call?";
            ctx.status = 403;
        }
    })

    router.put('/paste/v1/:id', async (ctx, next) => {
        const paste = await Paste.findOneAndUpdate({id: ctx.params.id}, {$inc: {"meta.views": 1}});
        if(paste === null) {
            ctx.body = JSON.stringify({
                error: {
                    errors: [{
                        domain: "global",
                        reason: "notFound",
                        message: `Paste not found ${ctx.params.id}`,
                    }],
                    code: 404,
                    message: `Paste not found ${ctx.params.id}`
                }
            })
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
        const content = ctx.request.body.content;

        let uid = null; try { // Get user ID ⇔ ∃ auth cookie ^ JWT valid
            const token = await ctx.cookies.get('authtoken');
            uid = jwt.verify(token, config.secret).id;
        } catch(ignore) {
            // Silence is golden.
        }

        let paste = null;
        if(content.replace(/\s/g, '').length - 5 >>> 0 > 39995) { // [5,40000]
            ctx.body = JSON.stringify({
                error: {
                    errors: [{
                        domain: "global",
                        reason: "invalidParameter",
                        message: "Invalid length for content. Value must be within the range: [5, 40000]",
                        locationType: "parameter",
                        location: "content"
                    }],
                    code: 400,
                    message: "Invalid length for content. Value must be within the range: [5, 40000]",
                }
            })
        } else if(uid !== null) { // User is valid
            paste = await new Paste({
                content,
                language: ctx.request.body.language,
                user: uid,
            }).save();
        } else { // User was either invalid or not provided -- save as anonymous.
            paste = await new Paste({
                content,
                language: ctx.request.body.language,
            }).save();
        }

        ctx.body = JSON.stringify({
            kind: "paste#note",
            id: paste.id,
            meta: paste.meta,
        })
    })
}