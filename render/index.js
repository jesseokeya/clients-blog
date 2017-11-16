const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const {home} = require('../config');
const {getAllPosts} = require('../api');

router.get(home, (req, res) => {
  const postSchema = require('../models');
  const post = mongoose.model('post');
  post.find({}, function(err, results) {
    if (err) {
      throw err;
    }
    res.render('pages/home', {result: results});
  });
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
  const postSchema = require('../models');
  const post = mongoose.model('post');
  const index = req.params.index;
  post.find({}, function(err, results) {
    if (err) {
      throw err;
    }
    res.render('pages/post', {result: results[index - 1]});
  });
});

router.get('/admin/create-post', (req, res) => {
  res.render('pages/create/post');
});

router.get('/admin/edit/about', (req, res) => {
  res.render('pages/edit/about');
});

router.get('/admin/edit/posts', (req, res) => {
  res.render('pages/edit/post');
});

module.exports = router;
