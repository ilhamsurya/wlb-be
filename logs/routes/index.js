const logsRoute = require('./logs');

function loadRoutes(router) {
  logsRoute(router);
}

module.exports = loadRoutes;
