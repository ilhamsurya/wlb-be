const { Post, User, Like, Comment, SubComment } = require('../models');
const { Op } = require('sequelize');
const errorHandler = require('../helpers/errorHandler');
const filterPost = require('../helpers/filterPost');
const log = require('../helpers/logger');
class PostController {
  static async getAll(ctx) {
    const startTime = Date.now();
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
  static async create(ctx) {
    const UserId = ctx.user.id;
    const startTime = Date.now();
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
  static async update(ctx) {
    const id = ctx.request.query.id;
    const startTime = Date.now();
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
      const deletedPost = await Post.findByPk(id);
      await Post.destroy({ where: { id } });
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Successfully Deleted',
        deletedPost,
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
  static async search(ctx) {
    const { title } = ctx.request.query;
    const startTime = Date.now();
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
  static async filter(ctx) {
    const { type, value } = ctx.request.query;
    const filterType = type.split(',');
    const filterOrder = filterPost(filterType, value);
    const startTime = Date.now();
    try {
      const { count, rows: data } = await Post.findAndCountAll({
        order: filterOrder,
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

module.exports = PostController;
