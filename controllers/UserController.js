const { User } = require('../models');
const { generateToken, verifyToken } = require('../helpers/jwtAuth');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/emailVerification');

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
}

module.exports = UserController;
