const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const wrapper = require('../../helpers/utils/wrapper');

const isValidRegisterUser = async (payload) => {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(9).required(),
        role_id: Joi.string().required(),
    }).label('User');
    const result = Joi.validate(payload, userSchema);
    if (result.error) {
        let message = result.error.details[0].message;
        return wrapper.error('Bad Request', message, 400);
    }
    return wrapper.data(true);
};

const isValidloginUser = async (payload) => {
    const userSchema = Joi.object({
        phone: Joi.string().min(9).required(),
        password: Joi.string().min(4).required()
    }).label('User');
    const result = Joi.validate(payload, userSchema);
    if (result.error) {
        let message = result.error.details[0].message;
        return wrapper.error('Bad Request', message, 400);
    }
    return wrapper.data(true);
};

module.exports = {
    isValidRegisterUser,
    isValidloginUser
};