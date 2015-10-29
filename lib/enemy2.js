(function () {
  window.BHGame = window.BHGame || {};

  var Enemy2 = window.BHGame.Enemy2 = function (pos, game, stopPosition) {
    var vel = [0, 2];

    this.stopPosition = stopPosition;

    window.BHGame.EnemyObject.call(this, pos, vel, Enemy2.HEALTH, Enemy2.RADIUS, Enemy2.COLOR, game);
  };

  Enemy2.RADIUS = 40;
  Enemy2.COLOR = "yellow";
  Enemy2.HEALTH = 40;

  BHGame.Util.inherits(Enemy2, BHGame.EnemyObject);

  Enemy2.prototype.getAttackPattern = function (){
    if(!this.attackTimeoutIds[0]){
      this.attackTimeoutIds[0] = window.setTimeout( function (){
        if(!this.attackIntervalIds[0]){
          this.attackIntervalIds[0] = window.setInterval(this.fireBullet.bind(this, 180), 1000);
          this.attackIntervalIds[1] = window.setInterval(this.fireBullet.bind(this, 135), 1000);
          this.attackIntervalIds[2] = window.setInterval(this.fireBullet.bind(this, 225), 1000);
        };
      }.bind(this), 700);
    };

    //stop moving
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/4 + this.stopPosition){
      this.vel[1] = 0;
    };
  };

})();
