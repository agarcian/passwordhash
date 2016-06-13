Password Hash
=========

<img src="https://travis-ci.org/agarcian/passwordhash.svg?branch=master"/>



A node.js module to hash passwords based on this article: https://crackstation.net/hashing-security.htm

## Installation

  `npm install @agarcian/passwordhash`

## Usage

    
    var passwordhash = require('@agarcian/passwordhash');
    
    var pwd  = 'my password';
    var hash = passwordhash.createHash(pwd, function(err, hash) {
        passwordhash.validatePassword(pwd, hash, function(err, success) {
            console.log('The password hash was validated successfully:' + success ? 'yes' : 'no');
        });
    });
  
  Output should be `yes`

## Tests

  `npm test`

