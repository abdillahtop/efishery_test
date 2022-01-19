const moment = require('moment')

module.exports = class DateHelper {

    async getStartOfYear() {
        const startOfYear = moment().startOf('year').toDate()
        return startOfYear
    }

    async getStartOfYear() {
        const startOfYear = moment().startOf('year').toDate()
        return startOfYear
    }

    async getStartOfMonth(date) {
        const startOfMonth = moment(date).startOf('month').toDate()
        return startOfMonth
    }

    async getStartOfCurrentMonth() {
        return this.getStartOfMonth(moment())
    }

    async getEndOfMonth(date) {
        const endOfMonth = moment(date).endOf('month').toDate()
        return endOfMonth
    }

    async getEndOfCurrentMonth() {
        return this.getEndOfMonth(moment())
    }

    async formatDateTime(date, format) {
        if (!date) return null
        const d = moment(date)
        return d.isValid() ? d.format(format) : (null)
    }

    async formatDateCommon(date) {
        return this.formatDateTime(date, 'YYYY-MM-DD')
    }

    async formatDateTimeCommon(date) {
        return this.formatDateTime(date, 'YYYY-MM-DD HH:mm:ss')
    }

    async getCurrentWibMomentTime() {
        return moment.utc().add(420, 'm')
    }

    async getMomentDateFromQueryParam(date) {
        return date instanceof Date ? moment(date) : moment(date, 'YYYY-MM-DD')
    }

    async getMomentCutOffStartDate(
        startDate,
        cutOffHour = 0
    ) {
        const sDate = moment(startDate).set({
            hour: cutOffHour,
            minute: 0,
            second: 0,
            millisecond: 0,
        })

        return sDate
    }

    async getFormattedCutOffStartDate(
        startDate,
        cutOffHour = 0
    ) {
        const s = this.getMomentCutOffStartDate(startDate, cutOffHour).format(
            'YYYY-MM-DD HH:mm:ss'
        )
        return s
    }

    async getMomentCutOffEndDate(
        endDate,
        cutOffHour = 0
    ) {
        const eDate = moment(endDate)
            .add(1, 'day')
            .set({
                hour: cutOffHour,
                minute: 0,
                second: 0,
                millisecond: 0
            })

        return eDate
    }

    async getFormattedCutOffEndDate(
        endDate,
        cutOffHour = 0
    ) {
        const s = this.getMomentCutOffEndDate(endDate, cutOffHour).format(
            'YYYY-MM-DD HH:mm:ss'
        )
        return s
    }

    async resetMomentTime(d) {
        return moment(d).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        })
    }

    async resetTime(d) {
        const m = moment(d)
        return new Date(
            m.get('year'),
            m.get('month'),
            m.get('date'),
            0,
            0,
            0,
            0
        )
    }

    async convertToGmt7StringFormat(date, includeGmt = true) {
        const mDate = moment.isMoment(date) ? date : moment.utc(date)
        if (includeGmt) {
            var part1 = mDate.format('YYYY-MM-DD')
            var part2 = mDate.format('HH:mm:ss')
            return `${part1}T${part2}+07:00`
        } else {
            return mDate.format('YYYY-MM-DD HH:mm:ss')
        }
    }
}