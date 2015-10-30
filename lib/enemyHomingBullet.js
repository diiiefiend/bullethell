(function () {
  window.BHGame = window.BHGame || {};

  var EnemyHomingBullet = window.BHGame.EnemyHomingBullet = function (pos, vel, dir1, game) {
    window.BHGame.EnemyBullet.call(this, pos, vel, dir1, game, EnemyHomingBullet.RADIUS, EnemyHomingBullet.COLOR);
  };

  EnemyHomingBullet.RADIUS = 10;
  EnemyHomingBullet.COLOR = "green";

  BHGame.Util.inherits(EnemyHomingBullet, BHGame.EnemyBullet);

  EnemyHomingBullet.prototype.move = function (){
    this.vel = [3, 3];

    window.BHGame.MovingObject.prototype.move.call(this);
  },

  EnemyHomingBullet.prototype.draw = function (ctxt) {
    ctxt.fillStyle = this.color;

    ctxt.save();

    // ctxt.translate(this.pos[0], this.pos[1]);
    // ctxt.rotate((Math.PI)/180 * this.direction);
    //
    // var bulletSprite = new Image();
    // //source : http://opengameart.org/content/bullet-collection-1-m484
    // bulletSprite.src = "img/bullet_sprite.png";
    // ctxt.drawImage(bulletSprite, 0, 25, 25, 25, -12, -12, 25, 25);

    //figure out how to do strobing bullet animation

    ctxt.restore();

    // for debugging the hitbox
    window.BHGame.MovingObject.prototype.draw.call(this, ctxt);
  }
})();
