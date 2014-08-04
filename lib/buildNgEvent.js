var SEVERITY_SUGGESTION = 3;

module.exports = function(info, id, type) {
  var ngDir = 'ng-' + info.error.substring(2),
    message = 'Use Angular version of "' + info.error + '" in ' + type + ' element' + id +
      '. Try: "' + ngDir + '"';
  return [message, SEVERITY_SUGGESTION];
};
