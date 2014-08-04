var SEVERITY_ERROR = 1;
module.exports = function(info, id, type) {
  var message = 'ngRepeat in '+type+' element'+id+' was used incorrectly. '+info.suggestion;
  return [message, SEVERITY_ERROR];
};
