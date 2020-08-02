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

const RequiredValidator = str => !!str;

const PatternValidator = (str, pattern) => pattern.test(str);

const MaxLengthValidator = (str, maxlength) => str.length <= maxlength;

const MinLengthValidator = (str, minlength) => str.length >= minlength;

const SnowflakePattern = /^[0-9]{18}$/;

const HttpUrlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

function validateId(id) {
    return RequiredValidator(id) && PatternValidator(id, SnowflakePattern);
}

function validatePrefix(prefix) {
    return RequiredValidator(prefix) && MaxLengthValidator(prefix, 10);
}

const libraries = [
    'discordcr',
    'Discord.NET',
    'DSharpPlus',
    'Nostrum',
    'DiscordGo',
    'Discord4Java',
    'Javacord',
    'JDA',
    'discord.io',
    'discord.js',
    'Discordie',
    'Eris',
    'Discordia',
    'Restcord',
    'Yasmin',
    'Disco',
    'discord.py',
    'Discordrb',
    'discord-rs',
    'serenity',
    'SwiftDiscord',
    'Sword',
    'Other/Custom'
];

function validateLibrary(library) {
    return RequiredValidator(library) && libraries.includes(library);
}

function validateInvite(invite) {
    return !invite ||  PatternValidator(invite, /^(https:\/\/discord.com\/api\/oauth2\/authorize\/.+)*$/);
}

function validateShortDesc(shortDesc) {
    return RequiredValidator(shortDesc) && MaxLengthValidator(shortDesc, 100);
}

function validateLongDesc(longDesc) {
    return RequiredValidator(longDesc) && MinLengthValidator(longDesc, 200);
}

function validateSupportServer(supportServer) {
    return !supportServer || PatternValidator(supportServer, /^(https:\/\/discord.gg\/[A-Za-z0-9]+)*$/);
}

function validateSourceCode(sourceCode) {
    return !sourceCode || PatternValidator(sourceCode, HttpUrlPattern);
}

function validateWebsite(website) {
    return !website || PatternValidator(website, HttpUrlPattern);
}

function validateOwnersIds(ownersIds) {
    return !ownersIds || PatternValidator(ownersIds, /^([0-9]{18},{0,1}){0,5}$/);
}

function invalidResult(res, type) {
    return res.status(400).json({
        message: `${type} is invalid.`
    });
}

router.post('/addbot', 
    // user.inServer, 
    async (req, res) => {
    console.log(req.body)
    let checkBot = await Bot.findByPk(req.body.id); // check if bot exists
    if (checkBot) return res.status(400).json({
        message: 'This bot has already been added to the list'});
    let { 
        id, 
        name, 
        prefix, 
        library, 
        invite, 
        short_desc, 
        long_desc, 
        support_server, 
        github, 
        website, 
        mod_notes,
        ownersIds
    } = req.body;
    let ownerId = req.user.id;
    
    if (!validateId(id)) {
        return invalidResult(res, 'ID');
    }

    if (!RequiredValidator(name)) {
        return invalidResult(res, 'Name');
    }

    if (!validatePrefix(prefix)) {
        return invalidResult(res, 'Prefix');
    }

    if (!validateLibrary(library)) {
        return invalidResult(res, 'Library');
    }
    
    if (!validateInvite(invite)) {
        return invalidResult(res, 'Invite URL')
    }

    if (!invite) {
        invite = `https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot`;
    }

    if (!validateShortDesc(short_desc)) {
        return invalidResult(res, 'Short Description');
    }

    if (!validateLongDesc(long_desc)) {
        return invalidResult(res, 'Long Description');
    }

    if (!validateSupportServer(support_server)) {
        return invalidResult(res, 'Support Server');
    }

    if (!validateShortDesc(github)) {
        return invalidResult(res, 'Source Code');
    }

    if (!validateWebsite(website)) {
        return invalidResult(res, 'Website');
    }

    if (!validateOwnersIds(ownersIds)) {
        return invalidResult(res, 'Owners IDs');
    }
     
    const user = await fetch(`https://discordapp.com/api/users/${req.body.client_id}`, {
        method: 'GET',
        headers: {
            'User-Agent': 'DiscordBot (https://github.com/dondish/bongobots, 1.0.0)',
            'Authorization': `Bot ${process.env.DISCORDTOKEN}`,
            'Content-Type': 'application/json'
        }
    })
    if (user.message === 'Unknown User') {
        return invalidResult(res, 'ID');
    } 
    if (!user.bot) {
        return invalidResult(res, 'ID');
    }

    ownersIds = ownersIds.split(',').filter(id => id != ownerId);
    ownersIds = [...new Set(ownersIds)];

    // insert bot data into database
    let detailsToPost = {
        id,
        name: user.username,
        avatar: user.avatar,
        prefix,
        library,
        invite,
        short_desc,
        long_desc,
        support_server,
        github, 
        website, 
        mod_notes,
        ownerId,
        ownersIds,
        approved: false, 
        verified: false,
        server_count: undefined,
        token: crypto.randomBytes(64).toString('hex')
    };
    const bot = Bot.create(detailsToPost);
    // todo: discord bot to inform user by dm that their bot has been added to the queue
    // todo: post stuff into the website-log channel
    res.status(200).json(bot);
    
 });

 router.get('/:id', (req, res) => {
    const botId = req.params['id']
    Bot.findByPk(botId).then(bot => {
        console.log(JSON.stringify(bot));
        res.json(bot || {});
    })
 })

 module.exports = router;