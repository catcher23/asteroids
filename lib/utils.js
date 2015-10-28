( function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  if (typeof Util === 'undefined') {
    window.Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };


})();
