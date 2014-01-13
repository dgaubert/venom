var venom = require('../lib/venom');

describe('index', function () {

  it('Dependency should be registered', function () {
    venon.injector.register('test', {test: 'test'});

    venon.dependencies.should.have.property('test');
  });

  it('Dependency should be injected', function () {
    venon.injector.register('Engine', {
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

    var car = venon.injector.process(Car);

    venon.dependencies.should.have.property('Engine');
    car.should.have.property('start');

  });

});
