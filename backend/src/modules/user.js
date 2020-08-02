const auth = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect('/auth')
    }
};

const mod = (req, res, next) => {
    if (req.user && req.user.mod || req.user.admin) {
        next();
    } else {
        res.status(400).render('error', { title: 'Error', status: 400, message: 'You are not a web mod. sad owo'});
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.status(400).render('error', { title: 'Error', status: 400, message: 'You are not a web admin. sad uwu'})
    }
};

const inServer = (req, res, next) => {
    if (req.user) {
        if (!isUserInGuild()) { // check if user is in fact NOT in the guild (obvs change the if statement for the appropiate method)
            res.status(400).render('error', {title: 'Error', status: 400, message: 'You must be in our discord guild to add a bot. communism!!!!!!'});
        }  else {
            next()
        }
    } else {
        res.redirect('/auth')
    }
};

module.exports = {
    auth, 
    mod, 
    admin,
    inServer
};