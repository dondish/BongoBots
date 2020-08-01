const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const crypto = require('crypto');
const cheerio = require('cheerio');

const user = require('../modules/user');
const {Bot} = require('../modules/database');

const perm = (lvl) => {
    async (req, res, next) => {
        const getbot = {}; // get bot info

        if (!getBot) { 
            res.status(404).render('error', {
                title: 'Error',
                status: 404,
                message: 'Bot not found'});
        } else if ((lvl <= 3 && req.user.admin) || (level <= 2 && req.user.admin || req.user.mod) || (lvl <= 1 && getBot.owners.includes(req.user.id) || getBot.owner == req.user.id)) {
            next();
        } else {
            res.status(400).render('error', {
                title: 'Error',
                status: 400,
                message: 'You are not allowed to edit other\'s bots'});
        }
    }
};

const clean = (html) => {
    const $ = cheerio.load(html);
    $('*').each((i, element) => {
        Object.keys(element.attribs)
            .filter(attribute => attribute.startsWith('on'))
            .forEach((attribute) => {
                $(element).removeAttr(attribute);
            })
    });
    $('script').remove();
    $('object').remove();
    
    return $.html;
}

 router.post('/addbot', user.configure, user.auth, user.inServer, async (req, res) => {
     let checkBot = null; // check if bot exists
     if (checkBot) return res.status(400).json({
         message: 'This bot has already been added to the list'});
     let invite; 
     if (req.body.invite == '') {
         invite = `https://discordapp.com/oauth2/authorize?client_id=${req.body.client_id}&scope=bot`;
     } else {
         if (typeof req.body.invite !== 'string') { 
             res.status(400).json({
                 message: 'You provided an invalid invite.'
                });
         } else if (req.body.invite.length > 2000) {
             return res.status(400).json({
                 message: 'You provided an invite that was too long (2000)'}
                 );
         } else if (!/^https?:\/\//.test(req.body.invite)) {
             return res.status(400).json({
                 message: 'Your invite must use HTTP or HTTPS'
                });
         } else if (!req.body.invite.startsWith('https://discordapp.com/')) {
             return res.status(400).json({
                 message: 'Invalid invite URL. It should start with: https://discordapp.com/.'
                });
         } else {
             invite = res.body.invite;
         }
     }
     fetch(`https://discordapp.com/api/users/${req.body.client_id}`, {
         method: 'GET',
         headers: {
             'User-Agent': config.useragent, // set up settings
             'Authorization': `Bot ${config.discord.token}`,
             'Content-Type': 'application/json'  // discord token
         }
     }).then(discordResponse => {
        if (req.body.id.length !== 18 ) {
            return res.status(400).json({
                message: 'This bot ID must be 18 digits.'
            });
        } else if (req.body.ownersIds && req.body.ownersIds.length > 5 ) {
            return res.status(400).json('error', {
                message: 'You can\'t have more than 5 owners.'
            });
        } else if (discordResponse.message === 'Unknown User') {
            return res.status(400).json('error', {
                message: 'This bot does not exist on Discord. :('
            });
        } else if (!discordResponse.bot) {
            return res.status(400).json({
                message: 'You cannot add users onto the list'
            });
        } else if (discordResponse.bot == true) {
            let owners; 
            if (req.body.owners = '') {
                owners = []
            } else {
                owners = [...new Set(req.body.owners.split(/\D+/g))];
            }
            // insert bot data into database
            let detailsToPost = {
                id: '1234',
                name: discordResponse.username,
                avatar: discordResponse.avatar,
                prefix: req.body.prefix,
                library: req.body.library,
                invite: invite,
                short_desc: req.body.short_desc,
                long_desc: req.body.long_desc,
                support_server: req.body.support,
                github: req.body.github, 
                website: req.body.website, 
                mod_notes: req.body.notes,
                owner: req.user.id,
                owners: owners,
                approved: false, 
                verified: false,
                server_count: 0,
                token: crypto.randomBytes(64).toString('hex')
            };
            const bot = Bot.build(detailsToPost);
            // todo: discord bot to inform user by dm that their bot has been added to the queue
            // todo: post stuff into the website-log channel
            res.status(200).json(bot);
        } else {
            return res.status(400).json({
                message: 'This bot does not exist on Discord!'
            })
        }
     })
 })

 router.get('/:id', (req, res) => {
    const botId = req.params['id']
    Bot.findByPk(botId).then(bot => {
        console.log(JSON.stringify(bot));
        res.json(bot || {});
    })
 })

 module.exports = router;