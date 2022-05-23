const PostController = require('../../controllers/PostController');

function postsRoute(router) {
  router.get('/posts', PostController.getAll);
}

module.exports = postsRoute;
