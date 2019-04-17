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
  var _this = this;
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

  this.render = (filename) => {
    var functionBody, rendered, variable, variables;

    if ('undefined' === typeof templates[filename]) {
      try {
        templates[filename] = fs.readFileSync(filename);
      } catch (exception) {
        return exception.message;
      }
    }

    variables = this.getTemplateVars();
    functionBody = '';

    for (variable in variables) {
      functionBody += `var ${variable} = variables['${variable}'];`;
    }

    functionBody += 'return `' + templates[filename] + '`;';

    try {
      rendered = (new Function('variables', 'include', functionBody))(variables, include);
    } catch (exception) {
      return exception.message;
    }

    return rendered;
  };

  function include(filename, variables) {
    var variable;

    for (variable in variables) {
      _this.assign(variable, variables[variable]);
    }

    return _this.render(filename);
  }

}
