const LogController = require('../../controllers/LogController');

function logsRoute(router) {
  router
    .post('/logs', LogController.create)
    .get('/logs', LogController.getAll)
    .delete('/logs', LogController.delete);
}

module.exports = logsRoute;
