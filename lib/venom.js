var dependencies = {};

// private

/**
 * [getDependencies description]
 * 
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function getDependencies(arr) {
  return arr.map(function (value) {
    var arg = dependencies[value];
    if (!arg) {
      throw new Error('Dependency ' + value + ' not found');
    }
    return arg;
  });
}

/**
 * [getArgs description]
 * 
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
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

/**
 * [perform description]
 * 
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function perform(target) {
  return target.apply(target, getDependencies(getArgs(target)));
}

/**
 * [create description]
 * 
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function create(target) {
  var args = [null].concat(getDependencies(getArgs(target)));
  return new (Function.prototype.bind.apply(target, args))();
}

/**
 * [bind description]
 * 
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function tie(target) {
  var args = [null].concat(getDependencies(getArgs(target)));
  return Function.prototype.bind.apply(target, args);
}

/**
 * [add description]
 * 
 * @param {[type]} name       [description]
 * @param {[type]} dependency [description]
 */
function add(name, dependency) {
  if(dependencies[name]) {
    throw new Error('Dependency is already registered');
  }
  dependencies[name] = dependency;
}

/**
 * [drop description]
 * 
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function drop(name) {
  if(!dependencies[name]) {
    throw new Error('Dependency is not registered');
  }
  delete dependencies[name];
}


// expose
module.exports = {
  'dependencies': dependencies, // list dependencies
  'add': add, // add dependency
  'drop': drop, // drop dependency
  'perform': perform, // perform function
  'create': create, // return a new object
  'tie': tie
};
