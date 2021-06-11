import Joi from 'joi';

const schema = Joi.object().keys(
  {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    role: Joi.string().required().valid('admin', 'company', 'user'),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref('password'),
  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
