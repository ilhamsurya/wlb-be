const usersRoute = require('./users');

function loadRoutes(router) {
  usersRoute(router);
}

module.exports = loadRoutes;
