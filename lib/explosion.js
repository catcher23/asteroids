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
    var expx =  new Image();
    expx.src =  'expx.png';
    ctx.drawImage(
      expx,
      this.frameIndex * 128,
      0,
      128,
      128,
      this.pos[0]-110,
      this.pos[1]-110,
      this.radius*30*Math.PI,
      this.radius*30*Math.PI
    );
  } else if (this.enemyExp) {
    var expa = new Image();
    expa.src = expa.src || 'expa.png';
    ctx.drawImage(
      expa,
      this.frameIndex * 128,
      0,
      128,
      128,
      this.pos[0]-110,
      this.pos[1]-110,
      this.radius*30*Math.PI,
      this.radius*30*Math.PI
    );
  } else {
    var expa =  new Image();
    expa.src =  'expa.png';
    ctx.drawImage(
      expa,
      this.frameIndex * 128,
      0,
      128,
      128,
      this.pos[0]-40,
      this.pos[1]-40,
      this.radius*10*Math.PI,
      this.radius*10*Math.PI
    );
  }
  };

  Explosion.prototype.isWrappable = false;

  Explosion.prototype.collideWith = function (otherObject) {
    console.log('explosion collision')
  };

})();
