const express = require('express');
const router = express.Router();
const path = require('path');
const { home } = require('../config');

router.get(home, (req, res) => {
    res.render('pages/home');
});

router.get('/about', (req, res) => {
    res.render('pages/about');
});

router.get('/contact', (req, res) => {
    res.render('pages/contact');
});

router.get('/post', (req, res) => {
    res.render('pages/post');
});

module.exports = router;
