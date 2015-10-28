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
    if(this.pos[1] >= (window.BHGame.Game.DIM_Y/8 - 1 + this.stopPosition) &&
      this.pos[1] <= (window.BHGame.Game.DIM_Y/8 + 1 + this.stopPosition)){
      this.vel[1] = 0;

      if(!this.attackIntervalIds[0]){
        this.attackIntervalIds[0] = window.setInterval(this.fireBullet.bind(this, 180), 750);
      };

      if(!this.attackTimeoutIds[0]){
        this.attackTimeoutIds[0] = window.setTimeout( function (){
          this.pos[1] = window.BHGame.Game.DIM_Y/8 + 2 + this.stopPosition;
          window.clearInterval(this.attackIntervalIds[0]);
          if(!this.attackIntervalIds[1]){
            this.attackIntervalIds[1] = window.setInterval(this.fireBullet.bind(this, 180), 600);
          };
          this.vel[1] = 1;
        }.bind(this), 5000);
      };
    };

    //stop moving
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/3 + this.stopPosition){
      this.vel[1] = 0;
    };
  };

})();
