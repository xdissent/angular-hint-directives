var dasherize = require('dasherize');
var validate = require('validate-element-name');

module.exports = function(str) {
  var dashStr = dasherize(str);
  var validated = !validate(dashStr).message ? true : false;
  //Check for message definition because validate-element-name returns true for things starting
  //with ng-, polymer-, and data- but message is defined for those and errors.
  return validated && str.toLowerCase() !== str;
};
