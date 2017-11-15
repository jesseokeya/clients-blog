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
  enableAutoRefresh: false
}

module.exports = config;
