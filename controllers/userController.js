const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUserToken = await User.create({ displayName, email, password, image });

    res.status(201).json(newUserToken);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
};
