module.exports = function(dirName, dirFacStr) {
  if(!ddLib.hasNameSpace(dirName)) {
    ddLib.buildNameSpace(dirName);
  }
  if(ddLib.hasReplaceOption(dirFacStr)) {
    ddLib.buildReplaceOption(dirName);
  }
};
