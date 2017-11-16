const config = {
  home: [
    '/', '/blog', '/home'
  ],
  routes: [
    '/admin/edit/', '/post', '/admin'
  ],
  port: process.env.PORT || 3000,
  _db: 'mongodb://jesse:clientsblog@ds147421.mlab.com:47421/clients-blog',
  credentials: {
    email: 'melissamacisaac3@gmail.com',
    password: 'ghme2017'
  },
  private: true,
  enableAutoRefresh: false,
  firebase: {
    apiKey: "AIzaSyAsHUjyfOzAKLUxVJK19fdKw9r_Df-y8cE",
    authDomain: "melissas-blog.firebaseapp.com",
    databaseURL: "https://melissas-blog.firebaseio.com",
    projectId: "melissas-blog",
    storageBucket: "melissas-blog.appspot.com",
    messagingSenderId: "440662663872"
  }
}

module.exports = config;
