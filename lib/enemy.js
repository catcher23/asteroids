(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Enemy = Asteroids.Enemy = function (options) {
    options.radius = Enemy.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || 'lightgreen'
    this.collisionCounter = false;
    this.justHit = false;
    this.life = 3;
    Asteroids.MovingObject.call(this, options)
  };

  Enemy.RADIUS = 15;

  Asteroids.Util.inherits(Enemy, Asteroids.MovingObject);

  Enemy.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
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

enemy.src = 'enemy.png';
that = this;
setTimeout(function(){

that.justHit = false;

}, 100);


} else {
  enemy.src = 'enemy2.png';
}

  ctx.drawImage(enemy, this.pos[0]-20,this.pos[1]-20, this.radius*Math.PI , this.radius*Math.PI );
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
      if (otherObject instanceof Asteroids.Asteroid || otherObject instanceof Asteroids.Bullet) {

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

  
     }
     var that = this;
     setTimeout(
     function(){

     that.collisionCounter = false;
   }, 600);
    };
}
})();
