'use strict';

const ajvFormatsMobileUk = require('./index');

describe('validator', () => {
    describe('UK mobile phone number', () => {
        it('should accept a UK mobile number', () => {
            const result = ajvFormatsMobileUk('07701 234567');
            expect(result).toEqual(true);
        });

        it('should accept a UK mobile number represented in international format', () => {
            const result = ajvFormatsMobileUk('+447701 234567');
            expect(result).toEqual(true);
        });

        it('should reject a UK landline number', () => {
            const result = ajvFormatsMobileUk('0141 420 5000');
            expect(result).toEqual(false);
        });

        it('should reject a UK landline number represented in international format', () => {
            const result = ajvFormatsMobileUk('+44141 420 5000');
            expect(result).toEqual(false);
        });

        it('should reject a foreign mobile number', () => {
            const result = ajvFormatsMobileUk('06 23 12 45 54');
            expect(result).toEqual(false);
        });

        it('should reject a foreign landline number represented in international format', () => {
            const result = ajvFormatsMobileUk('05 56 10 20 30');
            expect(result).toEqual(false);
        });
    });
});
