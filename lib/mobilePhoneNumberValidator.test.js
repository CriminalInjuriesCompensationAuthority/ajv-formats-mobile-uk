'use strict';

const createValidatorService = require('./mobilePhoneNumberValidator');

describe('validator', () => {
    describe('UK mobile phone number', () => {
        const validator = createValidatorService();

        it('should validate a GB (by default) mobile number', () => {
            const result = validator.isValidMobilePhoneNumber('07713590327');
            expect(result).toBe(true);
        });

        it('should validate a formatted GB (by default) mobile number', () => {
            const result1 = validator.isValidMobilePhoneNumber('07701 234567');
            const result2 = validator.isValidMobilePhoneNumber('077012 34567');
            const result3 = validator.isValidMobilePhoneNumber('077-012-34567');
            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(true);
        });

        it('should validate a GB (by default) mobile number with international prefix', () => {
            const result = validator.isValidMobilePhoneNumber('+447701234567');
            expect(result).toBe(true);
        });

        it('should validate a formatted GB (by default) mobile number with international prefix', () => {
            const result1 = validator.isValidMobilePhoneNumber('+44770 1234567');
            const result2 = validator.isValidMobilePhoneNumber('+44 770 1234567');
            const result3 = validator.isValidMobilePhoneNumber('+4477 01234567');
            const result4 = validator.isValidMobilePhoneNumber('+44770-123-4567');
            const result5 = validator.isValidMobilePhoneNumber('+44 770-123-4567');
            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(true);
            expect(result4).toBe(true);
            expect(result5).toBe(true);
        });

        it('should NOT validate a GB landline number', () => {
            const result = validator.isValidMobilePhoneNumber('0141 420 5000');
            expect(result).toBe(false);
        });

        it('should NOT validate a GB landline number with international prefix', () => {
            const result = validator.isValidMobilePhoneNumber('+44141 420 5000');
            expect(result).toBe(false);
        });

        it('should NOT validate a long invalid number', () => {
            const result = validator.isValidMobilePhoneNumber('43276385243685724356423594325');
            expect(result).toBe(false);
        });

        it('should NOT validate a short invalid number', () => {
            const result = validator.isValidMobilePhoneNumber('1');
            expect(result).toBe(false);
        });

        it('should NOT validate a short invalid integer number', () => {
            const result = validator.isValidMobilePhoneNumber(1);
            expect(result).toBe(false);
        });

        it('should NOT validate a string', () => {
            const result = validator.isValidMobilePhoneNumber('notamobilenumber');
            expect(result).toBe(false);
        });

        it('should NOT validate a undefined', () => {
            const result = validator.isValidMobilePhoneNumber();
            expect(result).toBe(false);
        });

        it('should validate valid UK mobile numbers', () => {
            const result1 = validator.isValidMobilePhoneNumber('7123456789');
            const result2 = validator.isValidMobilePhoneNumber('07123456789');
            const result3 = validator.isValidMobilePhoneNumber('07123 456789');
            const result4 = validator.isValidMobilePhoneNumber('07123-456-789');
            const result5 = validator.isValidMobilePhoneNumber('00447123456789');
            const result6 = validator.isValidMobilePhoneNumber('00 44 7123456789');
            const result7 = validator.isValidMobilePhoneNumber('+447123456789');
            const result8 = validator.isValidMobilePhoneNumber('+44 7123 456 789');
            const result9 = validator.isValidMobilePhoneNumber('+44 (0)7123 456 789');

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(true);
            expect(result4).toBe(true);
            expect(result5).toBe(true);
            expect(result6).toBe(true);
            expect(result7).toBe(true);
            expect(result8).toBe(true);
            expect(result9).toBe(true);
        });

        it('should NOT validate invalid UK mobile numbers', () => {
            // too many digits.
            const result1 = validator.isValidMobilePhoneNumber('712345678910');
            const result2 = validator.isValidMobilePhoneNumber('0712345678910');
            const result3 = validator.isValidMobilePhoneNumber('0044712345678910');
            const result4 = validator.isValidMobilePhoneNumber('0044712345678910');
            const result5 = validator.isValidMobilePhoneNumber('+44 (0)7123 456 789 10');

            // not enough digits.
            const result6 = validator.isValidMobilePhoneNumber('0712345678');
            const result7 = validator.isValidMobilePhoneNumber('004471234567');
            const result8 = validator.isValidMobilePhoneNumber('00447123456');
            const result9 = validator.isValidMobilePhoneNumber('+44 (0)7123 456 78');

            // not a UK mobile number.
            const result10 = validator.isValidMobilePhoneNumber('08081 570364');
            const result11 = validator.isValidMobilePhoneNumber('+44 8081 570364');
            const result12 = validator.isValidMobilePhoneNumber('0117 496 0860');
            const result13 = validator.isValidMobilePhoneNumber('+44 117 496 0860');
            const result14 = validator.isValidMobilePhoneNumber('020 7946 0991');
            const result15 = validator.isValidMobilePhoneNumber('+44 20 7946 0991');

            // must not contain letters or symbols.
            const result16 = validator.isValidMobilePhoneNumber('07890x32109');
            const result17 = validator.isValidMobilePhoneNumber('07123 456789...');
            const result18 = validator.isValidMobilePhoneNumber('07123 ☟☜⬇⬆☞☝');
            const result19 = validator.isValidMobilePhoneNumber('07123☟☜⬇⬆☞☝');
            const result20 = validator.isValidMobilePhoneNumber('07";DROP TABLE;"');
            const result21 = validator.isValidMobilePhoneNumber('+44 07ab cde fgh');
            const result22 = validator.isValidMobilePhoneNumber('ALPHANUM3R1C');

            expect(result1).toBe(false);
            expect(result2).toBe(false);
            expect(result3).toBe(false);
            expect(result4).toBe(false);
            expect(result5).toBe(false);
            expect(result6).toBe(false);
            expect(result7).toBe(false);
            expect(result8).toBe(false);
            expect(result9).toBe(false);
            expect(result10).toBe(false);
            expect(result11).toBe(false);
            expect(result12).toBe(false);
            expect(result13).toBe(false);
            expect(result14).toBe(false);
            expect(result15).toBe(false);
            expect(result16).toBe(false);
            expect(result17).toBe(false);
            expect(result18).toBe(false);
            expect(result19).toBe(false);
            expect(result20).toBe(false);
            expect(result21).toBe(false);
            expect(result22).toBe(false);
        });

        it('should NOT validate valid international phone numbers', () => {
            // russia.
            const result1 = validator.isValidMobilePhoneNumber('71234567890');
            // usa.
            const result2 = validator.isValidMobilePhoneNumber('1-202-555-0104');
            // usa.
            const result3 = validator.isValidMobilePhoneNumber('+12025550104');
            // usa.
            const result4 = validator.isValidMobilePhoneNumber('0012025550104');
            // usa.
            const result5 = validator.isValidMobilePhoneNumber('+0012025550104');
            // mauritius.
            const result6 = validator.isValidMobilePhoneNumber('23051234567');
            // cook islands.
            const result7 = validator.isValidMobilePhoneNumber('+682 12345');

            const result8 = validator.isValidMobilePhoneNumber('+3312345678');
            const result9 = validator.isValidMobilePhoneNumber('003312345678');
            // 15 digits.
            const result10 = validator.isValidMobilePhoneNumber('1-2345-12345-12345');

            expect(result1).toBe(false);
            expect(result2).toBe(false);
            expect(result3).toBe(false);
            expect(result4).toBe(false);
            expect(result5).toBe(false);
            expect(result6).toBe(false);
            expect(result7).toBe(false);
            expect(result8).toBe(false);
            expect(result9).toBe(false);
            expect(result10).toBe(false);
        });

        describe('Special characters', () => {
            it('should NOT allow trailing comma', () => {
                const result = validator.isValidMobilePhoneNumber('07713590327,');
                expect(result).toBe(false);
            });

            it('should NOT allow alpha characters', () => {
                const result1 = validator.isValidMobilePhoneNumber('07713590327a');
                const result2 = validator.isValidMobilePhoneNumber('07713590327gg');
                expect(result1).toBe(false);
                expect(result2).toBe(false);
            });

            it('should NOT allow punctuation characters', () => {
                const result1 = validator.isValidMobilePhoneNumber('07713590327.');
                const result2 = validator.isValidMobilePhoneNumber('07713590327?');
                const result3 = validator.isValidMobilePhoneNumber('07713590327(');
                const result4 = validator.isValidMobilePhoneNumber('07713590327;');
                expect(result1).toBe(false);
                expect(result2).toBe(false);
                expect(result3).toBe(false);
                expect(result4).toBe(false);
            });

            it('should NOT allow many alpha and other non-numeric characters', () => {
                const result1 = validator.isValidMobilePhoneNumber('07713590327(*%£%&£');
                const result2 = validator.isValidMobilePhoneNumber('07713590327<a/>');
                const result3 = validator.isValidMobilePhoneNumber('07713590327@~#kjdh');
                const result4 = validator.isValidMobilePhoneNumber('07713590327+=""');
                expect(result1).toBe(false);
                expect(result2).toBe(false);
                expect(result3).toBe(false);
                expect(result4).toBe(false);
            });
        });
    });
});
