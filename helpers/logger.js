const { User } = require('../models');
const { verifyToken } = require('./jwtAuth');
const axios = require('axios');
const env = process.env.NODE_ENV || 'development';

async function log(
  path,
  userObject,
  accessToken,
  reqStartTime,
  requestObject,
  responseObject,
) {
  const accessTime = Date.now() - reqStartTime;
  let userDetail;

  if (accessToken === 'null' || accessToken === '') {
    accessToken = null;
  }
  if (userObject) {
    const user = await User.findOne({ where: userObject });

    userDetail = user;
  } else if (accessToken) {
    const userData = verifyToken(accessToken);
    const { id, username, email, status } = userData;
    const user = await User.findOne({ where: { id, username, email, status } });
    userDetail = user;
  } else {
    userDetail = {
      id: null,
      username: null,
      email: null,
      password: null,
      status: null,
      createdAt: null,
      updatedAt: null,
    };
  }

  try {
    let logsUrl;
    if (env === 'production') {
      logsUrl = process.env.LOGS_URL;
    } else {
      logsUrl = 'http://localhost:3003/logs';
    }
    await axios.post(logsUrl, {
      path,
      userDetail,
      accessTime,
      requestObject,
      responseObject,
    });
    console.log('logged successfully');
  } catch (err) {
    console.log(err);
  }
}

module.exports = log;
