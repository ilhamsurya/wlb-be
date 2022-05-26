const Log = require('../models/log');
const errorHandler = require('../../helpers/errorHandler');

class LogController {
  static async getAll(ctx) {
    try {
      const logs = await Log.find({});
      ctx.response.status = 200;
      ctx.response.body = logs;
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
  static async create(ctx) {
    try {
      console.log('NEW');
      console.log(ctx.request.body);
      const log = new Log(ctx.request.body);
      await log.save();
      ctx.response.status = 201;
      ctx.response.body = log;
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
  static async delete(ctx) {
    const id = ctx.request.params.id;
    try {
      const deletedLog = await Log.findByIdAndDelete(id);
      if (!deletedLog) {
        throw new Error('The log doesnt exist.');
      } else {
        ctx.response.status = 200;
        ctx.response.body = {
          message: 'Successfully Deleted',
          deletedLog,
        };
      }
    } catch (err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = LogController;
