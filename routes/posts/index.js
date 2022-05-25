const PostController = require('../../controllers/PostController');
const { authentication } = require('../../middleware/auth');
function postsRoute(router) {
  router
    .post('/posts', authentication, PostController.create)
    .get('/posts', PostController.getAll)
    .put('/posts', authentication, PostController.update)
    .delete('/posts', authentication, PostController.delete)
    .get('/posts/search', authentication, PostController.search)
    .get('/posts/filter', authentication, PostController.filter);
}

module.exports = postsRoute;
