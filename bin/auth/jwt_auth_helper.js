const jwt = require('jsonwebtoken');
const wrapper = require('../helpers/utils/wrapper');
const logger = require('../helpers/utils/logger');
const {
  ERROR
} = require('../helpers/http-error/custom_error');

const key = 'private_efishery';
const generateToken = async (payload) => {
  const token = jwt.sign(payload, key);
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    data: null
  };

  const token = getToken(req.headers);
  if (!token) {
    return wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.UNAUTHORIZED);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, key);
    req.token = decodedToken;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      logger.log('verifyToken', error, 'Access token expired!');
      return wrapper.response(res, 'fail', result, 'Access token expired!', ERROR.UNAUTHORIZED);
    }
    logger.log('verifyToken', error, 'Token is not valid!');
    return wrapper.response(res, 'fail', result, 'Token is not valid!', ERROR.UNAUTHORIZED);
  }
};

module.exports = {
  generateToken,
  verifyToken
};