const UserController = require('../../controllers/UserController');

function usersRoute(router) {
  router.get('/users', UserController.getAll);
  router.post('/users/register', UserController.register);
  router.get('/users/verify', UserController.verify);
}

module.exports = usersRoute;
