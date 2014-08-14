var SEVERITY_ERROR = 1;

module.exports = function(info, id, type) {
  var missingLength = info.missing.length;
  var s = missingLength === 1 ? ' ' : 's ';
  var waswere = missingLength === 1 ? 'is ' : 'are ';
  var missing = '';
  info.missing.forEach(function(str){
    missing += '"' + str + '",';
  });
  missing = '[' + missing.substring(0, missing.length-1) + '] ';
  var message = 'Attribute' + s + missing + waswere + 'missing in ' + type + ' element' + id + '.';
  return [message, SEVERITY_ERROR];
};
