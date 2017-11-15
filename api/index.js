const express = require('express');
const router = express.Router();
const {getAllPosts} = require('./helper');
const mongoose = require('mongoose');
const {credentials} = require('../config');

/* Post Resquests */

router.post('/create', (req, res) => {
  console.log(req.body);
  res.send('Successfully Created Post!!');
});

router.post('/admin', (req, res) => {
  const response = {};
  const isValidEmail = (credentials.email === req.body.email);
  const isValidPassword = (credentials.password === req.body.password);
  if (isValidEmail && isValidPassword) {
    response.status = 200;
    response.isValidUser = true;
    response.message = 'valid'
  } else {
    response.status = 404;
    response.isValidUser = false;
    response.message = 'invalid'
  }

  res.send(response);
});

router.post('/contact', (req, res) => {
  const contactSchema = require('../models/contact');
  const contact = mongoose.model('contact');
  const newContact = new contact(req.body);
  newContact.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({data: req.body, status: 200, message: 'contact successfully saved'});
    }
  });
});

router.post('/update/about', (req, res) => {
  const aboutSchema = require('../models/about');
  const about = mongoose.model('about');
  console.log(req.body);
  about.remove({}, (err, docs) => {
    if (err) {
      throw err;
    }
  });
  const newAbout = new about({description: req.body.data});
  newAbout.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({data: req.body, status: 200, message: 'contact successfully saved'});

    }
  });
});


/* Get Resquests */
router.get('/get/about', (req, res) => {
  const aboutSchema = require('../models/about');
  const about = mongoose.model('about');
  about.find({}, (err, docs) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      data: docs,
      message: 'Blog About Me Data'
    });
  });
});

const api = router;
module.exports = {
  api,
  getAllPosts
};
