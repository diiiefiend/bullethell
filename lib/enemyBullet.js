(function () {
  window.BHGame = window.BHGame || {};

  var EnemyBullet = window.BHGame.EnemyBullet = function (pos, vel, dir1, game, radius, color) {
    var dir = dir1 * (Math.PI/180);     //convert to radians
    var vel1 = [];
    var pos1 = [];

    if (vel[0] !== 0){
      vel1[0] =  Math.sin(dir) * 2 * Math.max(Math.abs(vel[0]), 2);
    } else {
      vel1[0] =  Math.sin(dir) * 2;
    };

    if (vel[1] !== 0){
      vel1[1] = -1 * Math.cos(dir) * 2 * Math.max(Math.abs(vel[1]), 2);
    } else {
      vel1[1] = -1 * Math.cos(dir) * 2;
    };

    pos1[0] = pos[0];
    pos1[1] = pos[1] - 20;

    if(radius){
      var rad = radius;
    } else {
      var rad = EnemyBullet.RADIUS;
    };

    if(color){
      var col = color;
    } else {
      var col = EnemyBullet.COLOR;
    };

    var spriteOptions = [
      0, 25,
      100, 25,
      -12, -12,
      25, 25,
      4, 6
    ];

    window.BHGame.MovingObject.call(this,
      pos1,
      vel1,
      rad,
      col,
      game,
      spriteOptions,
      dir);
  };

  EnemyBullet.RADIUS = 7;
  EnemyBullet.COLOR = "blue";

  BHGame.Util.inherits(EnemyBullet, BHGame.MovingObject);

  EnemyBullet.prototype.draw = function (fgctxt) {
    var img = window.BHGame.Resources.get('img/bullet_sprite.png');
    window.BHGame.MovingObject.prototype.render.call(this, fgctxt, img);

    // for debugging the hitbox
    // window.BHGame.MovingObject.prototype.draw.call(this, ctxt);
  };
})();
