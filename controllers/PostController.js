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
  static async create(ctx) {
    const UserId = ctx.user.id;
    if (ctx.request.body.title === undefined) {
      ctx.request.body.title = null;
    }
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    const { title, content } = ctx.request.body;
    try {
      const newPost = await Post.create({ title, content, UserId });
      ctx.response.status = 201;
      ctx.response.body = newPost;
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = PostController;
