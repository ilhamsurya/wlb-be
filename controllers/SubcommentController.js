const { SubComment, Comment, User, Post } = require('../models');
const errorHandler = require('../helpers/errorHandler');

class SubCommentController {
  static async create(ctx) {
    const UserId = ctx.user.id;
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    if (ctx.request.body.CommentId === undefined) {
      ctx.request.body.CommentId = null;
    }
    const { content, CommentId } = ctx.request.body;
    try {
      const comment = await Comment.findByPk(CommentId, {
        include: [User, Post],
      });
      if (!comment && content) {
        throw new Error('The comment does not exist.');
      } else {
        const subComment = await SubComment.create({
          content,
          CommentId,
          UserId,
        });
        ctx.response.status = 201;
        ctx.response.body = subComment;
      }
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }

  static async delete(ctx) {
    const id = ctx.request.query.id;
    try {
      const deletedSubComment = await SubComment.findByPk(id);
      await SubComment.destroy({ where: { id } });
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Successfully Deleted',
        deletedSubComment,
      };
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = SubCommentController;
