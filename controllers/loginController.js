const loginService = require('../services/loginService');

const login = async (req, res) => {
  try {
    const user = await loginService.logUser(req.body);
    if (user.err) {
      return res.status(user.err.status).json({ message: user.err.message });
    } 
    return res.status(200).json({ token: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};