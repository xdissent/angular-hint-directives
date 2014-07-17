(function (ddLib) {

'use strict';

var hintLog = require('angular-hint-log');
hintLog.moduleName = 'Directives';
hintLog.moduleDescription = '';
ddLib.errorNumber = 0;

ddLib.data = {
  directiveTypes : {
    'html-directives': {
      message: 'There was an HTML error in ',
      directives: {
      'abbr' : 'A',
      'accept': 'A',
      'accesskey': 'A',
      'action': 'A',
      'align': 'A',
      'alt': 'A',
      'background': 'A',
      'bgcolor': 'A',
      'border': 'A',
      'cellpadding': 'A',
      'char': 'A',
      'charoff': 'A',
      'charset': 'A',
      'checked': 'A',
      'cite': 'A',
      'class': 'A',
      'classid': 'A',
      'code': 'A',
      'codebase': 'A',
      'color': 'A',
      'cols': 'A',
      'colspan': 'A',
      'content': 'A',
      'data': 'A',
      'defer': 'A',
      'dir': 'A',
      'face': 'A',
      'for': 'A',
      'frame': 'A',
      'frameborder': 'A',
      'headers': 'A',
      'height': 'A',
      'http-equiv': 'A',
      'href': 'A',
      'id': 'A',
      'label': 'A',
      'lang': 'A',
      'language': 'A',
      'link': 'A',
      'marginheight': 'A',
      'marginwidth': 'A',
      'maxlength': 'A',
      'media': 'A',
      'multiple': 'A',
      'name': 'A',
      'object': '!A',
      'onblur': '!A',
      'onchange': '!A',
      'onclick': '!A',
      'onfocus': '!A',
      'onkeydown': '!A',
      'onkeypress': '!A',
      'onkeyup': '!A',
      'onload': '!A',
      'onmousedown': '!A',
      'onmousemove': '!A',
      'onmouseout': '!A',
      'onmouseover': '!A',
      'onmouseup': '!A',
      'onreset': '!A',
      'onselect': '!A',
      'onsubmit': '!A',
      'readonly': 'A',
      'rel': 'A',
      'rev': 'A',
      'role': 'A',
      'rows': 'A',
      'rowspan': 'A',
      'size': 'A',
      'span': 'EA',
      'src': 'A',
      'start': 'A',
      'style': 'A',
      'text': 'A',
      'target': 'A',
      'title': 'A',
      'type': 'A',
      'value': 'A',
      'width': 'A'}
    },
    'angular-default-directives': {
      message: 'There was an AngularJS error in ',
      directives: {
        'count': 'A',
        'min': 'A',
        'max': 'A',
        'ng-app': 'A',
        'ng-bind': 'A',
        'ng-bindhtml': 'A',
        'ng-bindtemplate': 'A',
        'ng-blur': 'A',
        'ng-change': 'A',
        'ng-checked': 'A',
        'ng-class': 'A',
        'ng-classeven': 'A',
        'ng-classodd': 'A',
        'ng-click': 'A',
        'ng-cloak': 'A',
        'ng-controller': 'A',
        'ng-copy': 'A',
        'ng-csp': 'A',
        'ng-cut': 'A',
        'ng-dblclick': 'A',
        'ng-disabled': 'A',
        'ng-dirty': 'A',
        'ng-focus': 'A',
        'ng-form': 'A',
        'ng-hide': 'A',
        'ng-hint': 'A',
        'ng-hint-exclude': 'A',
        'ng-hint-include': 'A',
        'ng-href': 'A',
        'ng-if': 'A',
        'ng-include': 'A',
        'ng-init': 'A',
        'ng-invalid': 'A',
        'ng-keydown': 'A',
        'ng-keypress': 'A',
        'ng-keyup': 'A',
        'ng-list': 'A',
        'ng-maxlength': 'A',
        'ng-minlength': 'A',
        'ng-model': 'A',
        'ng-model-options': 'A',
        'ng-mousedown': 'A',
        'ng-mouseenter': 'A',
        'ng-mouseleave': 'A',
        'ng-mousemove': 'A',
        'ng-mouseover': 'A',
        'ng-mouseup': 'A',
        'ng-nonbindable': 'A',
        'ng-open': 'A',
        'ng-options': 'A',
        'ng-paste': 'A',
        'ng-pattern': 'A',
        'ng-pluralize': 'A',
        'ng-pristine': 'A',
        'ng-readonly': 'A',
        'ng-repeat': 'A',
        'ng-required': 'A',
        'ng-selected': 'A',
        'ng-show': 'A',
        'ng-src': 'A',
        'ng-srcset': 'A',
        'ng-style': 'A',
        'ng-submit': 'A',
        'ng-switch': 'A',
        'ng-transclude': 'A',
        'ng-true-value': 'A',
        'ng-trim': 'A',
        'ng-false-value': 'A',
        'ng-value': 'A',
        'ng-valid': 'A',
        'ng-view': 'A',
        'required': 'A',
        'when': 'A'
      }
      },
    'angular-custom-directives': {
      message: 'There was an AngularJS error in ',
      directives: {

      }
    }
  }
};

/**
 *
 *@param scopeElements: [] of HTML elements to be checked for incorrect attributes
 *@param customDirectives: [] of custom directive objects from $compile decorator
 *@param options: {} of options for app to run with:
 *    options.tolerance: Integer, maximum Levenshtein Distance to be allowed for misspellings
 *    options.directiveTypes: [] of which type of directives/attributes to search through
 **/
ddLib.beginSearch = function(scopeElements, customDirectives, options) {
  if(!Array.isArray(scopeElements)) {
    throw new Error('Function beginSearch must be passed an array.');
  }
  options = options || {};
  options.directiveTypes = options.directiveTypes ||
    ['html-directives','angular-default-directives','angular-custom-directives'];
  options.tolerance = options.tolerance || 4;
  if (customDirectives && customDirectives.length) {
    ddLib.setCustomDirectives(customDirectives);
  }
  var failedElements = ddLib.findFailedElements(scopeElements, options);
  var messages = ddLib.formatResults(failedElements);
  return messages;
};

ddLib.findFailedElements = function(scopeElements, options) {
  return scopeElements.map(ddLib.getFailedAttributesOfElement.bind(null,options))
    .filter(function(x) {return x;});
};

/**
 *@description
 *Adds element tag name (DIV, P, SPAN) to list of attributes with '*' prepended
 *for identification later.
 *
 *@param options: {} options object from beginSearch
 *@param element: HTML element to check attributes of
 *
 *@return {} of html element and [] of failed attributes
 **/
ddLib.getFailedAttributesOfElement = function(options, element) {
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


/**
 *@param attributes: [] of attributes from element (includes tag name of element, e.g. DIV, P, etc.)
 *@param options: {} options object from beginSearch
 *
 *@return [] of failedAttributes with their respective suggestions and directiveTypes
 **/
ddLib.getFailedAttributes = function(attributes, options) {
  var failedAttrs = [], mutExPairFound = false;
  for(var i = 0; i < attributes.length; i++) {
    var attr = ddLib.normalizeAttribute(attributes[i].nodeName);
    var dirVal = ddLib.data.directiveTypes['html-directives'].directives[attr] || '';
    if(dirVal.has('!')) {
      failedAttrs.push({
        error: attr,
        directiveType: 'html-directives',
        typeError: 'ngevent'
      });
      continue;
    }
    if(!mutExPairFound && ddLib.isMutExclDir(attr) && ddLib.hasMutExclPair(attr,attributes)) {
      failedAttrs.push({
        error: attr,
        directiveType: 'angular-default-directives',
        typeError: 'mutuallyexclusive'
      });
      mutExPairFound = true;
      continue;
    }
    var result = ddLib.attributeExsistsInTypes(attr,options);
    var suggestion = result.typeError === 'nonexsisting' ?
      ddLib.getSuggestions(attr,options) : {match:''};
    if(result.typeError) {
      failedAttrs.push({
        match: suggestion.match || '',
        wrongUse: result.wrongUse || '',
        error: attr,
        directiveType: suggestion.directiveType || 'angular-custom-directives',
        typeError: result.typeError
      });
    }
  }
  return failedAttrs;
};

/**
 *@param attribute: attribute name as string e.g. 'ng-click', 'width', 'src', etc.
 *@param options: {} options object from beginSearch.
 *
 *@description attribute exsistance in the types of directives/attibutes (html, angular core, and
 * angular custom) and checks the restrict property of values matches its use.
 *
 *@return {} with attribute exsistance and wrong use e.g. restrict property set to elements only.
 **/
ddLib.attributeExsistsInTypes = function(attribute, options) {
  var anyTrue = false, wrongUse = '', directive, restrictProp;
  options.directiveTypes.forEach(function(dirType) {
    var isTag = attribute.charAt(0) === '*';
    var isCustomDir = dirType === 'angular-custom-directives';
    if(!isTag) {
      directive = ddLib.data.directiveTypes[dirType].directives[attribute] || '';
      restrictProp = directive.restrict || directive;
      if(restrictProp) {
        if(restrictProp.has('E') && !restrictProp.has('A')) {
          wrongUse = 'element';
        }
        if(restrictProp.has('C') && !restrictProp.has('A')) {
          wrongUse = (wrongUse) ? 'element and class' : 'class';
        }
        anyTrue = anyTrue || true;
      }
    }
    else if(isTag && isCustomDir){
      directive = ddLib.data.directiveTypes[dirType].directives[attribute.substring(1)] || '';
      restrictProp = directive.restrict || directive;
      anyTrue = anyTrue || true;
      if(restrictProp && restrictProp.has('A') && !restrictProp.has('E')) {
        wrongUse = 'attribute';
      }
    }
  });
  var typeError = wrongUse? 'wronguse':'' || !anyTrue ? 'nonexsisting' : '' || '';
  return {exsists: anyTrue, wrongUse: wrongUse, typeError: typeError};
};

/**
 *@param attribute: attribute name as string e.g. 'ng-click', 'width', 'src', etc.
 *@param options: {} options object from beginSearch.
 *
 *@return {} with closest match to attribute and the directive type it corresponds to.
 **/
ddLib.getSuggestions = function(attribute, options) {
  var min_levDist = Infinity, match = '', dirType = '';
  options.directiveTypes.forEach(function(directiveType) {
    var isTag = attribute.charAt(0) === '*';
    var isCustomDir = directiveType === 'angular-custom-directives';
    if(!isTag || (isTag && isCustomDir)) {
      var directiveTypeData = ddLib.data.directiveTypes[directiveType].directives;
      var tempMatch = ddLib.findClosestMatchIn(directiveTypeData, attribute);
      if(tempMatch.min_levDist < options.tolerance && tempMatch.min_levDist < min_levDist) {
        match = tempMatch.match;
        dirType = directiveType;
        min_levDist = tempMatch.min_levDist;
      }
    }
  });
  return {match:match, directiveType:dirType};
};

/**
 *@param directiveTypeData: {} with list of directives/attributes and
 *their respective restrict properties.
 *@param attribute: attribute name as string e.g. 'ng-click', 'width', 'src', etc.
 *
 *@return {} with Levenshtein Distance and name of the closest match to given attribute.
 **/
ddLib.findClosestMatchIn = function(directiveTypeData, attribute) {
  if(typeof attribute !== 'string') {
    throw new Error('Function must be passed a string as second parameter.');
  }
  if((directiveTypeData === null || directiveTypeData === undefined) ||
    typeof directiveTypeData !== 'object') {
    throw new Error('Function must be passed a defined object as first parameter.');
  }
  var min_levDist = Infinity, closestMatch = '';
  for(var directive in directiveTypeData){
    if(ddLib.areSimilarEnough(attribute,directive)) {
      var currentlevDist = ddLib.levenshteinDistance(attribute, directive);
      closestMatch = (currentlevDist < min_levDist)? directive : closestMatch;
      min_levDist = (currentlevDist < min_levDist)? currentlevDist : min_levDist;
    }
  }
  return {min_levDist: min_levDist, match: closestMatch};
};

/**
 *@param attribute: attribute name before normalization as string
 * e.g. 'data-ng-click', 'width', 'x:ng:src', etc.
 *
 *@return normalized attribute name
 **/
ddLib.normalizeAttribute = function(attribute) {
  return attribute.replace(/^(?:data|x)[-_:]/,'').replace(/[:_]/g,'-');
};

ddLib.findMissingAttrs = function(dirName, attributes) {
  attributes = attributes.map(function(x){return x.nodeName;});
  var directive = ddLib.data.directiveTypes['angular-custom-directives'].directives[dirName];
  var missing = [];
  if(directive && directive.require) {
    for(var i = 0; i < directive.require.length; i++) {
      if(attributes.indexOf(directive.require[i].directiveName) < 0) {
        missing.push(directive.require[i].directiveName);
      }
    }
  }
  return missing;
};

ddLib.getKeysAndValues = function(str) {
  var customDirectives = [], pairs = [];
  var matchScope = str.replace(/\n/g,'').match(/scope:\s*?{\s*.*['"]\s*}/);
  matchScope[0].match(/\w+\s*: ?['"][a-zA-Z=@]+['"]/g).map(function(str){
    var temp = str.match(/(\w+): ?['"](.+)['"]/);
    pairs.push({key:temp[1],value:temp[2]});
  });
  pairs.forEach(function(pair){
    var name = (pair.value === '=') || (pair.value === '@')? pair.key : pair.value.substring(1);
    customDirectives.push({directiveName: name , restrict:'A'});
  });
  return customDirectives;
};

/**
 *@param failedElements: [] of {}s of all failed elements with their failed attributes and closest
 *matches or restrict properties
 *
 *@return [] of failed messages.
 **/
ddLib.formatResults = function(failedElements) {
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

ddLib.buildNonExsisting = function(info, id, type) {
  var message = ddLib.data.directiveTypes[info.directiveType].message+type+' element'+id+'. ';
  var error = (info.error.charAt(0) === '*') ? info.error.substring(1): info.error;
  message +='Found incorrect attribute "'+error+'" try "'+info.match+'".';
  return message;
};

ddLib.buildWrongUse = function(info, id, type) {
  var message = ddLib.data.directiveTypes[info.directiveType].message+type+' element'+id+'. ';
  var error = (info.error.charAt(0) === '*') ? info.error.substring(1): info.error;
  var aecmType = (info.wrongUse.has('attribute'))? 'Element' : 'Attribute';
  message += aecmType+' name "'+error+'" is reserved for '+info.wrongUse+' names only.';
  return message;
};

ddLib.buildMissingRequired = function(info, id, type) {
  var s = info.missing.length === 1 ? ' ' : 's ';
  var waswere = info.missing.length === 1 ? 'was ' : 'were ';
  var missing = '';
  info.missing.forEach(function(str){
    missing += '"'+str+'",';
  });
  missing = '['+missing.substring(0,missing.length-1)+'] ';
  var message = 'Attribute'+s+missing+waswere+'found to be missing in '+type+ ' element'+id+'.';
  return message;
};

ddLib.buildNgEvent = function(info, id, type) {
  var ngDir = 'ng-'+info.error.substring(2);
  var message = 'Use Angular version of "'+info.error+'" in '+type+' element'+id+'. Try: "'+ngDir+'"';
  return message;
};

ddLib.buildMutuallyExclusive = function(info, id, type) {
  var pair = ddLib.isMutExclDir(info.error);
  var message = 'Angular attributes "'+info.error+'" and "'+pair+'" in '+type+ ' element'+id+
    ' should not be attributes together on the same HTML element';
  return message;
};

ddLib.buildNameSpace = function(directiveName) {
  var message = 'Directive "'+directiveName+'"" should have proper namespace try adding a prefix'+
    ' and/or using camelcase.';
  var domElement = '<'+directiveName+'> </'+directiveName+'>';
  hintLog.createErrorMessage(message, hintLog.findLineNumber(2), domElement);
};

ddLib.buildReplaceOption = function(directiveName) {
  var message = 'The use of "replace" in directive factories is deprecated,'+
    ' and it was found in "'+directiveName+'".';
  var domElement = '<'+directiveName+'> </'+directiveName+'>';
  hintLog.createErrorMessage(message, hintLog.findLineNumber(2), domElement);
};


/**
 *@param customDirectives: [] of custom directive objects from $compile decorator
 **/
ddLib.setCustomDirectives = function(customDirectives) {
  customDirectives.forEach(function(directive) {
    var directiveName = directive.directiveName.replace(/([A-Z])/g, '-$1').toLowerCase();
    ddLib.data.directiveTypes['angular-custom-directives']
      .directives[directiveName] = directive;
  });
};

/**
 *@param s: first string to compare
 *@param t: second string to compare
 *
 *@description:
 *Checks to see if two strings are similiar enough to even bother checking the Levenshtein Distance.
 */
ddLib.areSimilarEnough = function(s,t) {
  var strMap = {}, similarities = 0, STRICTNESS = 0.66;
  if(Math.abs(s.length-t.length) > 3) {
    return false;
  }
  s.split('').forEach(function(x){strMap[x] = x;});
  for (var i = t.length - 1; i >= 0; i--) {
    similarities = strMap[t.charAt(i)] ? similarities + 1 : similarities;
  }
  return similarities >= t.length * STRICTNESS;
};

/**
 *@param s: first string to compare for Levenshtein Distance.
 *@param t: second string to compare for Levenshtein Distance.
 *
 *@description
 *Calculates the minimum number of changes (insertion, deletion, transposition) to get from s to t.
 **/
ddLib.levenshteinDistance = function(s, t) {
    if(typeof s !== 'string' || typeof t !== 'string') {
      throw new Error('Function must be passed two strings, given: '+typeof s+' and '+typeof t+'.');
    }
    var d = [];
    var n = s.length;
    var m = t.length;

    if (n === 0) {return m;}
    if (m === 0) {return n;}

    for (var ii = n; ii >= 0; ii--) { d[ii] = []; }
    for (var ii = n; ii >= 0; ii--) { d[ii][0] = ii; }
    for (var jj = m; jj >= 0; jj--) { d[0][jj] = jj; }
    for (var i = 1; i <= n; i++) {
      var s_i = s.charAt(i - 1);

      for (var j = 1; j <= m; j++) {
        if (i == j && d[i][j] > 4) return n;
        var t_j = t.charAt(j - 1);
        var cost = (s_i == t_j) ? 0 : 1;
        var mi = d[i - 1][j] + 1;
        var b = d[i][j - 1] + 1;
        var c = d[i - 1][j - 1] + cost;
        if (b < mi) mi = b;
        if (c < mi) mi = c;
        d[i][j] = mi;
        if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
        }
      }
    }
    return d[n][m];
};

ddLib.checkPrelimErrors = function(dirName, dirFacStr) {
  if(!ddLib.hasNameSpace(dirName)) {
    ddLib.buildNameSpace(dirName);
  }
  if(ddLib.hasReplaceOption(dirFacStr)) {
    ddLib.buildReplaceOption(dirName);
  }
};

/**
 * @param str: string to convert formatting from camelCase to lowercase with dash after ng.
 **/
ddLib.camelToDashes = function(str) {
 return str.replace(/([A-Z])/g, function($1){return '-'+$1.toLowerCase();});
};

ddLib.testMessage = function(str) {
  return str;
};

ddLib.hasNameSpace = function(str) {
  return str.toLowerCase() !== str;
};

ddLib.hasReplaceOption = function(facStr) {
  return facStr.match(/replace\s*:/);
};

ddLib.isMutExclDir = function (dirName) {
  var exclusiveDirHash = {
    'ng-show' : 'ng-hide',
    'ng-hide' : 'ng-show',
    'ng-switch-when' : 'ng-switch-default',
    'ng-switch-default' : 'ng-switch-when',
  };
  return exclusiveDirHash[dirName];
};

ddLib.hasMutExclPair = function(attr, attributes) {
  var found = false, pair = ddLib.isMutExclDir(attr);
  attributes.map(function(otherAttr){
    if(otherAttr.nodeName == pair) {
      found = true;
    }
  });
  return found;
};

String.prototype.has = function(str) {
  return this.indexOf(str) > -1;
};

}((typeof module !== 'undefined' && module && module.exports) ?
      (module.exports = window.ddLib = {}) : (window.ddLib = {}) ));
