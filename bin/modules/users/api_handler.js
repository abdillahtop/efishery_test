const wrapper = require('../../helpers/utils/wrapper');
const Service = require('./service');
const validator = require('./validator');
const handleService = new Service();

// const allUser = async (req, res) => {
//   const sendResponse = async (result) => {
//     (result.err) ? wrapper.response(res, 'fail', result) :
//       wrapper.response(res, 'success', result, 'all user success');
//   };
//   sendResponse(await queryHandler.listUser());
// };

module.exports = {
    registerUser: async (req, res) => {
        const payload = req.body;
        const validateParam = await validator.isValidRegisterUser(payload);
        const postRequest = async (result) => {
            if (result.err) {
                return result;
            }
            return await handleService.registerUser(payload);
        };
        const sendResponse = async (result) => {
            (result.err) ? wrapper.response(res, 'fail', result):
                wrapper.response(res, 'success', result, result.message);
        };
        sendResponse(await postRequest(validateParam));
    },

    loginUser: async (req, res) => {
        const payload = req.body;
        const validateParam = await validator.isValidloginUser(payload);
        const postRequest = async (result) => {
            if (result.err) {
                return result;
            }
            return await handleService.loginUser(payload);
        };
        const sendResponse = async (result) => {
            (result.err) ? wrapper.response(res, 'fail', result):
                wrapper.response(res, 'success', result, result.message);
        };
        sendResponse(await postRequest(validateParam));
    },

    detailUser: async (req, res) => {
        const {
            phone,
            name,
            role,
            timestamp
        } = req.token
        const payload = req.body

        const sendResponse = async (result) => {
            (result.err) ? wrapper.response(res, 'fail', result):
                wrapper.response(res, 'success', result, result.message);
        };
        sendResponse(await handleService.detailUser({
            ...payload,
            phone,
            name,
            role,
            timestamp
        }));
    }
};