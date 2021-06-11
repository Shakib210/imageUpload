import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/async.js';
import { BadRequest } from '../utils/error.js';
import {
  getSuperAdminServices,
} from '../services/superAdminServices.js';
// Protect Routes

// eslint-disable-next-line
const superAdminProcted = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exits
  if (!token) {
    return res.status(401).json({ success: false, msg: 'You are not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const superAdmin = await getSuperAdminServices(decoded.id);
    if (!superAdmin) {
      return res.status(401).json({ success: false, msg: 'You are not authorized to access this route' });
    }
    req.superAdmin = superAdmin;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'Invalid token' });
  }
});

const auth = {
  superAdminProcted,
};

export default auth;
