(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (params) {
    params.color = Asteroid.COLOR;
    params.pos = params.pos || params.game.randomPosition();
    params.radius = Asteroid.RADIUS;
    params.vel = params.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, params);
  };

  Asteroid.COLOR = 'lightgreen';
  Asteroid.RADIUS = 5;
  Asteroid.SPEED = 5;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };



})();
