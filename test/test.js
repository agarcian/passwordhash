'use strict';

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var passwordhash = require('../index');

// Notes on lab.
// return done() to indicate success.
// return done(err) to indicate failure.
// if no done is returned, it indicates that the test is in development and it will timeout (2s) and fail.
// If no callback function is provided, the test is considered a TO DO reminder and will be skipped.


lab.experiment('password hash', function() {

    lab.test('returns true when validating a password hash', function(done) {

        passwordhash.createHash('my password', function(err, hash) {

            passwordhash.validateHash('my password', hash, function(err, success) {

                Code.expect(err).to.be.null();
                Code.expect(success).to.be.true();
                done();   // do done(err) if failed.

            });

        });

    });

    lab.test('return false when validating an incorrect password and a hash', function(done) {

        passwordhash.createHash('my password', function(err, hash) {

            passwordhash.validateHash('my BAD password', hash, function(err, success) {

                Code.expect(err).to.be.null();  // No error is expected, simply a non-match.
                Code.expect(success).to.be.false();
                done();

            });

        });

    });

    lab.test('return error when sending an invalid hash to validate', function(done) {

        passwordhash.validateHash('my BAD password', "invalid hash", function(err, success) {

            Code.expect(err).to.be.not.null();  // No error is expected, simply a non-match.
            Code.expect(success).to.be.false();
            done();

        });

    });

    lab.test('Validates a hash created with other system (.net) with a known password.', function(done) {

        var existingHash = "sha1:20000:p5GwEABDCx/HwW9p2gMXoyUAMXkWNPU4:dRUwYNvT0iapWk3l+OaiFPzb6z/ii20r";
        passwordhash.validateHash('Florence123', existingHash, function(err, success) {

            Code.expect(err).to.be.null();  // No error is expected, simply a non-match.
            Code.expect(success).to.be.true();
            done();

        });

    });

    lab.test('Validates a hash created with other system (.net) with an invalid password.', function(done) {

        var existingHash = "sha1:20000:p5GwEABDCx/HwW9p2gMXoyUAMXkWNPU4:dRUwYNvT0iapWk3l+OaiFPzb6z/ii20r";
        passwordhash.validateHash('BadPassword', existingHash, function(err, success) {

            Code.expect(err).to.be.null();  // No error is expected, simply a non-match.
            Code.expect(success).to.be.false();
            done();

        });

    });


});