import { GeneralError } from '../utills/error.js';

const handleError = async (err, req, res, next) => {
  if (err instanceof GeneralError) {
    const code = err.getCode();
    return res.status(code).json({ name: err.name, msg: err.message, success: false });
  }
  return res.status(500).json({
    name: 'internal server error', msg: err.message, success: false,
  });
};
export default handleError;
