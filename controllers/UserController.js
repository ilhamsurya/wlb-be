const { User } = require('../models');
const errorHandler = require('../helpers/errorHandler');

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
}

module.exports = UserController;
