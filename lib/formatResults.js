var hintLog = angular.hint = require('angular-hint-log'),
  MODULE_NAME = 'Directives';

var build = {
  deprecated: require('./buildDeprecated'),
  missingrequired: require('./buildMissingRequired'),
  mutuallyexclusive: require('./buildMutuallyExclusive'),
  ngevent: require('./buildNgEvent'),
  ngrepeatformat: require('./buildNgRepeatFormat'),
  nonexsisting: require('./buildNonExsisting'),
  wronguse: require('./buildWrongUse')
};

/**
 *@param failedElements: [] of {}s of all failed elements with their failed attributes and closest
 *matches or restrict properties
 *
 *@return [] of failed messages.
 **/
module.exports = function(failedElements) {
  failedElements.forEach(function(obj) {
    obj.data.forEach(function(info) {
      var id = (obj.domElement.id) ? ' with id: #' + obj.domElement.id : '',
        type = obj.domElement.nodeName,
        messageAndSeverity = build[info.typeError](info, id, type);
      hintLog.logMessage(MODULE_NAME, messageAndSeverity[0], messageAndSeverity[1]);
    });
  });
};
