"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// this domain regex matches all domains that have at least one .
// sadly IPv4 Adresses will be caught too but technically those are valid domains
// this expression is extracted from the original RFC 5322 mail expression
// a modification enforces that the tld consists only of characters
var rxDomain = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z-]*[a-z])?'; // this domain regex matches everythign that could be a domain in intranet
// that means "localhost" is a valid domain

var rxNameDomain = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\\.|$))+'; // strict IPv4 expression which allows 0-255 per oktett

var rxIPv4 = '(?:(?:[0-1]?\\d{1,2}|2[0-4]\\d|25[0-5])(?:\\.|$)){4}'; // strict IPv6 expression which allows (and validates) all shortcuts

var rxIPv6 = '(?:(?:[\\dA-Fa-f]{1,4}(?::|$)){8}' // full adress
+ '|(?=(?:[^:\\s]|:[^:\\s])*::(?:[^:\\s]|:[^:\\s])*$)' // or min/max one '::'
+ '[\\dA-Fa-f]{0,4}(?:::?(?:[\\dA-Fa-f]{1,4}|$)){1,6})'; // and short adress
// this allows domains (also localhost etc) and ip adresses

var rxWeakDomain = "(?:".concat([rxNameDomain, rxIPv4, rxIPv6].join('|'), ")"); // unique id from the random package also used by minimongo
// min and max are used to set length boundaries
// set both for explicit lower and upper bounds
// set min as integer and max to null for explicit lower bound and arbitrary upper bound
// set none for arbitrary length
// set only min for fixed length
// character list: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L88
// string length: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L143

var isValidBound = function isValidBound(value, lower) {
  return !value || Number.isSafeInteger(value) && value > lower;
};

var idOfLength = function idOfLength(min, max) {
  if (!isValidBound(min, 0)) throw new Error("Expected a non-negative safe integer, got ".concat(min));
  if (!isValidBound(max, min)) throw new Error("Expected a non-negative safe integer greater than 1 and greater than min, got ".concat(max));
  var bounds;
  if (min && max) bounds = "".concat(min, ",").concat(max);else if (min && max === null) bounds = "".concat(min, ",");else if (min && !max) bounds = "".concat(min);else if (!min && !max) bounds = '0,';else throw new Error("Unexpected state for min (".concat(min, ") and max (").concat(max, ")"));
  return new RegExp("^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{".concat(bounds, "}$"));
};

var regEx = {
  // We use the RegExp suggested by W3C in http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
  // This is probably the same logic used by most browsers when type=email, which is our goal. It is
  // a very permissive expression. Some apps may wish to be more strict and can write their own RegExp.
  Email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  // Like Email but requires the TLD (.com, etc)
  EmailWithTLD: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  Domain: new RegExp("^".concat(rxDomain, "$")),
  WeakDomain: new RegExp("^".concat(rxWeakDomain, "$")),
  IP: new RegExp("^(?:".concat(rxIPv4, "|").concat(rxIPv6, ")$")),
  IPv4: new RegExp("^".concat(rxIPv4, "$")),
  IPv6: new RegExp("^".concat(rxIPv6, "$")),
  // URL RegEx from https://gist.github.com/dperini/729294
  // http://mathiasbynens.be/demo/url-regex
  Url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
  // default id is defined with exact 17 chars of length
  Id: idOfLength(17),
  idOfLength: idOfLength,
  // allows for a 5 digit zip code followed by a whitespace or dash and then 4 more digits
  // matches 11111 and 11111-1111 and 11111 1111
  ZipCode: /^\d{5}(?:[-\s]\d{4})?$/,
  // taken from Google's libphonenumber library
  // https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js
  // reference the VALID_PHONE_NUMBER_PATTERN key
  // allows for common phone number symbols including + () and -
  Phone: /^[0-9０-９٠-٩۰-۹]{2}$|^[+＋]*(?:[-x‐-―−ー－-／  ­​⁠　()（）［］.\[\]/~⁓∼～*]*[0-9０-９٠-٩۰-۹]){3,}[-x‐-―−ー－-／  ­​⁠　()（）［］.\[\]/~⁓∼～0-9０-９٠-٩۰-۹]*(?:;ext=([0-9０-９٠-٩۰-۹]{1,7})|[  \t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|[,xｘ#＃~～]|int|anexo|ｉｎｔ)[:\.．]?[  \t,-]*([0-9０-９٠-٩۰-۹]{1,7})#?|[- ]+([0-9０-９٠-٩۰-۹]{1,5})#)?$/i // eslint-disable-line no-irregular-whitespace

};
var _default = regEx;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;