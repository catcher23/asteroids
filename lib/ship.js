(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || 'lightgreen'
    this.collisionCounter = false;
    this.justHit = false;
    this.angle = 0;
    this.yawSpeed = 20;
    Asteroids.MovingObject.call(this, options)
  };

  Ship.RADIUS = 15;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);
    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );
    var that = this;
    var bulletVel = [

      Math.cos(that.angle)*Asteroids.Bullet.SPEED, Math.sin(that.angle)*Asteroids.Bullet.SPEED
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);



  };

  Ship.prototype.power = function (direction) {
    if (direction == 'forward') {
      this.vel[0] += Math.cos(this.angle);
      this.vel[1] += Math.sin(this.angle);
    } else {
      this.vel[0] -= Math.cos(this.angle);
      this.vel[1] -= Math.sin(this.angle);
    }
    this.vel[0] *= .91
    this.vel[1] *= .91

  };

  Ship.prototype.yaw = function (direction) {
    if (direction == 'left') {
      this.angle -= (Math.PI / 8);
    } else {
      this.angle += (Math.PI / 8);
    }
  };


  Ship.prototype.relocate = function () {
    this.pos = this.game.centerPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.draw = function (ctx) {

    var ship = new Image();
    if (this.justHit) {
      ship.src = 'blueship2.png';
      that = this;
      setTimeout(function(){
      that.justHit = false;
      }, 100);
      } else {
        ship.src = 'blueship.png';
      }

    ctx.translate(this.pos[0],this.pos[1]);    // translate to center of rotation
    ctx.rotate(this.angle);      // rotate, here +90deg to comp image dir.
    ctx.translate(-this.pos[0],-this.pos[1]);  // translate back
         // draw image

    ctx.drawImage(ship, this.pos[0]-23,this.pos[1]-23, this.radius*Math.PI , this.radius*Math.PI );
    ctx.setTransform(1,0,0,1,0,0);
  };


  Ship.prototype.explode = function () {


    var norm = Asteroids.Util.norm(this.vel);
    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Explosion.SPEED
    );

    var explosionVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];



    var explosion = new Asteroids.Explosion({
      pos: this.pos,
      vel: explosionVel,
      color: this.color,
      game: this.game
    });

    this.game.add(explosion);

  };

Ship.prototype.proximityTarget = function(otherObject) {
  p1 = otherObject.pos;
  p2 = this.pos;
  this.angle = Math.atan2(p1[1] - p2[1], p1[0] - p2[0]);
};

    Ship.prototype.collideWith = function (otherObject) {
      if (otherObject instanceof Asteroids.Asteroid||otherObject instanceof Asteroids.Enemy) {

        if (this.collisionCounter == false) {
            if (otherObject instanceof Asteroids.Asteroid){
        this.vel = [otherObject.vel[0] - this.vel[0], otherObject.vel[1] - this.vel[1]]

        otherObject.vel = [otherObject.vel[0] - this.vel[0], otherObject.vel[1] - this.vel[1]]
      };
        if (this.vel[0] > 4) {this.vel[0] = Math.random()*4}
        if (this.vel[0] < -4) {this.vel[0] = -Math.random()*4}
        if (this.vel[1] > 4) {this.vel[1] = Math.random()*4}
        if (this.vel[1] < -4) {this.vel[1] = -Math.random()*4}

        if (otherObject.vel[0] > 4) {otherObject.vel[0] = Math.random()*4}
        if (otherObject.vel[0] < -4) {otherObject.vel[0] = -Math.random()*4}
        if (otherObject.vel[1] > 4) {otherObject.vel[1] = Math.random()*4}
        if (otherObject.vel[1] < -4) {otherObject.vel[1] = -Math.random()*4}

         this.collisionCounter = true;
         this.justHit = true;


         this.game.life -= 1;
     $( '#scoreBoard' ).html( 'Your Score : ' + this.game.score + ' - Your Life : ' + this.game.life + ' - High Score : ' + this.game.highScore);
        if (this.game.life < 1) {
          this.remove();
          this.explode();

          this.game.gameOver();
        }
     }
     var that = this;
     setTimeout(
     function(){

     that.collisionCounter = false;
   }, 500);
    };
}
})();
