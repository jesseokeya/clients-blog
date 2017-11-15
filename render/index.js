const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const {home} = require('../config');
const {getAllPosts} = require('../api');
const {getPostByIndex} = require('../api/helper');

router.get(home, (req, res) => {
  res.render('pages/home', getAllPosts[0]);
});

router.get('/about', (req, res) => {
  const aboutSchema = require('../models/about');
  const about = mongoose.model('about');
  about.find({}, function(err, results) {
    if (err) {
      throw err;
    }
    console.log(results);
    res.render('pages/about', {result: results});
  });
});

router.get('/login', (req, res) => {
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

router.get('/admin/create', (req, res) => {
  res.render('pages/create/post');
});

router.get('/admin/edit/about', (req, res) => {
  res.render('pages/edit/about');
});

router.get('/admin/edit/posts', (req, res) => {
  res.render('pages/edit/post');
});

module.exports = router;
