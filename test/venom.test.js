var venom = require('../lib/venom');

describe('Venom', function () {

  it('Dependency should be registered', function () {
    venom.injector.register('test', {test: 'test'});

    venom.container.dependencies.should.have.property('test');
  });

  it('Dependency should be injected', function () {
    venom.injector.register('Engine', {
      start: function () {
        return 'Burruuuuum!';
      }
    });

    function Car (Engine) {

      function start () {
        Engine.start();
      }

      return {
        'start': start
      };
    }

    var car = venom.injector.process(Car);

    venom.container.dependencies.should.have.property('Engine');
    car.should.have.property('start');

  });

});
