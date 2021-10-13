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
  if (!email) return { err: { status: 400, message: '"email" is required' } };

  if (!emailRegex.test(email)) {
    return { err: { status: 400, message: '"email" must be a valid email' } };
  }
  return true;
};

const validatePassword = (password) => {
  if (!password) return { err: { status: 400, message: '"password" is required' } };
  
  if (password.length !== 6) {
    return { err: { status: 400, message: '"password" must be 6 characteres long' } };
  }
  return true;
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
