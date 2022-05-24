function errorHandler(err) {
  const errors = [];
  let status = 400;
  switch (err.name) {
    case 'SequelizeValidationError':
      err.errors.forEach(error => {
        errors.push(error.message);
      });
      break;
    case 'SequelizeDatabaseError':
      errors.push(err.message);
      break;
    case 'JsonWebTokenError':
      errors.push(err.message);
      break;
    case 'TypeError':
      errors.push(err.message);
      break;
    case 'InternalServerError':
      errors.push(err.message);
      break;
    case 'Error':
      errors.push(err.message);
      if (err.message === 'Your user not registered, please register first') {
        status = 401;
      }
      if (err.message === 'You dont have access to this feature') {
        status = 403;
      }
      break;
    default:
      errors.push('Internal Server Error');
      status = 500;
  }
  return { status, errors };
}

module.exports = errorHandler;
