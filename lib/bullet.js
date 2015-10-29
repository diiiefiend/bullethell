(function () {
  window.BHGame = window.BHGame || {};

  var Bullet = window.BHGame.Bullet = function (pos, vel, dir1, game) {
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

    window.BHGame.MovingObject.call(this, pos1, vel1, Bullet.RADIUS, Bullet.COLOR, game);

    this.bulletSprite = new Image();
    //source : http://opengameart.org/content/bullet-collection-1-m484
    this.bulletSprite.src = "img/bullet_sprite.png";
  };

  Bullet.RADIUS = 2;
  Bullet.COLOR = "yellow";

  BHGame.Util.inherits(Bullet, BHGame.MovingObject);

  Bullet.prototype.draw = function (ctxt) {
    ctxt.fillStyle = this.color;

    ctxt.save();

    var x = this.pos[0];
    var y = this.pos[1];
    ctxt.translate(x, y);
    ctxt.rotate((Math.PI)/180 * this.direction);

    ctxt.drawImage(this.bulletSprite, 0, 0, 25, 25, -6, 0, 12, 12);

    //figure out how to do strobing bullet animation

    ctxt.restore();
  }
})();
