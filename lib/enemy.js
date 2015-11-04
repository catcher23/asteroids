(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Enemy = Asteroids.Enemy = function (options) {

    this.pos = options.pos;

    this.game = options.game;
    options.radius = Enemy.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || 'lightgreen'
    this.collisionCounter = false;
    this.justHit = false;
    this.life = 3;

    random = Math.random();
    this.speed = 2 * random

    this.angle = 0;
    Asteroids.MovingObject.call(this, options)
  };

  Enemy.RADIUS = 15;

  Asteroids.Util.inherits(Enemy, Asteroids.MovingObject);

  Enemy.prototype.fireEbullet = function () {
    var norm = Asteroids.Util.norm(this.vel);
    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Ebullet.SPEED
    );
    var that = this;
    var ebulletVel = [

      Math.cos(that.angle)*Asteroids.Ebullet.SPEED, Math.sin(that.angle)*Asteroids.Ebullet.SPEED
    ];

    var ebullet = new Asteroids.Ebullet({
      pos: this.pos,
      vel: ebulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(ebullet);

  };

  Enemy.prototype.power = function (impulse) {
    var that = this;
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];


  };

  Enemy.prototype.relocate = function () {
    this.pos = this.game.centerPosition();
    this.vel = [0, 0];
  };

  Enemy.prototype.draw = function (ctx) {
    var enemy = new Image();

    if (this.justHit) {

enemy.src = 'efighter2.png';
that = this;
setTimeout(function(){
that.justHit = false;
}, 100);

} else {
  enemy.src = 'efighter.png';
}
ctx.translate(this.pos[0],this.pos[1]);    // translate to center of rotation
ctx.rotate(this.angle );      // rotate, here +90deg to comp image dir.
ctx.translate(-this.pos[0],-this.pos[1]);  // translate back
     // draw image

ctx.drawImage(enemy, this.pos[0]-23,this.pos[1]-23, this.radius*Math.PI , this.radius*Math.PI );
ctx.setTransform(1,0,0,1,0,0);
  };
  Enemy.prototype.explode = function () {


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


    Enemy.prototype.collideWith = function (otherObject) {

      if (otherObject instanceof Asteroids.Asteroid ||otherObject instanceof Asteroids.Ship) {

        if (this.collisionCounter == false) {
        this.vel = [otherObject.vel[0] - this.vel[0], otherObject.vel[1] - this.vel[1]]
        otherObject.vel = [otherObject.vel[0] - this.vel[0], otherObject.vel[1] - this.vel[1]]

        if (this.vel[0] > 4) {this.vel[0] = 4}
        if (this.vel[0] < -4) {this.vel[0] = -4}
        if (this.vel[1] > 4) {this.vel[1] = 4}
        if (this.vel[1] < -4) {this.vel[1] = -4}

        if (otherObject.vel[0] > 4) {otherObject.vel[0] = 4}
        if (otherObject.vel[0] < -4) {otherObject.vel[0] = -4}
        if (otherObject.vel[1] > 4) {otherObject.vel[1] = 4}
        if (otherObject.vel[1] < -4) {otherObject.vel[1] = -4}

         this.collisionCounter = true;
         this.justHit = true;
         this.life -= 1;

        if (this.life < 1) {
          this.explode();
          this.remove();
   $( '#scoreBoard' ).html( 'Your Score : ' + this.game.score + ' Your Life : ' + this.game.life);

            this.game.add(new Asteroids.Enemy({pos: this.game.randomPosition(), game: this.game }));
        }
     }
     var that = this;
     setTimeout(
     function(){
     that.collisionCounter = false;
   }, 600);
 } else if  (otherObject instanceof Asteroids.Enemy){

 }
}

Enemy.prototype.power = function () {
    this.vel[0] = Math.cos(this.angle) *4 * this.speed;
    this.vel[1] = Math.sin(this.angle)*4 * this.speed;
if (Asteroids.Util.dist(this.pos,this.game.ships[0].pos) < 200) {
  this.vel = [0,0];
};

};

Enemy.prototype.move = function () {
p1 = this.game.ships[0].pos;
p2 = this.pos;
this.angle = Math.atan2(p1[1] - p2[1], p1[0] - p2[0]);
  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
random = Math.random();
if (random >0.96) {
this.fireEbullet();
};

this.power();

  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.remove();
    }
  }
};
})();
