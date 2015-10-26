(function () {
  window.BHGame = window.BHGame || {};

  var EnemyB = window.BHGame.EnemyB = function (game) {
    var vel = [0, 1];
    var pos = [window.BHGame.Game.DIM_X/2, -EnemyB.RADIUS];

    window.BHGame.EnemyObject.call(this, pos, vel, EnemyB.HEALTH, EnemyB.RADIUS, EnemyB.COLOR, game);
  };

  EnemyB.RADIUS = 100;
  EnemyB.COLOR = "red";
  EnemyB.HEALTH = 100;

  BHGame.Util.inherits(EnemyB, BHGame.EnemyObject);

  EnemyB.prototype.getAttackPattern = function (){
    //stop moving when it hits the middle
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/2){
      this.vel[1] = 0;
    };
  };

})();
