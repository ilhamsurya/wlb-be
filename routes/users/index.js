const UserController = require('../../controllers/UserController');

function usersRoute(router) {
  router.get('/users', UserController.getAll);
}

module.exports = usersRoute;
