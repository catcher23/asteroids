( function () {
    if (typeof Asteroids === "undefined") {
      window.Asteroids = {};
    }

    var Game = Asteroids.Game = function () {
      this.asteroids = [];
      this.bullets = [];
      this.ships = [];

      this.addAsteroids();
    };

    Game.BG_COLOR = "#000000";
    Game.xDim = 600;
    Game.yDim = 600;
    Game.FPS = 60;
    Game.NUM_ASTEROIDS = 3;

    Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else {
      throw "error";
    }
  };

    Game.prototype.addAsteroids = function () {
      for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.add(new Asteroids.Asteroid({
          game: this,


        }));

      }
    };

    Game.prototype.addShip = function () {
      var ship = new Asteroids.Ship({
        pos: this.randomPosition(this),
        game: this
      });

      this.add(ship);
      return ship;
    };

    Game.prototype.randomPosition = function (object) {
        if (object instanceof Asteroids.Asteroid) {
      return [
        Game.xDim * Math.random(),
        Game.yDim
      ];
    } else {
      return [
        Game.xDim * 0.5,
        Game.yDim * 0.8
      ];
    }
  };

    Game.prototype.step = function () {
      this.moveObjects();
      this.checkCollisions();
    };

    Game.prototype.checkCollisions = function () {
      var game = this;
      this.allObjects().forEach(function (obj1) {
        game.allObjects().forEach(function (obj2) {
          if (obj1 == obj2) {
            return;
          }
          if (obj1.isCollidedWith(obj2)) {
            obj1.collideWith(obj2);
          }
        });
      });
    };

    Game.prototype.allObjects = function () {
      return [].concat(this.ships, this.asteroids, this.bullets);
    };

    Game.prototype.isOutOfBounds = function (pos) {
      return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > Game.xDim) || (pos[1] > Game.yDim);
    };

    Game.prototype.moveObjects = function () {
      this.allObjects().forEach(function (object) {
            object.move();
          });
        };

    Game.prototype.draw = function (ctx) {
      ctx.clearRect(0, 0, Game.xDim, Game.yDim);
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.xDim, Game.yDim);

      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
    };

    Game.prototype.wrap = function (pos) {
      return [
      wrap(pos[0], Game.xDim), wrap(pos[1], Game.yDim)
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

    Game.prototype.remove = function (object) {
      if (object instanceof Asteroids.Bullet) {
        this.bullets.splice(this.bullets.indexOf(object), 1);
      } else if (object instanceof Asteroids.Asteroid) {
        var idx = this.asteroids.indexOf(object);
        this.asteroids[idx] = new Asteroids.Asteroid({
           game: this,

          });
      } else if (object instanceof Asteroids.Ship) {
        this.ships.splice(this.ships.indexOf(object), 1);
      } else {
        throw "error";
      }
    };

    Game.prototype.restrict = function (object) {
    object.vel = [0,0];
    object.remove();
    };

})();
