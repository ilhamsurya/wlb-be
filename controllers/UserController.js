const { User, Post, Like, Comment, SubComment } = require('../models');
const { generateToken, verifyToken } = require('../helpers/jwtAuth');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/sendEmail');
const { compareHash } = require('../helpers/passwordHash');
const log = require('../helpers/logger');

class UserController {
  static async getAll(ctx) {
    const startTime = Date.now();
    try {
      const users = await User.findAll({
        include: [
          {
            model: Post,
            include: [
              {
                model: Like,
              },
              {
                model: Comment,
                include: [SubComment],
              },
            ],
          },
        ],
      });
      ctx.response.status = 200;
      ctx.response.body = users;
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

  static async register(ctx) {
    const startTime = Date.now();
    const { username, email, password } = ctx.request.body;
    try {
      const newUser = await User.create({ username, email, password });

      // Generate user verification token :
      const verificationToken = generateToken(newUser);

      // Response :
      ctx.response.status = 201;
      ctx.response.body = {
        message: 'User Registration Success',
        verificationToken,
        data: newUser,
      };
      log(
        `${ctx.request.host}${ctx.request.url}`,
        { username, email },
        ctx.request.header.access_token,
        startTime,
        ctx.request,
        ctx.response,
      );
      // Send email with Mailgun API :
      const url = `${
        process.env.BASE_URL
      }/users/verify?token=${verificationToken}`;
      const emailContent = {
        from: process.env.EMAIL_SENDER,
        to: `${newUser.email}`,
        subject: `SocialMediaTeam - User Verification`,
        text: `Please click on this link to verify your account : ${url}`,
      };
      sendEmail(emailContent);
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
  static async verify(ctx) {
    const startTime = Date.now();
    const { token } = ctx.request.query;
    try {
      const userData = verifyToken(token);
      const user = await User.findOne({
        where: {
          username: userData.username,
          email: userData.email,
        },
      });

      // Validate the verification token :
      if (!user) {
        throw new Error('The verification link is invalid.');
      } else if (user.status === 'ACTIVATED') {
        throw new Error('The account has already been verified.');
      } else {
        const verifiedUser = await User.update(
          { status: 'ACTIVATED' },
          {
            where: { id: user.id },
            returning: true,
          },
        );
        ctx.response.status = 200;
        ctx.response.body = {
          message: 'User Verification Success',
          data: verifiedUser[1][0],
        };
        log(
          `${ctx.request.host}${ctx.request.url}`,
          { username: user.username, email: user.email },
          ctx.request.header.access_token,
          startTime,
          ctx.request,
          ctx.response,
        );
      }
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
  static async login(ctx) {
    const startTime = Date.now();
    const { email, password } = ctx.request.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('The email or password is invalid.');
      } else {
        const matchPassword = compareHash(password, user.password);
        if (!matchPassword) {
          throw new Error('The email or password is invalid.');
        } else if (matchPassword && user.status !== 'ACTIVATED') {
          throw new Error('Please verify your account.');
        } else {
          const token = generateToken(user);
          ctx.response.status = 200;
          ctx.response.body = {
            message: 'User Login Success',
            token,
            user_id: user.id,
          };
          log(
            `${ctx.request.host}${ctx.request.url}`,
            { username: user.username, email: user.email },
            ctx.request.header.access_token,
            startTime,
            ctx.request,
            ctx.response,
          );
        }
      }
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

module.exports = UserController;
