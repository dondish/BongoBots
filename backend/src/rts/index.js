const express = require('express');
const router = express.Router();
const chunk = require('chunk')
const user = require('../modules/user');



router.get('/', async (req, res, next) => {
    console.log('Got request')
    return res.json('IT WORKS')
});

module.exports = router;