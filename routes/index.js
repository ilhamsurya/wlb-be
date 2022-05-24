const usersRoute = require('./users');
const postsRoute = require('./posts');
const commentsRoute = require('./comments');
const subCommentsRoute = require('./subcomments');
const likeRoute = require('./likes');

function loadRoutes(router) {
  usersRoute(router);
  postsRoute(router);
  commentsRoute(router);
  subCommentsRoute(router);
  likeRoute(router);
}

module.exports = loadRoutes;
