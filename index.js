var passwordhash = exports;

var crypto   = require('crypto'),
    bufferEq = require('buffer-equal-constant-time');


// The following constants may be changed without breaking existing hashes.
var SALT_BYTES        = 24,
    HASH_BYTES        = 24,
    PBKDF2_ITERATIONS = 20000,

    DIGESTFUNC_INDEX  = 0,
    ITERATION_INDEX   = 1,
    SALT_INDEX        = 2,
    PBKDF2_INDEX      = 3;


/**
 * Creates a salted PBKDF2 hash of the password.
 * @param {string} password The password to hash.
 * @param {function} callback The callback containing the result in the form of function(err, derivedHash).
 * @return {string}
 */
passwordhash.createHash = function(password, callback) {
    // Generate a random salt
    var salt = crypto.randomBytes(SALT_BYTES);
    // Hash the password and encode the parameters

    crypto.pbkdf2(password, salt, PBKDF2_ITERATIONS, HASH_BYTES, 'sha256', function(err, hash) {

        process.nextTick(function() {
            if (err) {
                return callback(err, null);
            } else {
                var result = "sha256:" + PBKDF2_ITERATIONS + ":" +
                    salt.toString('base64') + ":" +
                    hash.toString('base64');

                return callback(null, result);
            }
        });

    });

};


/**
 * Validates a password given a hash of the correct one.
 * @param {string} password The password to check.
 * @param {string} goodHash A hash of the correct password.
 * @param {function} callback A callback with the signature function(err, success).
 */
passwordhash.validateHash = function(password, goodHash, callback) {
    // Extract the parameters from the hash
    var delimiter = ':',
        split     = goodHash.split(delimiter);

    try {

        var digestFunc = split[DIGESTFUNC_INDEX];
        var iterations = parseInt(split[ITERATION_INDEX]);
        var salt       = new Buffer(split[SALT_INDEX], 'base64');
        var hash       = new Buffer(split[PBKDF2_INDEX], 'base64');

        // Test the password and the hash by regenerating the hash again and comparing it with the provided hash.
        crypto.pbkdf2(password, salt, iterations, hash.length, digestFunc, function(err, derivedHash) {

            process.nextTick(function() {
                if (err) {
                    return callback(err, false);
                }
                var success = bufferEq(hash, derivedHash);
                return callback(null, success);
            });

        });

    } catch (exc) {
        return callback(exc, false);
    }
};