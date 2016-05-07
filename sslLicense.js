/**
 * Created by Jeff on 2016/5/3.
 */

var fs = require('fs');

//ssl license

var keyPath = 'ssl/privkey.pem';
var certPath = 'ssl/cert.pem';

var hskey = fs.readFileSync(keyPath);
var hscert = fs.readFileSync(certPath);

var options = {
    key : hskey,
    cert : hscert
};

//ssl object

var ssl = {};

ssl.options = options;

module.exports = ssl;

