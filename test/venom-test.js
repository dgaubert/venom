var venom = require('../lib/venom');

describe('Venom', function () {

  beforeEach(function () {
    venom.clear();
  });

  it('.add() dependency should be added', function () {
    venom.add('engines', 1);

    venom.dependencies.should.have.property('engines');
  });

  it('.add() register twice a dependency should throw error', function () {
    venom.add('engines', 1);
    venom.add.bind(venom, 'engines', 2).should.throw();
  });

  it('.add() object to perform should be a Function', function () {
    var Car = {};

    venom.add('engines', 1);

    var car = venom.perform.bind(venom, Car).should.throw();

  });

  it('.drop() dependency should be removed', function () {
    venom.add('engines', 1);
    venom.drop('engines');
    venom.dependencies.should.not.have.property('engines');
  });

  it('.drop() remove unadded dependency should throw error', function () {
    venom.add('engines', 1);
    venom.drop.bind(venom,'_engines').should.throw();
  });

  it('.drop() dependencies should be removed', function () {
    venom.add('engines', 1);
    venom.add('wheels', 4);
    
    venom.clear();

    venom.dependencies.should.not.have.property('engines');
    venom.dependencies.should.not.have.property('wheels');
  });

  it('.create() should return a new object with its dependence ', function () {

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

  it('.create() should return a object that have another object inherited', function () {
    function Engine() {
      this.pistons = 8;
      this.getPistons = function () {
        return this.pistons;
      };
    }

    function Car(type) {
      this.type = type;
      this.getType = function () {
        return this.type;
      };
    }
    Car.prototype = new Engine();

    venom.add('type', 'gasoil');

    var car = venom.create(Car);

    venom.dependencies.should.have.property('type');

    car.getPistons().should.equal(8);
    car.getType().should.equal('gasoil');
  });

  it('.perform() on clousure, dependency should be performed', function () {

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

  it('.perform() two dependencies should be performed', function () {
    venom.add('one', 1);
    venom.add('two', 2);

    function sum(one, two) {
      return one + two;
    }

    var res = venom.perform(sum);

    res.should.equal(3);
  });

  it('.perform() dependencies not found should throw error', function () {
    venom.add('one', 1);

    var sum = function(one, two) {
      return one + two;
    };

    venom.perform.bind(venom, sum).should.throw();
  });

  it('.perform() arguments with comments (/* */) should be accepted', function () {
    venom.add('one', 1);

    var getOne = function(one /* comment */) {
      return one;
    };

    venom.perform(getOne).should.equal(1);
  });

  it('.perform() arguments in multiple lines should be accepted', function () {
    venom.add('one', 1);
    venom.add('two', 2);

    var sum = function(one,
                        two) {
      return one + two;
    };

    venom.perform(sum).should.equal(3);
  });

  it('.perform() arguments with inline comments (//) should be accepted', function () {
    venom.add('one', 1);

    var getOne = function(one // comment
                                ) {
      return one;
    };

    venom.perform(getOne).should.equal(1);
  });

  it('.tie() dependencies should be bound', function () {
    venom.add('one', 1);
    venom.add('two', 2);

    var sum = function(one, two) {
      return one + two;
    };

    var getThree = venom.tie(sum);

    getThree().should.equal(3);

  });

});
