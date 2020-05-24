const routes = require('next-routes')

module.exports = routes()
.add('index')
.add('profileChannel', '/:slug.:id', 'profileChannel')
.add('podcast', '/:slugChannel.:idChannel/:slug.:id', 'podcast')