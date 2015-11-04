(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ebullets = [];
    this.guidebullets = [];
    this.ships = [];
    this.explosions = [];
    this.enemies = [];
    this.addAsteroids();
    this.addEnemies();
    this.score = 0;
    this.life = 30;
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1500;
  Game.DIM_Y = 900;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 10;
  Game.NUM_ENEMIES = 1;

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ebullet) {
      this.ebullets.push(object);
    } else if (object instanceof Asteroids.Guidebullet) {
      this.ebullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else if (object instanceof Asteroids.Enemy) {
      this.enemies.push(object);
    } else if (object instanceof Asteroids.Explosion) {
      this.explosions.push(object);

    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addEnemies = function () {
      for (var i = 0; i < Game.NUM_ENEMIES; i++) {
    var randomPosition = this.randomPosition();
    var explosion = new Asteroids.Explosion({
      pos: randomPosition,
      bigExp: true,
      vel: [0,0],
      color: this.color,
      game: this
    });

    this.add(explosion);


      this.add(new Asteroids.Enemy({pos: randomPosition, game: this }));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.centerPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.allObjects = function () {

    return [].concat(this.ships, this.asteroids, this.bullets, this.ebullets, this.explosions, this.enemies);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          // don't allow self-collision
          return;
        }
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    that = this;
        var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0,0);

      that.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
  };
  img.src = 'myImage.png';

  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.centerPosition = function () {
    return [
      Game.DIM_X * 0.5,
      Game.DIM_Y * 0.5
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof Asteroids.Ebullet) {
        this.ebullets.splice(this.ebullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Guidebullet) {
        this.guidebullets.splice(this.guidebullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Enemy) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Asteroids.Explosion) {
      this.explosions.splice(this.explosions.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.gameOver = function () {
    $('div.gameOver').show('fast', function() {
  				$( this ).animate({top:310}, 'slow');
  			});

        setTimeout(function(){
          $('div.gameOver2').show('fast', function() {
                $( this ).animate({top:440}, 'slow');
              });
        }, 800);
  };

  Game.prototype.nextLevel = function () {
    var that = this;
    $('div.next').show('slow', function() {
          $( this ).animate({top:280}, 'slow');
        });

        setTimeout(function(){
          $('div.next').load('yep').fadeOut("linear");
        }, 1600)

        setTimeout(function(){
          Game.NUM_ENEMIES = Game.NUM_ENEMIES += 1
          Game.NUM_ENEMIES * that.addEnemies();
        }, 3600)
  };




  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap(coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };
})();
