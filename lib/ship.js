(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || 'lightgreen'
    this.collisionCounter = false;
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

  Ship.prototype.power = function (impulse) {
    var that = this;
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];


  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.centerPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.draw = function (ctx) {
    var ship = new Image();
ship.src = 'ship.png';

  ctx.drawImage(ship, this.pos[0]-20,this.pos[1]-20, this.radius*Math.PI , this.radius*Math.PI );
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


    Ship.prototype.collideWith = function (otherObject) {
      if (otherObject instanceof Asteroids.Asteroid) {
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
     }
     var that = this;
     setTimeout(
     function(){

     that.collisionCounter = false;
   }, 800);
    };
}
})();
