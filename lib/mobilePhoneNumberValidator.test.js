'use strict';

const createValidatorService = require('./mobilePhoneNumberValidator');

describe('validator', () => {
    describe('UK mobile phone number', () => {
        const validator = createValidatorService();

        describe('UK mobile number', () => {
            it('should validate an 11-digit mobile number with leading-zero', () => {
                const result = validator.isValidMobilePhoneNumber('07713590327');
                expect(result).toBe(true);
            });

            it('should validate a 10-digit mobile number with no leading-zero', () => {
                const result = validator.isValidMobilePhoneNumber('7123456789');
                expect(result).toBe(true);
            });

            it('should validate a mobile number with "+" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+447701234567');
                expect(result).toBe(true);
            });

            it('should validate a mobile number with "00" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('00447123456789');
                expect(result).toBe(true);
            });

            it('should validate a default space-delimited formatted mobile number', () => {
                const result = validator.isValidMobilePhoneNumber('07123 456789');
                expect(result).toBe(true);
            });

            it('should validate a custom space-delimited formatted mobile number', () => {
                const result = validator.isValidMobilePhoneNumber('071234 56789');
                expect(result).toBe(true);
            });

            it('should validate a default hyphen-delimited formatted mobile number', () => {
                const result = validator.isValidMobilePhoneNumber('07123-456-789');
                expect(result).toBe(true);
            });

            it('should validate a custom hyphen-delimited formatted mobile number', () => {
                const result = validator.isValidMobilePhoneNumber('077-012-34567');
                expect(result).toBe(true);
            });

            it('should validate a default space-delimited formatted mobile number with international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+44770 1234567');
                expect(result).toBe(true);
            });

            it('should validate a another default space-delimited formatted mobile number with international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+44 770 1234567');
                expect(result).toBe(true);
            });

            it('should validate a custom space-delimited formatted mobile number with international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+4477 01234567');
                expect(result).toBe(true);
            });

            it('should validate a custom hyphen-delimited formatted mobile number with international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+44770-123-4567');
                expect(result).toBe(true);
            });

            it('should validate a custom space-and-hyphen-delimited formatted mobile number with international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+44 770-123-4567');
                expect(result).toBe(true);
            });

            it('should validate a space-delimited formatted mobile number with "00" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('00 44 7123456789');
                expect(result).toBe(true);
            });

            it('should validate a space-delimited formatted mobile number with "+" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+44 7123 456 789');
                expect(result).toBe(true);
            });

            it('should validate a bracketed space-delimited formatted mobile number with "+" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+44 (0)7123 456 789');
                expect(result).toBe(true);
            });

            it('should validate an encoded, bracketed, space-delimited formatted mobile number with "+" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber(
                    '\u200B\t\t+44 (0)7123 \uFEFF 456 789 \r\n'
                );
                expect(result).toBe(true);
            });
        });

        describe('UK landline phone number', () => {
            it('should NOT validate a GB landline number', () => {
                const result = validator.isValidMobilePhoneNumber('0141 420 5000');
                expect(result).toBe(false);
            });

            it('should NOT validate a GB landline number with international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+44141 420 5000');
                expect(result).toBe(false);
            });
        });

        describe('malformed phone number', () => {
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

            it('should NOT validate a long invalid integer number', () => {
                const result = validator.isValidMobilePhoneNumber(862313);
                expect(result).toBe(false);
            });

            it('should NOT validate a string', () => {
                const result = validator.isValidMobilePhoneNumber('notamobilenumber');
                expect(result).toBe(false);
            });

            it('should NOT validate an undefined', () => {
                const result = validator.isValidMobilePhoneNumber();
                expect(result).toBe(false);
            });

            it('should NOT validate an boolean `false``', () => {
                const result = validator.isValidMobilePhoneNumber(false);
                expect(result).toBe(false);
            });

            it('should NOT validate an boolean `true``', () => {
                const result = validator.isValidMobilePhoneNumber(true);
                expect(result).toBe(false);
            });
        });

        describe('invalid UK mobile number', () => {
            describe('too many digits', () => {
                it('should NOT validate a 12-digit phone number with no leading-zero', () => {
                    const result = validator.isValidMobilePhoneNumber('712345678910');
                    expect(result).toBe(false);
                });

                it('should NOT validate a 13-digit phone number with a leading-zero', () => {
                    const result = validator.isValidMobilePhoneNumber('0712345678910');
                    expect(result).toBe(false);
                });

                it('should NOT validate a 12-digit phone number with "00" international prefix', () => {
                    const result = validator.isValidMobilePhoneNumber('0044712345678910');
                    expect(result).toBe(false);
                });

                it('should NOT validate a bracketed 13-digit phone number with "+" international prefix', () => {
                    const result = validator.isValidMobilePhoneNumber('+44 (0)7123 456 789 10');
                    expect(result).toBe(false);
                });
            });

            describe('too few digits', () => {
                it('should NOT validate a 9-digit phone number with no leading-zero', () => {
                    const result = validator.isValidMobilePhoneNumber('712345678');
                    expect(result).toBe(false);
                });
                it('should NOT validate a 10-digit phone number with a leading-zero', () => {
                    const result = validator.isValidMobilePhoneNumber('0712345678');
                    expect(result).toBe(false);
                });

                it('should NOT validate a 8-digit phone number with "00" international prefix', () => {
                    const result = validator.isValidMobilePhoneNumber('004471234567');
                    expect(result).toBe(false);
                });

                it('should NOT validate a 7-digit phone number with "00" international prefix', () => {
                    const result = validator.isValidMobilePhoneNumber('00447123456');
                    expect(result).toBe(false);
                });

                it('should NOT validate a bracketed space-delimited 9-digit phone number with "+" international prefix', () => {
                    const result = validator.isValidMobilePhoneNumber('+44 (0)7123 456 78');
                    expect(result).toBe(false);
                });
            });

            describe('non-UK phone number', () => {
                it('should NOT validate a space-delimited freephone number ', () => {
                    const result = validator.isValidMobilePhoneNumber('08081 570364');
                    expect(result).toBe(false);
                });

                it('should NOT validate a space-delimited freephone number with international prefix ', () => {
                    const result = validator.isValidMobilePhoneNumber('+44 8081 570364');
                    expect(result).toBe(false);
                });

                it('should NOT validate a default space-delimited Bristol landline number ', () => {
                    const result = validator.isValidMobilePhoneNumber('0117 496 0860');
                    expect(result).toBe(false);
                });

                it('should NOT validate a default space-delimited Bristol landline number with international prefix', () => {
                    const result = validator.isValidMobilePhoneNumber('+44 117 496 0860');
                    expect(result).toBe(false);
                });

                it('should NOT validate a default space-delimited London landline number', () => {
                    const result = validator.isValidMobilePhoneNumber('020 7946 0991');
                    expect(result).toBe(false);
                });

                it('should NOT validate a default space-delimited London landline number with international prefix', () => {
                    const result = validator.isValidMobilePhoneNumber('+44 20 7946 0991');
                    expect(result).toBe(false);
                });
            });

            describe('contains letters or symbols', () => {
                it('should NOT validate a mobile number with full stops at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07123 456789...');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with symbols in it', () => {
                    const result = validator.isValidMobilePhoneNumber('07123☟☜⬇⬆☞☝');
                    expect(result).toBe(false);
                });

                it('should NOT validate a default space-delimited mobile number with symbols in it', () => {
                    const result = validator.isValidMobilePhoneNumber('07123 ☟☜⬇⬆☞☝');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with malicious commands in it', () => {
                    const result = validator.isValidMobilePhoneNumber('07";DROP TABLE;"');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with a alpha characters in it', () => {
                    const result = validator.isValidMobilePhoneNumber('+44 07ab cde fgh');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with 1337 in it', () => {
                    const result = validator.isValidMobilePhoneNumber('ALPHANUM3R1C');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with a comma at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327,');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with an alpha character at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327a');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with alpha characters at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327gg');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with an alpha character at the start', () => {
                    const result = validator.isValidMobilePhoneNumber('z07713590327');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with alpha characters at the start', () => {
                    const result = validator.isValidMobilePhoneNumber('ge07713590327');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with an alpha character in the middle', () => {
                    const result = validator.isValidMobilePhoneNumber('07890x32109');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with alpha characters in the middle', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590nf327');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with individual alpha characters in the middle', () => {
                    const result = validator.isValidMobilePhoneNumber('077v1359b0327');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with multiple alpha characters in the middle', () => {
                    const result = validator.isValidMobilePhoneNumber('07yt713590nf327');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with a full stop at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327.');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with a question mark at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327?');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with an open parenthesis at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327(');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with a semi-colon at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327;');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with symbols at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327(*%£%&£');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with a html tag at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327<a/>');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with alpha characters and symbols at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327@~#kjdh');
                    expect(result).toBe(false);
                });

                it('should NOT validate a mobile number with interpretable instructions at the end', () => {
                    const result = validator.isValidMobilePhoneNumber('07713590327+=""');
                    expect(result).toBe(false);
                });
            });
        });

        describe('international phone numbers', () => {
            it('should NOT validate a russia phone number', () => {
                const result = validator.isValidMobilePhoneNumber('71234567890');
                expect(result).toBe(false);
            });

            it('should NOT validate an american hyphen-delimited phone number', () => {
                const result = validator.isValidMobilePhoneNumber('1-202-555-0104');
                expect(result).toBe(false);
            });

            it('should NOT validate an american phone number with "+" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+12025550104');
                expect(result).toBe(false);
            });

            it('should NOT validate an american phone number with "00" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('0012025550104');
                expect(result).toBe(false);
            });

            it('should NOT validate an american phone number with "+00" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('+0012025550104');
                expect(result).toBe(false);
            });

            it('should NOT validate a mauritius phone number', () => {
                const result = validator.isValidMobilePhoneNumber('23051234567');
                expect(result).toBe(false);
            });

            it('should NOT validate a cook islands phone number', () => {
                const result = validator.isValidMobilePhoneNumber('+682 12345');
                expect(result).toBe(false);
            });

            it('should NOT validate a france phone number', () => {
                const result = validator.isValidMobilePhoneNumber('+3312345678');
                expect(result).toBe(false);
            });

            it('should NOT validate a france phone number with "00" international prefix', () => {
                const result = validator.isValidMobilePhoneNumber('003312345678');
                expect(result).toBe(false);
            });
        });
    });
});
