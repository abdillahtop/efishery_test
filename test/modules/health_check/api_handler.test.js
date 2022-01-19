const assert = require('assert')
const sinon = require('sinon')
const { expect } = require('chai')
const handler = require('../../../bin/modules/health_check/api_handler')
const Service = require('../../../bin/modules/health_check/service')
const service = new Service()

describe('#health-check-handler', () => {
    let res;
    beforeEach(() => {
        res = {
            send: function() {
                return true;
            }
        };
    });

    const resultSucces = {
        err: null,
        message: 'success',
        data: [],
        code: 200
    };

    describe('checkHealthCheck', () => {
        it('Should error', async () => {
            sinon.stub(service, 'getPingMysql').resolves({
                err: null
            })
            expect(await handler.checkHealthCheck(resultSucces, res));
            service.getPingMysql.restore()
        })


    })
})