var ddLibData = require('./ddLib-data'),
  SEVERITY_ERROR = 1;

module.exports = function(info, id, type) {
  var message = ddLibData.directiveTypes[info.directiveType].message + type + ' element' + id + '. ';
  var error = (info.error.charAt(0) === '*') ? info.error.substring(1): info.error;
  message += 'Found incorrect attribute "' + error + '" try "' + info.match + '".';
  return [message, SEVERITY_ERROR];
};
