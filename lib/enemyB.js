(function () {
  window.BHGame = window.BHGame || {};

  var EnemyB = window.BHGame.EnemyB = function (game) {
    var vel = [0, 1];
    var pos = [window.BHGame.Game.DIM_X/2, -EnemyB.RADIUS];

    this.invincible = true;

    window.BHGame.EnemyObject.call(this, pos, vel, EnemyB.HEALTH, EnemyB.RADIUS, EnemyB.COLOR, game);
  };

  EnemyB.RADIUS = 100;
  EnemyB.COLOR = "red";
  EnemyB.HEALTH = 100;

  BHGame.Util.inherits(EnemyB, BHGame.EnemyObject);

  EnemyB.prototype.getAttackPattern = function (){
    if(!this.attackTimeoutIds[0]){
      this.attackTimeoutIds[0] = window.setTimeout( function (){
        this.invincible = false;

        if(!this.attackIntervalIds[0]){
          this.attackIntervalIds[0] = window.setInterval( function (){
            for (var i = 0; i < 360; i = i+45){
              this.fireBullet(i, [-this.radius, 0]);
              this.fireBullet(i);
              this.fireBullet(i, [+this.radius, 0]);
            };
          }.bind(this), 3000);
        };
        //
        // if(!this.attackIntervalIds[1]){
        //   this.attackIntervalIds[1] = window.setInterval( function (){
        //     for (var i = 0; i < 360; i = i+45){
        //       this.fireBullet(i, [-this.radius, 0]);
        //       this.fireBullet(i, [0, 0]);
        //       this.fireBullet(i, [+this.radius, 0]);
        //     };
        //   }.bind(this), 3000);
        // };
      }.bind(this), 700);
    };

    //stop moving when it hits the middle
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/3){
      this.vel[1] = 0;
    };
  };

})();
