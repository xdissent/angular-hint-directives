var ddLibData = require('./ddLib-data'),
  SEVERITY_ERROR = 1;

module.exports = function(info, id, type) {
  var message = ddLibData.directiveTypes[info.directiveType].message + type + ' element' + id + '. ';
  var error = info.error;
  error = (error.charAt(0) === '*') ? error.substring(1): error;
  message += 'Found deprecated directive "' + error + '". Use an alternative solution.';
  return [message, SEVERITY_ERROR];
};
