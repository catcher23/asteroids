(function () {
  if (typeof Starbomber === "undefined") {
    window.Starbomber = {};
  }

  var GameBg = Starbomber.GameBg = function () {

  };

  GameBg.BG_COLOR = "#000000";
  GameBg.DIM_X = 1400;
  GameBg.DIM_Y = 800;
  GameBg.FPS = 32;




  GameBg.prototype.draw = function (ctx1, ctx2, game) {
    that = this;
    var img = new Image();
    img.onload = function () {
      ctx1.drawImage(img, 0,0);
      game.draw(ctx2);
    };
    img.src = 'images/myImage.png';
  };




})();
