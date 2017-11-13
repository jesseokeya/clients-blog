const express = require('express');
const router = express.Router();
const path = require('path');
const {home} = require('../config');
const {getAllPosts} = require('../api');
const {getPostByIndex} = require('../api/helper');

router.get(home, (req, res) => {
  res.render('pages/home', getAllPosts[0]);
});

router.get('/about', (req, res) => {
  res.render('pages/about');
});

router.get('/admin', (req, res) => {
  res.render('pages/login');
});

router.get('/admin/publish', (req, res) => {
  res.render('pages/admin');
});

router.get('/contact', (req, res) => {
  res.render('pages/contact');
});

router.get('/post/:index', (req, res) => {
  const index = req.params.index;
  const postAtIndex = getPostByIndex(getAllPosts[0], index);
  res.render('pages/post', postAtIndex);
});

module.exports = router;
