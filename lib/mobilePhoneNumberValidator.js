'use strict';

// https://javadoc.io/static/com.googlecode.libphonenumber/libphonenumber/8.8.0/com/google/i18n/phonenumbers/PhoneNumberUtil.PhoneNumberType.html
// https://github.com/ruimarinho/google-libphonenumber/issues/92
const phoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil;
const phoneNumberType = require('google-libphonenumber').PhoneNumberType;

function createValidatorService() {
    function isValidMobilePhoneNumber(input) {
        try {
            const phoneUtil = phoneNumberUtil.getInstance();
            const number = phoneUtil.parseAndKeepRawInput(input, 'GB');
            // formats it to UK mobile format with no leading `0`.
            const formatted = phoneUtil.format(number);

            // check if the end of the inputted string matches the formatted number.
            // i.e. the user could enter "07...", or "+44...", or "7...". This will match
            // all those scenarios.
            if (input.replace(/[\s-]/g, '').endsWith(formatted.replace(/[\s-]/g, ''))) {
                if (phoneUtil.isValidNumber(number)) {
                    const inputtedPhoneNumberType = phoneUtil.getNumberType(number);
                    if (inputtedPhoneNumberType === phoneNumberType.MOBILE) {
                        return true;
                    }
                }
            }
        } catch (err) {
            return false;
        }
        return false;
    }

    return Object.freeze({
        isValidMobilePhoneNumber
    });
}

module.exports = createValidatorService;
