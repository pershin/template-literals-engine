/*!
 * template-literals-engine
 * Copyright (c) 2019 Sergey Pershin
 * MIT Licensed
 */

'use strict';

module.exports = View;

const fs = require('fs');

var globalVariables = {};
var templates = {};

function View() {
  var localVariables = {};

  this.assign = (name, value, globalScope) => {
    if (globalScope) {
      globalVariables[name] = value;
    } else {
      localVariables[name] = value;
    }
    return this;
  };

  this.getTemplateVars = (name) => {
    var variables = Object.assign(globalVariables, localVariables);

    if (name) {
      return variables[name];
    }

    return variables;
  };

  this.render = function (filename) {
    var _this, variables, functionBody, include;

    _this = this;
    variables = this.getTemplateVars();
    functionBody = '';
    include = function (filename) {
      return _this.render(filename);
    };

    if ('undefined' === typeof templates[filename]) {
      templates[filename] = fs.readFileSync(filename);
    }

    for (var variable in variables) {
      functionBody += `var ${variable} = variables['${variable}'];`;
    }

    functionBody += 'return `' + templates[filename] + '`;';

    return (new Function('variables', 'include', functionBody))(variables, include);
  };
}
