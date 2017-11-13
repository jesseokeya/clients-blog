const express = require('express');
const router = express.Router();
const {getAllPosts} = require('./helper');
const mongoose = require('mongoose');
const contactSchema = require('../models/contact');
const contact = mongoose.model('contact');

router.post('/create', (req, res) => {
  res.send()
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
        message: 'contact successfully saved'
      });
    }
  });
});

const api = router;
module.exports = {
  api,
  getAllPosts
};
