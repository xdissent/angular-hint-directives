var ddLibData = require('./ddLib-data'),
  SEVERITY_ERROR = 1;

module.exports = function(info, id, type) {
  var message = ddLibData.directiveTypes[info.directiveType].message + type + ' element' +
    id + '. ',
    error = (info.error.charAt(0) === '*') ? info.error.substring(1): info.error,
    aecmType = (info.wrongUse.indexOf('attribute') > -1)? 'Element' : 'Attribute';
  message += aecmType + ' name "' + error + '" is reserved for ' + info.wrongUse + ' names only.';
  return [message, SEVERITY_ERROR];
};
