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

  EnemyHomingBullet.prototype.draw = function (fgctxt) {

    // for debugging the hitbox
    window.BHGame.MovingObject.prototype.draw.call(this, fgctxt);
  }
})();
