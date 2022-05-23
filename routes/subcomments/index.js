const SubCommentController = require('../../controllers/SubcommentController');
const { authentication } = require('../../middleware/auth');
function subCommentsRoute(router) {
  router
    .post('/subcomments', authentication, SubCommentController.create)
    .delete('/subcomments', SubCommentController.delete);
}

module.exports = subCommentsRoute;
