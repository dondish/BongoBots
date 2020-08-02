const express = require('express');
const router = express.Router();
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const bodyParser = require('body-parser');
const refresh = require('passport-oauth2-refresh');

const user = require('../modules/user');
const { User } = require('../modules/database');

const discordStrat = new Strategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL,
    scope: ['identify']
}, function(accToken, refreshToken, profile, done) {
    console.log(profile);
    const {
        id, 
        username,
        avatar,
        discriminator
    } = profile;
    User.findOrCreate({
        where: {
            id
        },
        defaults: {
            id,
            username,
            discriminator,
            avatar,
            moderator: false,
            administrator: false
        }
    })
    profile.refreshToken = refreshToken;
    process.nextTick(function() {
        return done(null, profile)
    })
});

passport.use(discordStrat);
refresh.use(discordStrat);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', passport.authenticate('discord'));

router.get('/login', (req, res, next) => {
    return res.redirect('/auth');
})

router.get('/info', (req, res, next) => {
    return res.json(req.user);
});

//todo: finish this function with callback stuff including database stuff
router.get('/callback', passport.authenticate('discord', {}), (req, res, next) => {
    if (!user) { 
        // populate database with new user details
        let userDetails = {
            id: '1234', // discord id
            username: 'username of discord acc',
            tag: req.user.username + '#' + req.user.discriminator,
            avatar: req.user.avatar,
            isMod: false, // is this user a mod?
            isAdmin: false, // is this user a admin?
            isVerfiedDev: false // is this dev verified?
        }
        
    } else {
        // update user details with new discord details if it's been updated, including user, tag, and avatar.
        let userDetailsUpdate = {
            username: req.user.username, // grabs new username if its been changed
            tag: req.user.username + '#' + req.user.discriminator, // grabs new tag if been changed
            avatar: req.user.avatar // grabs avatar if been changed
        }
    }
    res.redirect('/')
    // this should ideally redirect back to homepage

})

router.get('/logout', (req, res ) => {
    req.logout();
    res.redirect('/');

})

module.exports = router;