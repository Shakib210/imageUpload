import jwt from 'jsonwebtoken';

const permit = (...role) => {
  return async (req, res, next) => {
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.author = decoded;

      if (!role.includes(req.author.role)) {
        return res.status(401).json({ success: false, msg: 'You are not authorized to access this route' });
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default permit;
