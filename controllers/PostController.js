const { Post, User, Like, Comment, SubComment } = require('../models');
const { Op } = require('sequelize');
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
      ctx.response.body = {
        message: 'Successfully Created',
        newPost,
      };
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
  static async update(ctx) {
    const id = ctx.request.query.id;
    if (ctx.request.body.title === undefined) {
      ctx.request.body.title = null;
    }
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    const { title, content } = ctx.request.body;
    try {
      const updatedPost = await Post.update(
        { title, content },
        {
          where: { id },
          returning: true,
        },
      );
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Successfully Updated',
        updatedPost,
      };
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
  static async delete(ctx) {
    const id = ctx.request.query.id;
    try {
      const deletedPost = await Post.findByPk(id);
      await Post.destroy({ where: { id } });
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Successfully Deleted',
        deletedPost,
      };
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
  static async search(ctx) {
    const { title } = ctx.request.query;
    try {
      const { count, rows: data } = await Post.findAndCountAll({
        where: {
          title: {
            [Op.iRegexp]: `${title}`,
          },
        },
        include: [
          {
            model: User,
          },
          {
            model: Like,
          },
          {
            model: Comment,
            include: [SubComment],
          },
        ],
      });
      ctx.response.status = 200;
      ctx.response.body = { count, data };
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = PostController;
