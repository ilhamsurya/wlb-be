const LikeController = require('../../controllers/LikeController');
const { authentication } = require('../../middleware/auth');

function likesRoute(router) {
  router
    .post('/likes', authentication, LikeController.create)
    .delete('/likes', authentication, LikeController.delete);
}

module.exports = likesRoute;
