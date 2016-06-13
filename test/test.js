'use strict';

var expect = require("chai").expect;

var passwordhash = require('../index');

describe('password hash', function() {

    it('should return true when validating a password hash', function(done) {

        passwordhash.createHash('my password', function(err, hash) {

            expect(err).to.be.null;
            passwordhash.validateHash('my password', hash, function(err, success) {

                expect(err).to.be.null;
                expect(success).to.be.true;
                done();
            });
        });
    });

    it('should return false when validating an incorrect password and a hash', function(done) {

        passwordhash.createHash('my password', function(err, hash) {

            expect(err).to.be.null;
            passwordhash.validateHash('my BAD password', hash, function(err, success) {

                expect(err).to.be.null;  // No error is expected, simply a non-match.
                expect(success).to.be.false;
                done();
            });
        });
    });

    it('should return error when sending an invalid hash to validate', function(done) {

        passwordhash.validateHash('my BAD password', "invalid hash", function(err, success) {

            expect(err).to.be.not.null;  // No error is expected, simply a non-match.
            expect(success).to.be.false;
            done();
        });
    });

    it('should validate a hash created with other system (.net) with a known password.', function(done) {

        var existingHash = "sha1:20000:p5GwEABDCx/HwW9p2gMXoyUAMXkWNPU4:dRUwYNvT0iapWk3l+OaiFPzb6z/ii20r";
        passwordhash.validateHash('Florence123', existingHash, function(err, success) {

            expect(err).to.be.null;  // No error is expected, simply a non-match.
            expect(success).to.be.true;
            done();
        });
    });

    it('should validate a hash created with other system (.net) with an invalid password.', function(done) {

        var existingHash = "sha1:20000:p5GwEABDCx/HwW9p2gMXoyUAMXkWNPU4:dRUwYNvT0iapWk3l+OaiFPzb6z/ii20r";
        passwordhash.validateHash('BadPassword', existingHash, function(err, success) {

            expect(err).to.be.null;  // No error is expected, simply a non-match.
            expect(success).to.be.false;
            done();
        });
    });
});