(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function (params) {
    params.color = ['gray','darkgray','blue'][Math.round(Math.random()*2)];
    params.radius = Asteroid.RADIUS;

    params.pos = params.pos || params.game.randomPosition(this);
    params.vel = [0,1] || Asteroids.Util.randomVec(Asteroid.SPEED);

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
