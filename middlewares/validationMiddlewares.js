const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateToken = (id, email) => {
  const payload = { id, email };
  return jwt.sign({ data: payload }, secret, jwtConfiguration);
};

const validateName = (name) => {
  if (!name || typeof (name) !== 'string' || name.length < 8) {
    return {
      err: {
        status: 400,
        message: '"displayName" length must be at least 8 characters long',
      },
    };
  }
  return true;
};

const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (email === '') return { err: { status: 400, message: '"email" is not allowed to be empty' } };

  if (!email) return { err: { status: 400, message: '"email" is required' } };

  if (!emailRegex.test(email)) {
    return { err: { status: 400, message: '"email" must be a valid email' } };
  }
  return true;
};

const validatePassword = (password) => {
  if (password === '') {
    return { err: { status: 400, message: '"password" is not allowed to be empty' } };
  }

  if (!password) return { err: { status: 400, message: '"password" is required' } };

  if (password.length !== 6) {
    return { err: { status: 400, message: '"password" length must be 6 characters long' } };
  }
  return true;
};

const validateCategory = (name) => {
  if (!name || name === '') {
    return {
      err: {
        status: 400,
        message: '"name" is required',
      },
    };
  }
  return true;
};

const validateCategoryId = (categoryIds) => {
  if (!categoryIds || categoryIds.length === 0) {
    return {
      err: {
        status: 400,
        message: '"categoryIds" is required',
      },
    };
  }
  return true;
};

const validateTitle = (title) => {
  if (!title || title === '') {
    return {
      err: {
        status: 400,
        message: '"title" is required',
      },
    };
  }
  return true;
};

const validateContent = (content) => {
  if (!content || content === '') {
    return {
      err: {
        status: 400,
        message: '"content" is required',
      },
    };
  }
  return true;
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateCategory,
  validateTitle,
  validateContent,
  validateCategoryId,
  generateToken,
};
