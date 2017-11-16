const mongoose = require('mongoose');
const postSchema = require('../models');
const post = mongoose.model('post');

let allPosts = [];

post.find({}, function(err, results) {
  if (err) {
    throw err;
  }
  allPosts.push(results);
});

module.exports = {
  getAllPosts: allPosts
}
