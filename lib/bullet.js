(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.remove();
      otherObject.remove();

      otherObject.explode();
    }
  };

  Bullet.prototype.draw = function (ctx) {

    var bullet = new Image();
    bullet.src = 'bullet.png';

    ctx.drawImage(bullet, this.pos[0],this.pos[1], this.radius*2*Math.PI , this.radius*2*Math.PI );
  };

  Bullet.prototype.isWrappable = false;
})();
