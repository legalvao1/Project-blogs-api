const { User } = require('../models');

const {
  validateEmail,
  validateName,
  validatePassword,
  generateToken,
} = require('../middlewares/validationMiddlewares');

const findEmail = async (email) => {
  const emailExistes = await User.findOne({ where: { email } });
  if (emailExistes !== null) {
    return { err: {
      status: 409,
      message: 'User already registered',
    } };
  }
  return false;
};

const findUser = async (email, password) => {
  const userExistes = await User.findOne({ where: { email, password } });
   if (userExistes === null) {
    return { err: {
      status: 400,
      message: 'Invalid fields',
    } };
  }
  return userExistes;
};

const findAll = async () => {
  const users = await User.findAll({ 
    attributes: { exclude: ['password'] } });
  return users;
};

const createUser = async ({ displayName, email, password, image }) => {
  if (validateName(displayName).err) return validateName(displayName);
  if (validateEmail(email).err) return validateEmail(email);
  if (validatePassword(password).err) return validatePassword(password);
  const emailExists = await findEmail(email);
  if (emailExists.err) return emailExists;

  const { id } = await User.create({ displayName, email, password, image });

  const token = generateToken(id, email);
  return token;
};

const logUser = async ({ email, password }) => {
  if (validateEmail(email).err) return validateEmail(email);
  if (validatePassword(password).err) return validatePassword(password);
  const userIsValid = await findUser(email, password);
  if (userIsValid.err) return userIsValid;
  
  const token = generateToken(userIsValid.id, email);
  return token;
};

const findById = async ({ id }) => {
  const user = await User.findByPk(id, { 
    attributes: { exclude: ['password'] } });
  if (user === null) { 
    return {
      err: {
        status: 404,
        message: 'User does not exist',
      },
    };
  }
  return user;
};

module.exports = {
  createUser,
  findAll,
  findUser,
  findById,
  logUser,
};
