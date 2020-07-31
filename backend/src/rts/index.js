const express = require('express');
const router = express.Router();
const chunk = require('chunk')
const user = require('../modules/user');



router.get('/', async (req, res, next) => {
    const bots = {};
    const chunked = chunk(bots, 3);
    res.render('index', { title: 'Home', botsData: bots, chunked})
});

module.exports = router;