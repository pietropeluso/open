'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('openWeatherMapApp'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('getMonth() method should return the right month providing a string', function() {
    expect(scope.getMonth('1')).toBe('Jan');
    expect(scope.getMonth('2')).toBe('Feb');
    expect(scope.getMonth('3')).toBe('Mar');
    expect(scope.getMonth('4')).toBe('Apr');
    expect(scope.getMonth('5')).toBe('May');
    expect(scope.getMonth('6')).toBe('Jun');
    expect(scope.getMonth('7')).toBe('Jul');
    expect(scope.getMonth('8')).toBe('Aug');
    expect(scope.getMonth('9')).toBe('Sept');
    expect(scope.getMonth('10')).toBe('Oct');
    expect(scope.getMonth('11')).toBe('Nov');
    expect(scope.getMonth('12')).toBe('Dec');
    expect(scope.getMonth('13')).toBe('');
    expect(scope.getMonth('131')).toBe('');
  });


  it('should be able to calculate the highest/lowest temperature of the day', function() {
    var day = [
      {
        'main' : {
          'temp_max' : 10,
          'temp_min' : 3,
          'pressure' : 2000
        }
      },
      {
        'main' : {
          'temp_max' : 20,
          'temp_min' : 1,
          'pressure' : 1000
        }
      },
      {
        'main' : {
          'temp_max' : 11,
          'temp_min' : -5,
          'pressure' : 3000
        }
      },
      {
        'main' : {
          'temp_max' : 40,
          'temp_min' : 20,
          'pressure' : 500
        }
      },
      {
        'main' : {
          'temp_max' : 35,
          'temp_min' : 17,
          'pressure' : 3500
        }
      }
    ];

    expect(scope.getDailyMaxTemperature(day, 'temp_max')).toBe(40);
    expect(scope.getDailyMinTemperature(day, 'temp_min')).toBe(-5);
  });

  it('should be able to get the average daily value for a pressure/humidity', function() {
    var day = [
      {
        'main' : {
          'temp_max' : 10,
          'temp_min' : 3,
          'pressure' : 2000,
          'humidity' : 10
        }
      },
      {
        'main' : {
          'temp_max' : 20,
          'temp_min' : 1,
          'pressure' : 1000,
          'humidity' : 12
        }
      },
      {
        'main' : {
          'temp_max' : 11,
          'temp_min' : -5,
          'pressure' : 3000,
          'humidity' : 8
        }
      },
      {
        'main' : {
          'temp_max' : 40,
          'temp_min' : 20,
          'pressure' : 500,
          'humidity' : 6
        }
      },
      {
        'main' : {
          'temp_max' : 35,
          'temp_min' : 17,
          'pressure' : 3500,
          'humidity' : 14
        }
      }
    ];

    expect(scope.getAverageDailyDataByCriteria(day, 'pressure')).toBe(2000);
    expect(scope.getAverageDailyDataByCriteria(day, 'humidity')).toBe(10);

  });
});

