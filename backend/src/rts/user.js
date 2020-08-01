const express = require('express');
const router = express.Router();
const db = null;
const user = require('../modules/user');
const chunk = require('chunk');

//todo 
router.get('/:id', user.configure, async (req, res, next) => {
    const getUser = null; // grab user from database
    if (!getUser) return res.status(404).send({ message: 'User not found.' });
// get all bots owned by this user  and render it
})