const query = require('./query');
const wrapper = require('../../helpers/utils/wrapper');
const validate = require('validate.js');
const config = require('../../configs/global_config');
const uuid = require('uuid/v4');
const logger = require('../../helpers/utils/logger');
const DateHelper = require("../../helpers/utils/date");
const axios = require('axios')
const lodash = require('lodash')
const moment = require('moment')

class Storage {
    async listStorage(payload) {
        const ctx = 'listStorage'
        const {
            name,
            role_id
        } = payload

        try {
            const storage = await axios.get(`${config.get('/storage')}`)
            if (!validate.isEmpty(storage.data)) {
                const data = await this.removeNull(storage.data)
                const nowCurrency = await query.newCurrency()
                if (!validate.isEmpty(nowCurrency.data)) {
                    const perUsd = nowCurrency.data[0].idr
                    for (let i = 0; i < data.length; i++) {
                        data[i].usd = (Number(data[i].price) / perUsd).toFixed(2)
                        data[i].updateUsdAt = nowCurrency.data[0].created_at
                    }
                    logger.log(ctx, 'list storage success');
                    return wrapper.data(data, 'list storage success without usd', 200);
                }
                data.USD = '0'
                logger.log(ctx, 'list storage success');
                return wrapper.data(data, 'list storage success without usd', 200);
            }
            logger.log(ctx, 'list storage success');
            return wrapper.data([], 'list storage success empty', 200);
        } catch (error) {
            return wrapper.error(ctx, 'internal server error', 500);
        }
    }

    async sumamryStorage(payload) {
        const ctx = 'sumamryStorage'
        const {
            name,
            role_id
        } = payload

        try {
            const storage = await axios.get(`${config.get('/storage')}`)
            if (!validate.isEmpty(storage.data)) {
                const data = await this.removeNull(storage.data)
                const convert = data.map(value => {
                    const calculte = value.tgl_parsed.length
                    value.date = (calculte > 20) ? new Date(value.tgl_parsed).toLocaleDateString() : new Date(Number(value.tgl_parsed)).toLocaleDateString()
                    const date = moment(value.date)
                    value.week = Math.ceil(date.date() / 7)
                    return value
                })

                const groups = lodash.groupBy(convert, (item) => {
                    return [item['area_provinsi'], item['date'], item['week']]
                })

                let summary = []
                Object.keys(groups).forEach(async key => {
                    let min = 100000,
                        max = 0,
                        avg = 0,
                        median = 0
                    let price = []
                    if (key != null) {
                        groups[key].map((value, index) => {
                            min = (index = 0 && value.price != null) ? Number(value.price) : min
                            max = (index = 0 && value.price != null) ? Number(value.price) : min
                            min = (value.price != null && Number(value.price) <= min) ? Number(value.price) : min
                            max = (value.price != null && Number(value.price) >= max) ? Number(value.price) : max
                            avg += (value.price != null && Number(value.price)) ? Number(value.price) : 0
                            price.push((value.price != null && Number(value.price)) ? price.push(Number(value.price)) : 0)
                        })
                        median = await this.median(price)

                        const getArea = key.split(',')

                        summary.push({
                            area_provinsi: getArea[0],
                            date: getArea[1],
                            week: getArea[2],
                            summary: {
                                minPrice: min,
                                maxPrice: max,
                                avgPrice: Number((avg / groups[key].length).toFixed(2)),
                                median
                            }
                        })
                    }
                });
                const response = await summary
                logger.log(ctx, 'summary storage');
                return wrapper.data(response, 'summary storage', 200);

            }
            logger.log(ctx, 'summary storage');
            return wrapper.data([], 'summary storage', 200);
        } catch (error) {
            return wrapper.error(error, 'internal server error', 500);
        }
    }

    async updateCurrency(payload) {
        const ctx = 'updateCurrency'
        const {
            name
        } = payload

        try {
            const convert = await axios.get(`${config.get('/convert')}`)
            const data = {
                idr: convert.data.USD_IDR,
                usd: 1,
                name
            }

            const updating = await query.insertCurrency(data)
            if (updating.err) {
                logger.log(ctx, 'internal server error');
                return wrapper.error(updating.err, 'internal server error', 500);
            }

            logger.log(ctx, 'update currentcy success');
            return wrapper.data(data, 'update currentcy success', 200);
        } catch (error) {
            if (error.response.status == 503) {
                return wrapper.error(error, 'Change api key for currency', 503);
            }
            return wrapper.error(error, 'internal server error', 500);
        }
    }

    async removeNull(arr) {
        const filtering = arr.filter(el => {
            if (
                el.uuid != null &&
                el.komoditas != null &&
                el.size != null &&
                el.price != null &&
                el.area_kota != null &&
                el.area_provinsi != null &&
                el.tgl_parsed != null) {
                return el
            }
        });
        return filtering
    }

    async median(arr) {
        let middle = Math.floor(arr.length / 2);
        arr = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
    };
}

module.exports = Storage;