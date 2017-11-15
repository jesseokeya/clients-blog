const express = require('express');
const router = express.Router();
const {getAllPosts} = require('./helper');
const mongoose = require('mongoose');
const contactSchema = require('../models/contact');
const contact = mongoose.model('contact');
const {credentials} = require('../config')

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
  console.log(req.body);
  const newContact = new contact(req.body);
  newContact.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        data: req.body,
        status: 200,
        message: 'contact successfully saved'});
    }
  });
});

const api = router;
module.exports = {
  api,
  getAllPosts
};
