var container = require('./container');

var Injector = {

  inject: function (target) {
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;

    if (!(target instanceof Function)) {
      throw new TypeError('Target to process should be a Function');
    }
    
    var text = target.toString();
    var args = text.match(FN_ARGS)[1].split(',');
    
    return target.apply(target, this.getDependencies(args));
  },

  instance: function (target) {
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;

    if (!(target instanceof Function)) {
      throw new TypeError('Target to process should be a Function');
    }
    
    var text = target.toString();
    var args = text.match(FN_ARGS)[1].split(',');

    var F = target.bind(target);

    return new F(this.getDependencies(args));
  },
  
  getDependencies: function (arr) {
    return arr.map(function (value) {
      return container.dependencies[value];
    });
  },
  
  register: function (name, dependency) {
    if(container.dependencies[name]) {
      throw new Error('Dependency is already registered');
    }
    container.dependencies[name] = dependency;
  },

  remove: function (name) {
    if(!container.dependencies[name]) {
      throw new Error('Dependency is not registered');
    }
    delete container.dependencies[name];
  }

};

module.exports = Injector;
