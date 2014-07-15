Angular Hint Directives [![Build Status](https://travis-ci.org/angular/angular-hint-directives.svg?branch=master)](https://travis-ci.org/angular/angular-hint-directives) [![Code Climate](https://codeclimate.com/github/angular/angular-hint-directives.png)](https://codeclimate.com/github/angular/angular-hint-directives)
==================

Angular Hint Directives lets you spend less time finding silent errors in your code and more time on actually programming. This tool is a subset of many under the [Angular Hint](https://github.com/angular/angular-hint) repository that specializes in identifying errors relating to directives. For instructions on how to incorporate the whole Angular Hint repository into your project, please refer to the link above.

Angular Hint Directive identifies misspelled directives that would otherwise fail silently and notifies you of your mistake while also providing a suggestion for what you could mean. At first glance, the code below may seem to not have any errors, but the list elements would never get loaded on to the page. If the following code exsited within your loaded page, Hint Directive would alert you that you used 'ng-repaet' and that you should try 'ng-repeat'.
```html
<div>
  <ul>
    <li ng-repaet = "i in [1,2,3,4]">{{i}}</li>
  </ul>
</div>
```

Hint Directives is also capable of identifing problems with custom directives created within your app, so you'll never have to worry trying to find the needle in the haystack preventing your page from loading correctly. Additionally, Hint Directives will also notify you if you use directives reserved for elements or attributes incorrectly. In the code below, we create a directive called 'haBreadcrumbs' that is restricted to elements only that will have an attribute by the name of 'breadcrumbs'.
```javascript
angular.module('breadcrumbs').
directive('haBreadcrumbs', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/breadcrumbs/breadcrumbs.html',
    scope: {
      breadcrumbs: '=',
      id = '@'
    }
  };
});
```
So if in your code you tried to use:
```html
<breadcrumbs ha-breadcrumbs="['home','profile','about']"> </breadcrumbs>
```
You would promtly be notified that you have used 'ha-breadcrumbs' as an attribute when its reserved for elements only and vice verse for 'breadcrumbs'. If you were to fix that error by switching 'ha-breadcrumbs' and 'breadcrumbs', you would then be warned that you are missing the attribute 'id' in your directive since it was declared when the directive was created.

Sample of console after warnings:
![alt tag](https://raw.githubusercontent.com/angular/angular-hint-directives/master/demoApp/assets/img/Hint%20Directives%20Console.png)

## [License](LICENSE)

Copyright 2014 Google, Inc. http://angularjs.org

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
