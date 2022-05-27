const { Like, Post, User } = require('../models');
const errorHandler = require('../helpers/errorHandler');
const log = require('../helpers/logger');

class LikeController {
  static async create(ctx) {
    const UserId = ctx.user.id;
    const startTime = Date.now();
    if (ctx.request.body.PostId === undefined) {
      ctx.request.body.PostId = null;
    }
    const { PostId } = ctx.request.body;
    try {
      const like = await Like.findOne({
        where: { PostId, UserId },
      });
      if (!like) {
        const post = await Post.findByPk(PostId, { include: [User] });
        if (!post) {
          throw new Error('The post does not exist.');
        } else {
          const like = await Like.create({ PostId, UserId });
          ctx.response.status = 201;
          ctx.response.body = like;
        }
      } else {
        throw new Error('You cannot like same post twice');
      }
      log(
        `${ctx.request.host}${ctx.request.url}`,
        null,
        ctx.request.header.access_token,
        startTime,
        ctx.request,
        ctx.response,
      );
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
      log(
        `${ctx.request.host}${ctx.request.url}`,
        null,
        ctx.request.header.access_token,
        startTime,
        ctx.request,
        ctx.response,
      );
    }
  }
  static async delete(ctx) {
    const id = ctx.request.query.id;
    const startTime = Date.now();
    try {
      const deletedLike = await Like.findByPk(id);
      await Like.destroy({ where: { id } });
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Successfully Deleted',
        deletedLike,
      };
      log(
        `${ctx.request.host}${ctx.request.url}`,
        null,
        ctx.request.header.access_token,
        startTime,
        ctx.request,
        ctx.response,
      );
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
      log(
        `${ctx.request.host}${ctx.request.url}`,
        null,
        ctx.request.header.access_token,
        startTime,
        ctx.request,
        ctx.response,
      );
    }
  }
}

module.exports = LikeController;
