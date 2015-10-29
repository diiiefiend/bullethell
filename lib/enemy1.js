(function () {
  window.BHGame = window.BHGame || {};

  var Enemy1 = window.BHGame.Enemy1 = function (pos, game, stopPosition) {
    var vel = [0, 2];

    this.attackCounter = 0;

    this.stopPosition = stopPosition;

    window.BHGame.EnemyObject.call(this, pos, vel, Enemy1.HEALTH, Enemy1.RADIUS, Enemy1.COLOR, game);
  };

  Enemy1.RADIUS = 25;
  Enemy1.COLOR = "white";
  Enemy1.HEALTH = 20;

  BHGame.Util.inherits(Enemy1, BHGame.EnemyObject);

  Enemy1.prototype.getAttackPattern = function (){
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
            this.attackIntervalIds[1] = window.setInterval( function (){
              this.attackCounter++;
              if(this.attackCounter % 3 === 0){
                this.fireBullet(135);
                this.fireBullet(225);
              } else {
                this.fireBullet(180);
              };
            }.bind(this), 600);

          };
          this.vel[1] = 1;
          if(this.pos[0] > window.BHGame.Game.DIM_X/2){
            this.vel[0] = -1;
          } else {
            this.vel[0] = +1;
          };
        }.bind(this), 3000);
      };
    };

    //stop moving
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/3 + this.stopPosition){
      this.vel = [0, 0];
    };
  };

})();
