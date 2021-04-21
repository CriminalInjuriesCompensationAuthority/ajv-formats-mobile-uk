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
        // try {
        // if (containsIllegalCharacter(input)) {
        //     return false;
        // }
        const phoneUtil = phoneNumberUtil.getInstance();
        const number = phoneUtil.parse(input, 'GB');

        const formatted = phoneUtil.format(number, phoneNumberFormat.INTERNATIONAL);

        console.log('formatted: ', input, '>>>', formatted);

        // if (phoneUtil.isValidNumber(number)) {
        //     const inputtedPhoneNumberType = phoneUtil.getNumberType(number);
        //     if (inputtedPhoneNumberType === phoneNumberType.MOBILE) {
        //         return true;
        //     }
        // }
        // } catch (err) {
        //     return false;
        // }
        return false;
    }

    return Object.freeze({
        isValidMobilePhoneNumber
    });
}

const numbers = [
    '07713590327,',
    '07713590327a',
    '07713590327gg',
    '07713590327.',
    '07713590327?',
    '07713590327(',
    '07713590327;',
    '07713590327(*%£%&£',
    // '07713590327<a/>', // fail
    // '07713590327@~#kjdh', // fail
    '07713590327+=""',

    // notify valid uk
    '7123456789',
    '07123456789',
    '07123 456789',
    '07123-456-789',
    '00447123456789',
    '00 44 7123456789',
    '+447123456789',
    '+44 7123 456 789',
    '+44 (0)7123 456 789'
];
const svc = createValidatorService();

numbers.forEach(number => svc.isValidMobilePhoneNumber(number));

// console.log(svc.isValidMobilePhoneNumber('07713590327,'));

module.exports = createValidatorService;
