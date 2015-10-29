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
          this.attackIntervalIds[0] = window.setInterval( function (){
            this.fireBullet(180);
            this.fireBullet(135);
            this.fireBullet(225);
          }.bind(this), 1000);
        };
      }.bind(this), 700);
    };

    //stop moving
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/4 + this.stopPosition){
      this.vel[1] = 0;
    };
  };

})();
