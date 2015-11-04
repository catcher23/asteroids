(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ebullet = Asteroids.Ebullet = function (options) {
    options.radius = Ebullet.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Ebullet.RADIUS = 2;
  Ebullet.SPEED = 15;

  Asteroids.Util.inherits(Ebullet, Asteroids.MovingObject);

  Ebullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.vel = [otherObject.vel[0] + 0.001*this.vel[0], otherObject.vel[1] + 0.001*this.vel[1]]
      this.remove();
      otherObject.collisionCounter = true;
      otherObject.justHit = true;
      this.game.life -= 1;


       $( '#scoreBoard' ).html( 'Your Score : ' + this.game.score + ' Your Life : ' + this.game.life);
       if (this.game.life < 1) {
         otherObject.explode();
         otherObject.remove();
         this.game.gameOver();
       }
    }

    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.vel = [otherObject.vel[0] + 0.5*this.vel[0], otherObject.vel[1] + 0.5*this.vel[1]]
      this.remove();
      otherObject.remove();
      otherObject.explode();


   $( '#scoreBoard' ).html( 'Your Score : ' + this.game.score + ' Your Life : ' + this.game.life);
    }
  };



  Ebullet.prototype.draw = function (ctx) {

    var ebullet = new Image();
    ebullet.src = 'redball2.png';

    ctx.drawImage(ebullet, this.pos[0]-5,this.pos[1]-5, this.radius*2.5*Math.PI , this.radius*2.5*Math.PI );
  };

  Ebullet.prototype.isWrappable = false;
})();
