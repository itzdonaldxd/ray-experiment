'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// this domain regex matches all domains that have at least one .
// sadly IPv4 Adresses will be caught too but technically those are valid domains
// this expression is extracted from the original RFC 5322 mail expression
// a modification enforces that the tld consists only of characters
var rxDomain = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z-]*[a-z])?';
// this domain regex matches everythign that could be a domain in intranet
// that means "localhost" is a valid domain
var rxNameDomain = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\\.|$))+';
// strict IPv4 expression which allows 0-255 per oktett
var rxIPv4 = '(?:(?:[0-1]?\\d{1,2}|2[0-4]\\d|25[0-5])(?:\\.|$)){4}';
// strict IPv6 expression which allows (and validates) all shortcuts
var rxIPv6 = '(?:(?:[\\dA-Fa-f]{1,4}(?::|$)){8}' // full adress
+ '|(?=(?:[^:\\s]|:[^:\\s])*::(?:[^:\\s]|:[^:\\s])*$)' // or min/max one '::'
+ '[\\dA-Fa-f]{0,4}(?:::?(?:[\\dA-Fa-f]{1,4}|$)){1,6})'; // and short adress
// this allows domains (also localhost etc) and ip adresses
var rxWeakDomain = '(?:' + [rxNameDomain, rxIPv4, rxIPv6].join('|') + ')';

var regEx = {
  // We use the RegExp suggested by W3C in http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
  // This is probably the same logic used by most browsers when type=email, which is our goal. It is
  // a very permissive expression. Some apps may wish to be more strict and can write their own RegExp.
  Email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

  // Like Email but requires the TLD (.com, etc)
  EmailWithTLD: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  Domain: new RegExp('^' + rxDomain + '$'),
  WeakDomain: new RegExp('^' + rxWeakDomain + '$'),

  IP: new RegExp('^(?:' + rxIPv4 + '|' + rxIPv6 + ')$'),
  IPv4: new RegExp('^' + rxIPv4 + '$'),
  IPv6: new RegExp('^' + rxIPv6 + '$'),
  // URL RegEx from https://gist.github.com/dperini/729294
  // http://mathiasbynens.be/demo/url-regex
  Url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
  // unique id from the random package also used by minimongo
  // character list: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L88
  // string length: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L143
  Id: /^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$/,
  // allows for a 5 digit zip code followed by a whitespace or dash and then 4 more digits
  // matches 11111 and 11111-1111 and 11111 1111
  ZipCode: /^\d{5}(?:[-\s]\d{4})?$/,
  // taken from Google's libphonenumber library
  // https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js
  // reference the VALID_PHONE_NUMBER_PATTERN key
  // allows for common phone number symbols including + () and -
  Phone: /^[0-9???-?????-????-??]{2}$|^[+???]*(?:[-x???-????????????-??? ?????????????()????????????.\[\]/~?????????*]*[0-9???-?????-????-??]){3,}[-x???-????????????-??? ?????????????()????????????.\[\]/~?????????0-9???-?????-????-??]*(?:;ext=([0-9???-?????-????-??]{1,7})|[ ??\t,]*(?:e?xt(?:ensi(?:o???|??))?n?|??????????????|[,x???#???~???]|int|anexo|?????????)[:\.???]?[ ??\t,-]*([0-9???-?????-????-??]{1,7})#?|[- ]+([0-9???-?????-????-??]{1,5})#)?$/i // eslint-disable-line no-irregular-whitespace
};

exports.default = regEx;