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

    window.BHGame.MovingObject.call(this, pos1, vel1, rad, col, game);
  };

  EnemyBullet.RADIUS = 7;
  EnemyBullet.COLOR = "blue";

  BHGame.Util.inherits(EnemyBullet, BHGame.MovingObject);

  EnemyBullet.prototype.draw = function (ctxt) {
    ctxt.fillStyle = this.color;

    ctxt.save();

    ctxt.translate(this.pos[0], this.pos[1]);
    ctxt.rotate((Math.PI)/180 * this.direction);

    ctxt.drawImage(window.BHGame.Resources.get('img/bullet_sprite.png'), 0, 25, 25, 25, -12, -12, 25, 25);

    //figure out how to do strobing bullet animation

    ctxt.restore();

    // for debugging the hitbox
    // window.BHGame.MovingObject.prototype.draw.call(this, ctxt);
  }
})();
