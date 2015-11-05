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
      otherObject.vel = [otherObject.vel[0] - 0.7* this.vel[0], otherObject.vel[1] - 0.7 * this.vel[1]]
      this.remove();
      otherObject.collisionCounter = true;
      otherObject.justHit = true;
      otherObject.life -= 1;

     if (otherObject.life < 1) {
       otherObject.remove();
       otherObject.explode();
       this.game.score += 1;
       if (this.game.score > this.game.highScore) {
         this.game.highScore = this.game.score;
       }

       $( '#scoreBoard' ).html( 'Your Score : ' + this.game.score + ' - Your Life : ' + this.game.life + ' - High Score : ' + this.game.highScore);

     }
    }

    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.vel = [otherObject.vel[0] + 0.5*this.vel[0], otherObject.vel[1] + 0.5*this.vel[1]]
      this.remove();
      otherObject.remove();
      otherObject.explode();


     $( '#scoreBoard' ).html( 'Your Score : ' + this.game.score + ' Your Life : ' + this.game.life + ' High Score : ' + this.game.highScore);  }

  };

Bullet.prototype.inProximityOf = function (otherObject) {
  var proximityDist = Asteroids.Util.dist(this.pos, otherObject.pos);
  return proximityDist < 50;
}
  Bullet.prototype.draw = function (ctx) {

    var bullet = new Image();
    bullet.src = 'greenball2.png';

    ctx.drawImage(bullet, this.pos[0]-5,this.pos[1]-5, this.radius*3*Math.PI , this.radius*3*Math.PI );
  };

  Bullet.prototype.isWrappable = false;
})();
