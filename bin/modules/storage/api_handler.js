const wrapper = require('../../helpers/utils/wrapper');
const Service = require('./service');
const validator = require('./validator');
const handleService = new Service();

module.exports = {

    listStorage: async (req, res) => {
        const {
            name,
            role_id
        } = req.token
        const payload = req.body

        const sendResponse = async (result) => {
            (result.err) ? wrapper.response(res, 'fail', result):
                wrapper.response(res, 'success', result, result.message);
        };
        sendResponse(await handleService.listStorage({
            ...payload,
            name,
            role_id
        }));
    },

    sumamryStorage: async (req, res) => {
        const {
            name,
            role_id
        } = req.token
        const payload = req.body
        if (parseInt(role_id) > 2) {
            return wrapper.response(res, 'fail', {
                data: null,
                message: 'Your role not allowed!',
                code: 401
            })
        }

        const sendResponse = async (result) => {
            (result.err) ? wrapper.response(res, 'fail', result):
                wrapper.response(res, 'success', result, result.message);
        };
        sendResponse(await handleService.sumamryStorage({
            ...payload,
            name,
            role_id
        }));
    },

    updateCurrency: async (req, res) => {
        const {
            name
        } = req.token
        const payload = req.body

        const sendResponse = async (result) => {
            console.log(result);
            (result.err) ? wrapper.response(res, 'fail', result):
                wrapper.response(res, 'success', result, result.message);
        };
        sendResponse(await handleService.updateCurrency({
            ...payload,
            name
        }));
    }
};