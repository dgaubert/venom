var venom = require('../lib/venom');

describe('Venom', function () {

  it('Dependency should be registered', function () {
    venom.register('test', {test: 'test'});

    venom.dependencies.should.have.property('test');
  });

  it('Register twice a dependency should throw error', function () {
    venom.register('d1', 1);
    venom.register.bind(venom, 'd1', 2).should.throw();
  });

  it('Dependency should be removed', function () {
    venom.register('dependency1', 1);
    venom.remove('dependency1');
    venom.dependencies.should.not.have.property('dependency1');
  });

  it('Remove unregistered dependency should throw error', function () {
    venom.register('dependency2', 1);
    venom.remove.bind(venom,'_dependency2').should.throw();
  });

  it('On constructor, dependency should be injected', function () {
    var ElectricEngine = {
      start: function () {
        return 'Fisiuu!!';
      }
    };

    function Car (ElectricEngine) {
      this.engine = ElectricEngine;
    }

    Car.prototype.start = function () {
      this.engine.start();
    };

    venom.register('ElectricEngine', ElectricEngine);

    var car = venom.instance(Car);

    console.log(car instanceof Car);

    console.log(car.start());

    venom.dependencies.should.have.property('ElectricEngine');
    car.should.have.property('start');

  });

    it('On clousure, dependency should be injected', function () {
    var GasoilEngine = {
      start: function () {
        return 'Burruuuuum!';
      }
    };

    function Car (GasoilEngine) {
      return {
        'start': function () {
          GasoilEngine.start();
        }
      };
    }

    venom.register('GasoilEngine', GasoilEngine);
    var car = venom.inject(Car);

    venom.dependencies.should.have.property('GasoilEngine');
    car.should.have.property('start');

  });

  it('Object to inject a denpendency should be a Function', function () {
    var Computer = 1;
    var CPU = 0;

    venom.register('CPU', CPU);
    var pc = venom.inject.bind(venom, Computer).should.throw();

  });

});
