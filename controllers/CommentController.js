const { Post, User, Comment } = require('../models');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/emailVerification');

class CommentController {
  static async getAll(ctx) {
    try {
      const allComments = await Comment.findAll({
        include: [
          {
            model: Post,
          },
        ],
      });
      ctx.response.status = 200;
      ctx.response.body = allComments;
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
  static async create(ctx) {
    const UserId = ctx.user.id;
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    if (ctx.request.body.PostId === undefined) {
      ctx.request.body.PostId = null;
    }
    const { content, PostId } = ctx.request.body;
    try {
      const post = await Post.findByPk(PostId, { include: [User] });
      if (!post && content && PostId) {
        throw new Error('The post does not exist.');
      } else {
        const comment = await Comment.create({ content, PostId, UserId });
        ctx.response.status = 201;
        ctx.response.body = comment;
        const emailContent = {
          from: process.env.EMAIL_SENDER,
          to: `${post.User.email}`,
          subject: `SocialMediaTeam - Comment Notification`,
          text: `Greetings, ${post.User.username}.
you have 1 new comment "${comment.content}" on your post "${post.title}".`,
        };
        sendEmail(emailContent);
      }
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = CommentController;