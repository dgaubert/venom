var container = require('./container');

// private

function getDependencies(arr) {
  return arr.map(function (value) {
    var arg = container.dependencies[value];
    if (!arg) {
      throw new Error('Dependency ' + value + ' not found');
    }
    return arg;
  });
}

function getArgs(target) {
  if (!(target instanceof Function)) {
    throw new TypeError('Target to process should be a Function');
  }

  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var STRIP_TRIM = /[\s|\t|\n|\r]+/mg;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

  var argsText = target.toString().match(FN_ARGS)[1];

  var comments = argsText.match(STRIP_COMMENTS);
  if (comments) {
    comments.map(function (comment) {
      argsText = argsText.replace(comment,'');
    });
  }

  var trims = argsText.match(STRIP_TRIM);
  if (trims) {
    trims.map(function (trim){
      argsText = argsText.replace(trim,'');
    });
  }

  var args = argsText.split(',');
  return args;
}

// public

function perform(target) {
  return target.apply(target, getDependencies(getArgs(target)));
}

function create(target) {
  var args = [null].concat(getDependencies(getArgs(target)));
  return new (Function.prototype.bind.apply(target, args))();
}

function bind(target) {
  var args = [null].concat(getDependencies(getArgs(target)));
  return Function.prototype.bind.apply(target, args);
}

function add(name, dependency) {
  if(container.dependencies[name]) {
    throw new Error('Dependency is already registered');
  }
  container.dependencies[name] = dependency;
}

function drop(name) {
  if(!container.dependencies[name]) {
    throw new Error('Dependency is not registered');
  }
  delete container.dependencies[name];
}


// expose
module.exports = {
  'add': add, // add dependency
  'drop': drop, // drop dependency
  'perform': perform, // perform function
  'create': create, // return a new object
  'bind': bind
};

/*
var Target = (function() {
  function F(args) {
    return target.apply(this, args);
  }
  F.prototype = target.prototype;

  return function() {
    return new F(arguments[0]);
  };
})();
*/
//return new Target(getDependencies(getArgs(target)));
