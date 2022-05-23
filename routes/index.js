const usersRoute = require('./users');
const postsRoute = require('./posts');
const commentsRoute = require('./comments');
const subCommentsRoute = require('./subcomments');

function loadRoutes(router) {
  usersRoute(router);
  postsRoute(router);
  commentsRoute(router);
  subCommentsRoute(router);
}

module.exports = loadRoutes;
