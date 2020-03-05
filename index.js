'use strict';

const createValidatorService = require('./lib/mobilePhoneNumberValidator');

module.exports = phoneNumber => {
    const validatorService = createValidatorService();
    return validatorService.isValidMobilePhoneNumber(phoneNumber);
};
