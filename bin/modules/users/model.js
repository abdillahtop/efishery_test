const DateHelper = require("../../helpers/utils/date");
const dateHelper = new DateHelper()

module.exports = {
    user: () => {
        const model = {
            user_id: '',
            name: '',
            phone: '',
            password: '',
            role_id: '',
            created_at: '',
            updated_at: ''
        };
        return model;
    }
};