(function (ddLib) {

'use strict';

var hintLog = require('angular-hint-log');
hintLog.moduleName = 'Directives';
hintLog.moduleDescription = '';
ddLib.errorNumber = 0;

ddLib.data = require('../lib/ddLib-data.js');

/**
 *
 *@param scopeElements: [] of HTML elements to be checked for incorrect attributes
 *@param customDirectives: [] of custom directive objects from $compile decorator
 *@param options: {} of options for app to run with:
 *    options.tolerance: Integer, maximum Levenshtein Distance to be allowed for misspellings
 *    options.directiveTypes: [] of which type of directives/attributes to search through
 **/
ddLib.beginSearch = require('../lib/beginSearch');


ddLib.findFailedElements = require('../lib/findFailedElements');

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
ddLib.getFailedAttributesOfElement = require('../lib/getFailedAttributesOfElement');


/**
 *@param attributes: [] of attributes from element (includes tag name of element, e.g. DIV, P, etc.)
 *@param options: {} options object from beginSearch
 *
 *@return [] of failedAttributes with their respective suggestions and directiveTypes
 **/
ddLib.getFailedAttributes = require('../lib/getFailedAttributes');

/**
 *@param attribute: attribute name as string e.g. 'ng-click', 'width', 'src', etc.
 *@param options: {} options object from beginSearch.
 *
 *@description attribute exsistance in the types of directives/attibutes (html, angular core, and
 * angular custom) and checks the restrict property of values matches its use.
 *
 *@return {} with attribute exsistance and wrong use e.g. restrict property set to elements only.
 **/
ddLib.attributeExsistsInTypes = require('../lib/attributeExsistsInTypes');

/**
 *@param attribute: attribute name as string e.g. 'ng-click', 'width', 'src', etc.
 *@param options: {} options object from beginSearch.
 *
 *@return {} with closest match to attribute and the directive type it corresponds to.
 **/
ddLib.getSuggestions = require('../lib/getSuggestions');

/**
 *@param directiveTypeData: {} with list of directives/attributes and
 *their respective restrict properties.
 *@param attribute: attribute name as string e.g. 'ng-click', 'width', 'src', etc.
 *
 *@return {} with Levenshtein Distance and name of the closest match to given attribute.
 **/
ddLib.findClosestMatchIn = require('../lib/findClosestMatchIn');

/**
 *@param attribute: attribute name before normalization as string
 * e.g. 'data-ng-click', 'width', 'x:ng:src', etc.
 *
 *@return normalized attribute name
 **/
ddLib.normalizeAttribute = require('../lib/normalizeAttribute');

ddLib.findMissingAttrs = require('../lib/findMissingAttrs');

ddLib.getKeysAndValues = require('../lib/getKeysAndValues');

/**
 *@param failedElements: [] of {}s of all failed elements with their failed attributes and closest
 *matches or restrict properties
 *
 *@return [] of failed messages.
 **/
ddLib.formatResults = require('../lib/formatResults');

ddLib.buildNonExsisting = require('../lib/buildNonExsisting');

ddLib.buildWrongUse = require('../lib/buildWrongUse');

ddLib.buildMissingRequired = require('../lib/buildMissingRequired');

ddLib.buildNgEvent = require('../lib/buildNgEvent');

ddLib.buildMutuallyExclusive = require('../lib/buildMutuallyExclusive');

ddLib.buildNameSpace = require('../lib/buildNameSpace');

ddLib.buildReplaceOption = require('../lib/buildReplaceOption');

/**
 *@param customDirectives: [] of custom directive objects from $compile decorator
 **/
ddLib.setCustomDirectives = require('../lib/setCustomDirectives');

/**
 *@param s: first string to compare
 *@param t: second string to compare
 *
 *@description:
 *Checks to see if two strings are similiar enough to even bother checking the Levenshtein Distance.
 */
ddLib.areSimilarEnough = require('../lib/areSimilarEnough');

/**
 *@param s: first string to compare for Levenshtein Distance.
 *@param t: second string to compare for Levenshtein Distance.
 *
 *@description
 *Calculates the minimum number of changes (insertion, deletion, transposition) to get from s to t.
 *
 *credit: http://stackoverflow.com/questions/11919065/sort-an-array-by-the-levenshtein-distance-with-best-performance-in-javascript
 *http://www.merriampark.com/ld.htm, http://www.mgilleland.com/ld/ldjavascript.htm, Damerau–Levenshtein distance (Wikipedia)
 **/
ddLib.levenshteinDistance = require('../lib/levenshtein');

ddLib.checkPrelimErrors = require('../lib/checkPrelimErrors');

/**
 * @param str: string to convert formatting from camelCase to lowercase with dash after ng.
 **/
ddLib.camelToDashes = require('../lib/camelToDashes');

ddLib.hasNameSpace = require('../lib/hasNameSpace');

ddLib.hasReplaceOption = require('../lib/hasReplaceOption');

ddLib.isMutExclusiveDir = require('../lib/isMutExclusiveDir');

ddLib.hasMutExclusivePair = require('../lib/hasMutExclusivePair');

ddLib.testMessage = function(str) {
  return str;
};

}((typeof module !== 'undefined' && module && module.exports) ?
      (module.exports = window.ddLib = {}) : (window.ddLib = {}) ));
