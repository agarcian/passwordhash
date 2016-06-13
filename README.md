Password Hash
=========

![Alt text](https://travis-ci.org/agarcian/passwordhash.svg?branch=master)
![Alt text](https://david-dm.org/agarcian/passwordhash.svg)



A node.js module to hash passwords based on this article: https://crackstation.net/hashing-security.htm

## Installation

  `npm install passwordhash`

## Usage

    
    var passwordhash = require('passwordhash');
    
    var pwd  = 'my password';
    var hash = passwordhash.createHash(pwd, function(err, hash) {
        
        passwordhash.validatePassword(pwd, hash, function(err, success) {
            
            console.log('The password hash was validated successfully:' + success ? 'yes' : 'no');
        });
    });
  
  Output should be `yes`

## Tests

  `npm test`

