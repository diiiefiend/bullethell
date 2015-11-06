(function () {
  window.BHGame = window.BHGame || {};

  var Explosion = window.BHGame.Explosion = function (pos, vel, dir, game, enemyId, size) {
    var spriteSize = [];

    switch (size){
      case "small":
        spriteSize = [48, 48];
        break;
      case "med":
        spriteSize = [96, 96];
        break;
      case "large":
        spriteSize = [120, 120];
        break;
    };

    var spriteOptions = [
      0, 0,
      1536, 96,
      -1 * spriteSize[0]/2, -1 * spriteSize[1]/2,
      spriteSize[0], spriteSize[1],
      16, 2,
      true
    ];

    window.BHGame.MovingObject.call(this,
      pos,
      vel,
      Explosion.RADIUS,
      Explosion.COLOR,
      game,
      spriteOptions,
      dir);

    this.enemyId = enemyId;
  };

  Explosion.RADIUS = 6;
  Explosion.COLOR = "red";

  BHGame.Util.inherits(Explosion, BHGame.MovingObject);

  Explosion.prototype.draw = function (fgctxt) {
    var img = window.BHGame.Resources.get('img/explosion.png');
    window.BHGame.MovingObject.prototype.render.call(this, fgctxt, img);
  }
})();
