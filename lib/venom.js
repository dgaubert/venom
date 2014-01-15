var injector = require('./injector');
var container = require('./container');

var venom = {};

venom.inject = injector.inject;
venom.instance = injector.instance;
venom.getDependencies = injector.getDependencies;
venom.register = injector.register;
venom.remove = injector.remove;

venom.dependencies = container.dependencies;

module.exports = venom;
