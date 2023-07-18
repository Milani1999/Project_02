const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      picture: user.picture,
      token: generateToken(user._id),
    })
  }
  else {
    res.status(400)
    throw new Error('Invalid username or password');
  }
});

module.exports = { authUser };
