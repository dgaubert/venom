var injector = require('./injector');
var container = require('./container');

var venom = {};

venom.add = injector.add;
venom.drop = injector.drop;
venom.perform = injector.perform;
venom.create = injector.create;
venom.bind = injector.bind;

venom.dependencies = container.dependencies;

module.exports = venom;
