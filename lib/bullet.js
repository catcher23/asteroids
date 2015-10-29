(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (params) {
    params.radius = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, params);
  };

  Bullet.RADIUS = 7;
  Bullet.SPEED = 13;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Asteroids.Asteroid) {
    this.remove();
    otherObject.remove();
  }
};

Bullet.prototype.isWrappable = false;


})();
