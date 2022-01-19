const query = require('./query');
const model = require('./model');
const wrapper = require('../../helpers/utils/wrapper');
const validate = require('validate.js');
const utils = require('../../helpers/utils/utils');
const jwtAuth = require('../../auth/jwt_auth_helper');
const configs = require('../../configs/global_config');
const uuid = require('uuid/v4');
const logger = require('../../helpers/utils/logger');
const DateHelper = require("../../helpers/utils/date");
const dateHelper = new DateHelper()

class Users {
    async registerUser(payload) {
        const {
            name,
            phone,
            role_id
        } = payload

        const user = model.user();
        user.user_id = uuid();
        user.name = name;
        user.phone = phone;
        user.password = await this.genRandomChar(4);
        user.role_id = role_id;
        user.created_at = await dateHelper.convertToGmt7StringFormat(new Date());
        user.updated_at = await dateHelper.convertToGmt7StringFormat(new Date());

        const checkName = await query.getUserBy([{
            variable: 'name',
            value: name
        }]);
        if (validate.isEmpty(checkName.data)) {
            const newUser = await query.saveUser(user);
            if (newUser.err) return wrapper.error('fail', 'register user failed', 500);
            logger.log('success', 'register user success');
            return wrapper.data(user, 'register user success', 200);
        }
        logger.log('error', 'Name hase been used');
        return wrapper.error('fail', 'Name has been used', 409);
    }

    async loginUser(payload) {
        const ctx = 'loginUser'
        const {
            phone,
            password
        } = payload

        const getUser = await query.getUserBy([{
            variable: 'phone',
            value: phone
        }])

        if (validate.isEmpty(getUser.data)) {
            logger.log(ctx, 'user not found');
            return wrapper.error('fail', 'user not found', 404);
        }

        const user = getUser.data[0]
        if (user.password !== password) {
            logger.log(ctx, 'password not match');
            return wrapper.error('fail', 'password not match', 400);
        }
        let role = ''
        if (user.role_id === '1') {
            role = 'SuperAdmin'
        } else if (user.role_id === '2') {
            role = 'Admin'
        } else {
            role = 'Non Admin'
        }

        const data = {
            name: user.name,
            phone: user.phone,
            role_id: user.role_id,
            role,
            timestamp: await dateHelper.convertToGmt7StringFormat(new Date())
        }
        const token = await jwtAuth.generateToken(data)
        const response = {
            token,
            timestamp: data.timestamp
        }

        logger.log(ctx, 'login user success');
        return wrapper.data(response, 'login user success', 200);
    }

    async detailUser(payload) {
        const ctx = 'detailUser'
        const {
            phone,
            name
        } = payload

        const getUser = await query.getUserBy([{
            variable: 'phone',
            value: phone
        }, {
            variable: 'name',
            value: name
        }])

        if (validate.isEmpty(getUser.data)) {
            logger.log(ctx, 'user not found');
            return wrapper.error('fail', 'user not found', 404);
        }

        logger.log(ctx, 'get detail user success');
        return wrapper.data(payload, 'get detail user success', 200);
    }

    async genRandomChar(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}

module.exports = Users;