# Angular Hint Directives [![Build Status](https://travis-ci.org/angular/angular-hint-directives.svg?branch=master)](https://travis-ci.org/angular/angular-hint-directives) [![Code Climate](https://codeclimate.com/github/angular/angular-hint-directives.png)](https://codeclimate.com/github/angular/angular-hint-directives)

This hinting module is part of the overall tool [AngularHint](https://github.com/angular/angular-hint)
that aims to help you spend less time finding silent errors in your code and more time programming. Loading this module will provide warnings specific to AngularJS directives.

See the [AngularHintEvents NPM Module](https://www.npmjs.org/package/angular-hint-directives).

## Usage

Install the [AngularHint NPM module](https://www.npmjs.org/package/angular-hint)
and use `ng-hint` or `ng-hint-include='directives'` to
enable AngularHintDirectives. Further installation information is available on the
[main AngularHint repository](https://github.com/angular/angular-hint#usage).


## Features:
  - [Misspelled HTML attributes and tags](#misspelled-directives-and-attributes)
  - [Misspelled directives and attributes (custom and core)](#misspelled-directives-and-attributes)
  - [Missing required attributes declared within the scope property](#missing-required-attributes)
  - [Using directives against their restrict property](#following-restrict-property)
  - [Using deprecated options such as 'replace'](#using-deprecated-options)
  - [Using HTML event attributes instead of Angular event directives (onclick vs. ngClick)](#using-angular-event-directives)
  - [Declaring directives with no namespace](#missing-namespace)


#### Misspelled Directives and Attributes
AngularHintDirectives identifies directives that are undefined, most likely because of spelling errors.
It provides suggestions of similarly spelled directives that are defined. For example, the code below has a simple spelling error that would prevent the list elements from being loaded. AngularHintDirectives warns that it found the nonexistent *'ng-repaet'* directive and suggests that *'ng-repeat'* might be the intended command.

```html
<div>
  <ul>
    <li ng-repaet="i in [1,2,3,4]">{{i}}</li>
  </ul>
</div>
```
#### Missing Required Attributes
AngularHintDirectives identifies whether you include all variables declared through two way binding. In the example below, we have declared the attributes 'breadcrumbs' and 'id' to exsist within the 'haBreadcrumbs' directive.

```javascript
angular.module('breadcrumbs').
directive('haBreadcrumbs', function() {
  return {
    restrict: 'E',g
    templateUrl: 'components/breadcrumbs/breadcrumbs.html',
    scope: {
      breadcrumbs: '=',
      id = '@'
    }
  };
});
```
If you used your directive like in the HTML example below, you would be notified that you are missing the *'id'* attribute from your 'haBreadcrumbs' directive.

```html
<breadcrumbs ha-breadcrumbs="['home','profile','about']"> </breadcrumbs>
```

#### Following Restrict Property
AngularHintDirectives will also notify you if you use directives reserved for elements or attributes incorrectly. In the code below, we create a directive called 'haBreadcrumbs' that is restricted to elements only. It will have an attribute by the name of 'breadcrumbs'.

```javascript
angular.module('breadcrumbs').
directive('haBreadcrumbs', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/breadcrumbs/breadcrumbs.html',
    scope: {
      breadcrumbs: '='
    }
  };
});
```

So if in your code you tried to use the example below You would promtly be notified that you have used 'ha-breadcrumbs' as an *attribute* when its reserved for *elements only* and vice verse for 'breadcrumbs'.
```html
<breadcrumbs ha-breadcrumbs="['home','profile','about']"> </breadcrumbs>
```

#### Using Deprecated Options
AngularHintDirectives will notify you if you are using deprecated options when instantiating your directive. In the example below you will be warned about using the 'replace' option in your directive.

```javascript
angular.module('breadcrumbs').
directive('haBreadcrumbs', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/breadcrumbs/breadcrumbs.html',
    scope: {breadcrumbs: '='},
    replace: true
  };
});
```
#### Using Angular Event Directives
AngularHintDirectives will notify you if you are using HTML event attributes such as onclick, onfocus, etc. and prompt you to use their Angular counterparts. Below you would be told to change *'onchange'* to *'ng-change'*.
```html
<div id='search' onchange='update()'></div>
```

#### Missing Namespace
It is important for the components we create to have their own unique namespace so as to not conflict with exsisting components in Angular or external libraries that may be used. The best practice for namespaces it to use lowerCamelCase and a unique prefix
for the scope of an application. For example, in the code below, if a directive with name 'mycomponent' was created, you would be warned to use a more appropriate name.

```javascript
angular.module('breadcrumbs').
  directive('mycomponent', function() { ... };
});
```
Improved namespace:

```javascript
angular.module('breadcrumbs').
  directive('abMyComponent', function() { ... };
});
```

A prefix like `ab` that is defined uniquely for the scope of an application (think of the `ng` prefix
used for AngularJS directives) ensures that custom directives defined with that prefix are less
likely to conflict with the names given to AngularJS directives or directives loaded from third
parties.

##Contributing

Want to improve AngularHintEvents or other facets of AngularHint? We'd love to get your help! See the [Contributing Guidelines](https://github.com/angular/angular-hint/blob/master/CONTRIBUTING.md).

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
