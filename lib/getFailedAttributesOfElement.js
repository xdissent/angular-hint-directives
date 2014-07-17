module.exports = function(options, element) {
  if(element.attributes.length) {
    var eleName = element.nodeName.toLowerCase();
    var eleAttrs = Array.prototype.slice.call(element.attributes);
    eleAttrs.push({
      nodeName: '*'+eleName
    });
    var failedAttrs = ddLib.getFailedAttributes(eleAttrs, options);
    var missingRequired = ddLib.findMissingAttrs(eleName,eleAttrs);
    if(failedAttrs.length || missingRequired.length) {
      if(missingRequired.length) {
        failedAttrs.push({
            directiveType: 'angular-custom-directive',
            missing: missingRequired,
            typeError: 'missingrequired'
          });
      }
      return {
        domElement: element,
        data: failedAttrs
      };
    }
  }
};
