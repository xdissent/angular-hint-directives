module.exports = function(directiveName) {
  var message = 'The use of "replace" in directive factories is deprecated,'+
    ' and it was found in "'+directiveName+'".';
  var domElement = '<'+directiveName+'> </'+directiveName+'>';
  hintLog.logMessage(message);
  hintLog.createErrorMessage(message, hintLog.findLineNumber(2), domElement);
};
