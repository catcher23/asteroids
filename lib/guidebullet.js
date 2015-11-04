(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Guidebullet = Asteroids.Guidebullet = function (options) {
    options.radius = Guidebullet.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Guidebullet.RADIUS = 70;
  Guidebullet.SPEED = 15;

  Asteroids.Util.inherits(Guidebullet, Asteroids.MovingObject);

  Guidebullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Enemy) {
      p1 = otherObject.pos;
      p2 = this.game.ships[0].pos;
      this.game.ships[0].angle = Math.atan2(p1[1] - p2[1], p1[0] - p2[0]);
    }



  };




  Guidebullet.prototype.isWrappable = false;
})();
