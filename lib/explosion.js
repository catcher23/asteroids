(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Explosion = Asteroids.Explosion = function (options) {

    options.radius = Explosion.RADIUS;
    this.bigExp = options.bigExp;
    this.enemyExp = options.enemyExp;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 0;
    Asteroids.MovingObject.call(this, options);

  };

  Explosion.RADIUS = 2;
  Explosion.SPEED = -10;

  Asteroids.Util.inherits(Explosion, Asteroids.MovingObject);


  Explosion.prototype.update = function () {
    this.tickCount += 1;
       if (this.tickCount > this.ticksPerFrame) {
         tickCount = 0;
           // Go to the next frame
           this.frameIndex += 1;
       }
  };

  Explosion.prototype.draw = function (ctx) {
    this.update();
    if (this.bigExp){
    var expb = new Image();
    expb.src = 'expb.png';
    ctx.drawImage(
      expb,
      this.frameIndex * 256,
      0,
      256,
      256,
      this.pos[0]-160,
      this.pos[1]-160,
      this.radius*50*Math.PI,
      this.radius*50*Math.PI
    );
  } else if (this.enemyExp) {
    var expc = new Image();
    expc.src = 'expc.png';
    ctx.drawImage(
      expc,
      this.frameIndex * 192,
      0,
      192,
      192,
      this.pos[0]-160,
      this.pos[1]-160,
      this.radius*50*Math.PI,
      this.radius*50*Math.PI
    );
  } else {
    var expa = new Image();
    expa.src = 'expa.png';
    ctx.drawImage(
      expa,
      this.frameIndex * 128,
      0,
      128,
      128,
      this.pos[0]-40,
      this.pos[1]-40,
      this.radius*20*Math.PI,
      this.radius*20*Math.PI
    );
  }
  };

  Explosion.prototype.isWrappable = false;

  Explosion.prototype.collideWith = function (otherObject) {
    console.log('explosion collision')
  };

})();
