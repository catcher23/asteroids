(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Explosion = Asteroids.Explosion = function (options) {
    options.radius = Explosion.RADIUS;
    options. frameIndex = 0;
    Asteroids.MovingObject.call(this, options);

  };

  Explosion.RADIUS = 2;
  Explosion.SPEED = -5;

  Asteroids.Util.inherits(Explosion, Asteroids.MovingObject);

  Explosion.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {

      otherObject.remove();
    }
  };

  Explosion.prototype.draw = function (ctx) {

    var expa = new Image();
    expa.src = 'expa.png';

    ctx.drawImage(expa, 0, 0, 150.58, 128, this.pos[0]-20,this.pos[1]-20, this.radius*20*Math.PI , this.radius*20*Math.PI );
  };

  Explosion.prototype.isWrappable = false;
})();
