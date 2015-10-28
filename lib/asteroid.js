(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (params) {

  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
