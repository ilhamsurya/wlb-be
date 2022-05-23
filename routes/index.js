const usersRoute = require('./users');
const postsRoute = require('./posts');
const commentsRoute = require('./comments');

function loadRoutes(router) {
  usersRoute(router);
  postsRoute(router);
  commentsRoute(router);
}

module.exports = loadRoutes;
