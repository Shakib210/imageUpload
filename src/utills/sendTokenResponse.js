// Get token from model, create cookie and send response
import jwt from 'jsonwebtoken';

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({
    id: user._id, role: user.role, branch: user.branch }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_LOGIN,
  });

  res
    .status(statusCode)
    .json({ success: true, token });
};

export default sendTokenResponse;
