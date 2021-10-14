const userService = require('./userService');

const {
  validateEmail,
  validatePassword,
  generateToken,
} = require('../middlewares/validationMiddlewares');

const logUser = async ({ email, password }) => {
  if (validateEmail(email).err) return validateEmail(email);
  if (validatePassword(password).err) return validatePassword(password);
  const userIsValid = await userService.findUser(email, password);
  if (userIsValid.err) return userIsValid;
  
  const token = generateToken(userIsValid.id, email);
  return token;
};

module.exports = {
  logUser,
};
