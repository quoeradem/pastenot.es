const jwt = require('jsonwebtoken');
import config from '../shared/config';

export default function routes(router) {
    /* Get GitHub user profile and return JWT */
    router.post('/auth/token', async (ctx, next) => {
        const authcode = ctx.request.body.code;

        const token = await _getAuthToken(authcode);
        const profile = await _getUserProfile(token);

        // generate JWT
        const _token = jwt.sign({id: profile.id, login: profile.login, avatar_url: profile.avatar_url}, config.secret, {expiresIn: 86400});
        ctx.body = await JSON.stringify({token: _token});
    })

    /* Verify JWT and return user profile */
    router.get('/auth/verify', async(ctx, next) => {
        const token = await ctx.cookies.get('authtoken');

        try {
            const decoded = await jwt.verify(token, config.secret);
            ctx.body = await JSON.stringify({
                kind: "paste#user",
                login: decoded.login,
                avatar_url: decoded.avatar_url
            })
        } catch(err) {
            ctx.body = await JSON.stringify({
                error: {
                    errors: [{
                        domain: "global",
                        reason: "authError",
                        message: "Invalid Credentials",
                        locationType: "cookie",
                        location: "Authorization",
                    }],
                    code: 401,
                    message: "Invalid Credentials"
                }
            })
        }
    })
}

/* Exchange auth code for access token */
async function _getAuthToken(authcode) {
    return await fetch("https://github.com/login/oauth/access_token", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: config.auth.clientID,
            client_secret: config.auth.clientSecret,
            code: authcode,
        })
    }).then(response => response.json()).then(data => data.access_token);
}

/* Get user's profile */
async function _getUserProfile(token) {
    return await fetch("https://api.github.com/user", {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`
        }
    }).then(response => response.json()).then(data => data);
}