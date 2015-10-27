(function () {
  window.BHGame = window.BHGame || {};

  var Enemy1 = window.BHGame.Enemy1 = function (pos, game) {
    var vel = [0, 2];

    window.BHGame.EnemyObject.call(this, pos, vel, Enemy1.HEALTH, Enemy1.RADIUS, Enemy1.COLOR, game);
  };

  Enemy1.RADIUS = 25;
  Enemy1.COLOR = "white";
  Enemy1.HEALTH = 20;

  BHGame.Util.inherits(Enemy1, BHGame.EnemyObject);

  Enemy1.prototype.getAttackPattern = function (){
    if(this.pos[1] >= (window.BHGame.Game.DIM_Y/8 - 1) &&
      this.pos[1] <= (window.BHGame.Game.DIM_Y/8 + 1)){
      this.vel[1] = 0;

      if(!this.attackIntervalIds[0]){
        this.attackIntervalIds[0] = window.setInterval(this.fireBullet.bind(this, 180), 750);
      };

      if(!this.attackTimeoutIds[0]){
        this.attackTimeoutIds[0] = window.setTimeout( function (){
          this.pos[1] = window.BHGame.Game.DIM_Y/8 + 2;
          window.clearInterval(this.attackIntervalIds[0]);
          if(!this.attackIntervalIds[1]){
            this.attackIntervalIds[1] = window.setInterval(this.fireBullet.bind(this, 180), 600);
          };
          this.vel[1] = 1;
        }.bind(this), 5000);
      };
    };

    //stop moving
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/3){
      this.vel[1] = 0;
    };
  };

})();
