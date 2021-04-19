'use strict';

// https://javadoc.io/static/com.googlecode.libphonenumber/libphonenumber/8.8.0/com/google/i18n/phonenumbers/PhoneNumberUtil.PhoneNumberType.html
// https://github.com/ruimarinho/google-libphonenumber/issues/92
const phoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil;
const phoneNumberType = require('google-libphonenumber').PhoneNumberType;

function createValidatorService() {
    function isCorrectShape(phoneNumber) {
        return /^[0-9+][0-9 \-()+]+[0-9]$/.test(phoneNumber);
    }

    function isValidMobilePhoneNumber(input) {
        try {
            // decode unicode characters and then remove any, now unescaped, whitespace.
            // this is inside the `try` block so that is deliberately throws when there is
            // incomprehensible characters in the string. `decodeURIComponent` will fall
            // over and throw an error.
            // `\s` doesn't include the "zero-width space". explicitly removing it with
            // the addition of `\u200B` in the regex.
            const sanitisedInput = decodeURIComponent(input).replace(/[\s\u200B]/g, '');
            if (!isCorrectShape(sanitisedInput)) {
                return false;
            }
            const phoneUtil = phoneNumberUtil.getInstance();
            const number = phoneUtil.parseAndKeepRawInput(sanitisedInput, 'GB');

            if (phoneUtil.isValidNumber(number)) {
                const inputtedPhoneNumberType = phoneUtil.getNumberType(number);
                if (inputtedPhoneNumberType === phoneNumberType.MOBILE) {
                    return true;
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
