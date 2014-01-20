
var venom = (function () {

  /**
   * Dependency container
   */
  var dependencies = {};

  // private

  /**
   * Retrieves dependencies from its names
   * 
   * @param  {Array} arr: names of the dependencies
   * @return {Array} dependencies to bind
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
   * Extracts argument's names from the function to process
   * 
   * @param  {Function} target: function to process
   * @return {Array} 
   */
  function getArgs(target) {
    if (!target instanceof Function) {
      throw new TypeError('Target to process should be a Function');
    }

    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var SPACES = /[\s|\t|\n|\r]+/mg;

    return target.toString()
      .match(FN_ARGS)[1]
      .replace(COMMENTS,'')
      .replace(SPACES,'')
      .split(',');
  }

  // public

  /**
   * Runs a function with its dependencies previously injected
   * 
   * @param  {Function} target: function to run
   * @return {?} anything that the target returns 
   */
  function perform(target) {
    return target.apply(target, getDependencies(getArgs(target)));
  }

  /**
   * Retrieves a new object with its dependencies previously injected
   * 
   * @param  {Function} constructor: function to call as constructor
   * @return {Object} object created from its constructor
   */
  function create(constructor) {
    var args = [null].concat(getDependencies(getArgs(constructor)));
    return new (Function.prototype.bind.apply(constructor, args))();
  }

  /**
   * Retrieves the function with its dependencies previously injected
   * 
   * @param  {Function} target: function to bind dependencies 
   * @return {Function} the same function with its dependencies injected
   */
  function enclose(target) {
    var args = [null].concat(getDependencies(getArgs(target)));
    return Function.prototype.bind.apply(target, args);
  }

  /**
   * Adds the dependency to container
   * 
   * @param {String} name: dependency's name to remove
   */
  function add(name, dependency) {
    if(dependencies[name]) {
      throw new Error('Dependency is already registered');
    }
    dependencies[name] = dependency;
  }

  /**
   * Removes the dependency from the container
   * 
   * @param  {String} name: dependency's name to remove
   */
  function drop(name) {
    if(!dependencies[name]) {
      throw new Error('Dependency is not registered');
    }
    delete dependencies[name];
  }

  /**
   * Clear the entire container
   * 
   */
  function clear() {
    for (var key in dependencies) {
      delete dependencies[key];
    }
  }

  /**
   * Retrieves the dependency container
   * 
   * @return {Object} dependency container
   */
  function getContainer() {
    return dependencies;
  }

  // expose
  return {
    'getContainer': getContainer,
    'add': add,
    'drop': drop,
    'clear': clear,
    'perform': perform,
    'create': create,
    'enclose': enclose
  };

})();

var isNode = typeof module == "object" && typeof require == "function";

if (isNode) {
  module.exports = venom;
}
