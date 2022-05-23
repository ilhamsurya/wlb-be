const usersRoute = require('./users');
const postsRoute = require('./posts');

function loadRoutes(router) {
  usersRoute(router);
  postsRoute(router);
}

module.exports = loadRoutes;
