const { User } = require('../models');
const { verifyToken } = require('../helpers/jwtAuth');
const errorHandler = require('../helpers/errorHandler');

async function authentication(ctx, next) {
  try {
    const userData = verifyToken(ctx.request.header.accesstoken);
    const { id, username, email, status } = userData;
    const user = await User.findOne({
      where: { id, username, email, status },
    });
    if (!user) {
      throw new Error(
        'User is not registered. Please register the user first.',
      );
    }
    ctx.user = user;
    await next();
  } catch (err) {
    const { status, errors } = errorHandler(err);
    ctx.response.status = status;
    ctx.response.body = errors;
  }
}

module.exports = {
  authentication,
};
