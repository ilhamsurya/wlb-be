const CommentController = require('../../controllers/CommentController');
const { authentication } = require('../../middleware/auth');
function commentsRoute(router) {
  router
    .post('/comments', authentication, CommentController.create)
    .get('/comments', CommentController.getAll);
}

module.exports = commentsRoute;
