const { User } = require('../models');
const { generateToken, verifyToken } = require('../helpers/jwtAuth');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/sendEmail');
const { compareHash } = require('../helpers/passwordHash');

class UserController {
  static async getAll(ctx) {
    try {
      const users = await User.findAll({});
      ctx.response.status = 200;
      ctx.response.body = users;
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }

  static async register(ctx) {
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
    }
  }
  static async verify(ctx) {
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
      }
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
  static async login(ctx) {
    const { email, password } = ctx.request.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('The email or password is invalid.');
      } else {
        const matchPassword = compareHash(password, user.password);
        if (!matchPassword) {
          throw new Error('The email or password is invalid.');
        } else if (matchPassword && user.status !== 'active') {
          throw new Error('Please verify your account.');
        } else {
          const token = generateToken(user);
          ctx.response.status = 200;
          ctx.response.body = {
            message: 'User Login Success',
            token,
            user_id: user.id,
          };
        }
      }
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = UserController;
