const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const newUserToken = await userService.createUser(req.body);

    if (newUserToken.err) {
      return res.status(newUserToken.err.status).json({ message: newUserToken.err.message });
    } 
    return res.status(201).json({ token: newUserToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
};
