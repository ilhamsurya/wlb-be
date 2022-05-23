const { Post, User } = require('../models');
const errorHandler = require('../helpers/errorHandler');

class PostController {
  static async getAll(ctx) {
    try {
      const allPosts = await Post.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      ctx.response.status = 200;
      ctx.response.body = allPosts;
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = PostController;
