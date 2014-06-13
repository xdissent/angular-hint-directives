var windowElements = document.getElementsByTagName("*");
var angularDefaultDirectives = {
  'ng-app': 'ng-app',
  'ng-bind': 'ng-bind',
  'ng-bindhtml': 'ng-bindhtml',
  'ng-bindtemplate': 'ng-bindtemplate',
  'ng-blur': 'ng-blur',
  'ng-change': 'ng-change',
  'ng-checked': 'ng-checked',
  'ng-class': 'ng-class',
  'ng-classeven': 'ng-classeven',
  'ng-classodd': 'ng-classodd',
  'ng-click': 'ng-click',
  'ng-cloak': 'ng-cloak',
  'ng-controller': 'ng-controller',
  'ng-copy': 'ng-copy',
  'ng-csp': 'ng-csp',
  'ng-cut': 'ng-cut',
  'ng-dblclick': 'ng-dblclick',
  'ng-disabled': 'ng-disabled',
  'ng-focus': 'ng-focus',
  'ng-form': 'ng-form',
  'ng-hide': 'ng-hide',
  'ng-href': 'ng-href',
  'ng-if': 'ng-if',
  'ng-include': 'ng-include',
  'ng-init': 'ng-init',
  'ng-keydown': 'ng-keydown',
  'ng-keypress': 'ng-keypress',
  'ng-keyup': 'ng-keyup',
  'ng-list': 'ng-list',
  'ng-model': 'ng-model',
  'ng-modeloptions': 'ng-modeloptions',
  'ng-mousedown': 'ng-mousedown',
  'ng-mouseenter': 'ng-mouseenter',
  'ng-mouseleave': 'ng-mouseleave',
  'ng-mousemove': 'ng-mousemove',
  'ng-mouseover': 'ng-mouseover',
  'ng-mouseup': 'ng-mouseup',
  'ng-nonbindable': 'ng-nonbindable',
  'ng-open': 'ng-open',
  'ng-paste': 'ng-paste',
  'ng-pluralize': 'ng-pluralize',
  'ng-readonly': 'ng-readonly',
  'ng-repeat': 'ng-repeat',
  'ng-selected': 'ng-selected',
  'ng-show': 'ng-show',
  'ng-src': 'ng-src',
  'ng-srcset': 'ng-srcset',
  'ng-style': 'ng-style',
  'ng-submit': 'ng-submit',
  'ng-switch': 'ng-switch',
  'ng-transclude': 'ng-transclude',
  'ng-value': 'ng-value'};
var failedElements = [];
var checkDefaultDirs = function() {
  for(elesIndex = 0; elesIndex < windowElements.length; elesIndex++) {
    var attrsOfEles = windowElements[elesIndex].attributes;
    var matchFound = attrsOfEleInDefaults(attrsOfEle);
    if(!matchFound) {
      failedElements.push(windowElements[elesIndex]);
    }
    }
  }
}
var attrsOfEleInDefaults = function(attrsOfEle){
  for(attrIndex = 0; attrIndex < attrsOfEle.length; attrIndex++) {
    var currentAttr = angularDefaultDirectives[attrsOfEle[attrIndex].nodeName];
    if(currentAttr) {
      return = true;
    }
  }
  return false;
}