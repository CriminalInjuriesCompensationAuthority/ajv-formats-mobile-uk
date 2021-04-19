'use strict';

// https://javadoc.io/static/com.googlecode.libphonenumber/libphonenumber/8.8.0/com/google/i18n/phonenumbers/PhoneNumberUtil.PhoneNumberType.html
// https://github.com/ruimarinho/google-libphonenumber/issues/92
const phoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil;
const phoneNumberType = require('google-libphonenumber').PhoneNumberType;
const phoneNumberFormat = require('google-libphonenumber').PhoneNumberFormat;

function createValidatorService() {
    // added to circumvent this issue:
    // https://github.com/ruimarinho/google-libphonenumber/issues/279
    function containsIllegalCharacter(input) {
        // remove dashed and spaces from the input.
        // we do not need to explicitly test for these characters because
        // the Notify Service handles these characters itself and can
        // parse a phone number with them in it.
        const trimmedUnhyphenatedInput = input.replace(/[\s-]/g, '');
        return !/^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}$/.test(trimmedUnhyphenatedInput);
    }

    function isValidMobilePhoneNumber(input) {
        try {
            if (containsIllegalCharacter(input)) {
                return false;
            }
            const phoneUtil = phoneNumberUtil.getInstance();
            const number = phoneUtil.parse(input, 'GB');
            phoneUtil.format(number, phoneNumberFormat.INTERNATIONAL);
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
