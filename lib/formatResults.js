module.exports = function(failedElements) {
  var messages = [];
  failedElements.forEach(function(obj) {
    obj.data.forEach(function(info) {
      var id = (obj.domElement.id) ? ' with id: #'+obj.domElement.id : '';
      var type = obj.domElement.nodeName, message;
      switch (info.typeError) {
        case 'wronguse':
          message = ddLib.buildWrongUse(info, id, type);
          break;
        case 'nonexsisting':
          message = ddLib.buildNonExsisting(info, id, type);
          break;
        case 'missingrequired':
          message = ddLib.buildMissingRequired(info, id, type);
          break;
        case 'ngevent':
          message = ddLib.buildNgEvent(info, id, type);
          break;
        case 'mutuallyexclusive':
          message = ddLib.buildMutuallyExclusive(info, id, type);
          break;
      }
      hintLog.createErrorMessage(message, ddLib.errorNumber = ++ddLib.errorNumber, obj.domElement);
      messages.push(message);
      ddLib.testMessage(message);
    });
  });
  return messages;
};
