const sinon = require('sinon');
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const validator = require('../../../bin/modules/users/validator');

describe('#validator', () => {

    const succes = { error: false };
    const failed = {
        error: {
            details: [{
                message: 'error'
            }]
        }
    };

    const payload = {
        asd: 'asd'
    };

    describe('#isValidRegisterUser', () => {
        it('Should success valid payload', async () => {
            sinon.stub(Joi, 'validate').resolves(succes);
            await validator.isValidRegisterUser();
            Joi.validate.restore();
        });

        it('Should not valid payload', async () => {
            sinon.stub(Joi, 'validate').resolves(failed);
            await validator.isValidRegisterUser(payload);
            Joi.validate.restore();
        });
    });

    describe('#isValidloginUser', () => {
        it('Should success valid payload', async () => {
            sinon.stub(Joi, 'validate').resolves(succes);
            await validator.isValidloginUser();
            Joi.validate.restore();
        });

        it('Should not valid payload', async () => {
            sinon.stub(Joi, 'validate').resolves(failed);
            await validator.isValidloginUser(payload);
            Joi.validate.restore();
        });
    });
});