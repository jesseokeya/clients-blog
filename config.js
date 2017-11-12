const config = {
  home: [
    '/', '/blog', '/home',
  ],
  port: process.env.PORT || 3000,
  _db: 'mongodb://jesse:clientsblog@ds147421.mlab.com:47421/clients-blog',
  private: true
}

module.exports = config;
