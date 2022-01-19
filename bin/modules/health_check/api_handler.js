const wrapper = require('../../helpers/utils/wrapper');
const Service = require('./service')
const service = new Service()

const checkHealthCheck = async (req, res) => {
  const postRequest = async () => {
    return await service.healthCheck();
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result) :
      wrapper.response(res, 'success', result, 'Health check success');
  };
  sendResponse(await postRequest());

};

module.exports = {
  checkHealthCheck
};
