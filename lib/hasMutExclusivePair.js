module.exports = function(attr, attributes) {
  var found = false, pair = ddLib.isMutExclusiveDir(attr);
  attributes.map(function(otherAttr){
    if(otherAttr.nodeName == pair) {
      found = true;
    }
  });
  return found;
};
