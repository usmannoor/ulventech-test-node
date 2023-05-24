import Joi from 'joi';

export const schemas = {
  usersLIST: Joi.object().keys({
    start: Joi.number().default(0),
    limit: Joi.number().default(20),
  }),
  users: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  userUPDATE: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(8),
  }),
  userDETAIL: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};
