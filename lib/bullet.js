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
    if (otherObject instanceof Asteroids.Enemy) {
      otherObject.vel = [otherObject.vel[0] + 0.1*this.vel[0], otherObject.vel[1] + 0.1*this.vel[1]]
      this.remove();
      otherObject.collisionCounter = true;
      otherObject.justHit = true;
      otherObject.life -= 1;

     if (otherObject.life < 1) {
       otherObject.explode();
       otherObject.remove();
       $( '#scoreBoard' ).html( 'Your Score : ' + this.game.score + ' Your Life : ' + this.game.life);

         this.game.add(new Asteroids.Enemy({pos: this.game.randomPosition(), game: this.game }));
     }
    }

    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.vel = [otherObject.vel[0] + 0.5*this.vel[0], otherObject.vel[1] + 0.5*this.vel[1]]
      this.remove();
      otherObject.remove();
      otherObject.explode();

      this.game.score += 1;
   $( '#scoreBoard' ).html( 'Your Score : ' + this.game.score + ' Your Life : ' + this.game.life);
    }
  };



  Bullet.prototype.draw = function (ctx) {

    var bullet = new Image();
    bullet.src = 'bullet.png';

    ctx.drawImage(bullet, this.pos[0],this.pos[1], this.radius*2*Math.PI , this.radius*2*Math.PI );
  };

  Bullet.prototype.isWrappable = false;
})();
