const CommentController = require('../../controllers/CommentController');
const { authentication } = require('../../middleware/auth');
function commentsRoute(router) {
  router
    .post('/comments', authentication, CommentController.create)
    .get('/comments', CommentController.getAll)
    .delete('/comments', CommentController.delete);
}

module.exports = commentsRoute;
