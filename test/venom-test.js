var venom = require('../lib/venom');

describe('Venom', function () {

  it('Dependency should be added', function () {
    venom.add('test', {test: 'test'});

    venom.dependencies.should.have.property('test');
  });

  it('Register twice a dependency should throw error', function () {
    venom.add('d1', 1);
    venom.add.bind(venom, 'd1', 2).should.throw();
  });

  it('Dependency should be removed', function () {
    venom.add('dependency1', 1);
    venom.drop('dependency1');
    venom.dependencies.should.not.have.property('dependency1');
  });

  it('Remove unadded dependency should throw error', function () {
    venom.add('dependency2', 1);
    venom.drop.bind(venom,'_dependency2').should.throw();
  });

  it('On constructor, dependency should be performed', function () {

    // Dependency to perform
    var ElectricEngine = {
      start: function () {
        return 'Fisiuu!!';
      }
    };

    // Constructor
    function Car (ElectricEngine) {
      this.engine = ElectricEngine;
    }
    Car.prototype.start = function () {
      return this.engine.start();
    };

    venom.add('ElectricEngine', ElectricEngine);

    var car = venom.create(Car);

    venom.dependencies.should.have.property('ElectricEngine');

    car.should.have.property('start');
    car.start().should.equal('Fisiuu!!');

  });

  it('On clousure, dependency should be performed', function () {

    // Dependency to perform      
    var GasoilEngine = {
      start: function () {
        return 'Burruuum!!';
      }
    };

    // Clousure
    function Car(GasoilEngine) {
      return {
        'start': function () {
          return GasoilEngine.start();
        }
      };
    }

    venom.add('GasoilEngine', GasoilEngine);
    var car = venom.perform(Car);

    venom.dependencies.should.have.property('GasoilEngine');
    car.should.have.property('start');
    car.start().should.equal('Burruuum!!');

  });

  it('Object to perform should be a Function', function () {
    var Computer = 1;
    var CPU = 0;

    venom.add('CPU', CPU);
    var pc = venom.perform.bind(venom, Computer).should.throw();

  });

  it('Two dependencies should be performed', function () {
    venom.add('param1', 1);
    venom.add('param2', 2);

    function sum(param1, param2) {
      return param1 + param2;
    }

    var res = venom.perform(sum);

    res.should.equal(3);
  });

  it('Dependencies should be bound', function () {
    venom.add('param3', 3);
    venom.add('param4', 4);

    var sum = function(param3, param4) {
      return param3 + param4;
    };

    sum = venom.tie(sum);

    sum().should.equal(7);
  });

  it('Dependencies not found should throw error', function () {
    venom.add('param5', 5);

    var sum = function(param5, param6) {
      return param5 + param6;
    };

    venom.perform.bind(venom, sum).should.throw();
  });

  it('Arguments with comments (/* */) should be accepted', function () {
    venom.add('param6', 6);

    var getSix = function(param6 /* comment */) {
      return param6;
    };

    venom.perform(getSix).should.equal(6);
  });

  it('Arguments in multiple lines should be accepted', function () {
    venom.add('param7', 7);
    venom.add('param8', 8);

    var sum = function(param7,
                        param8) {
      return param7 + param8;
    };

    venom.perform(sum).should.equal(15);
  });

  it('Arguments with comments (//) should be accepted', function () {
    venom.add('param9', 9);

    var getSix = function(param9 // comment
                                ) {
      return param9;
    };

    venom.perform(getSix).should.equal(9);
  });

});
