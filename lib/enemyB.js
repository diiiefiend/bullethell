(function () {
  window.BHGame = window.BHGame || {};

  var EnemyB = window.BHGame.EnemyB = function (game) {
    var vel = [0, 1];
    var pos = [window.BHGame.Game.DIM_X/2, -EnemyB.RADIUS];

    this.invincible = true;

    window.setTimeout( function (){
      this.invincible = false;
    }.bind(this), 5000);

    var spriteOptions = [
      0, 0,
      800, 264,
      -100, -132,
      200, 264,
      4, 6
    ];

    window.BHGame.EnemyObject.call(this,
      pos,
      vel,
      EnemyB.HEALTH,
      EnemyB.RADIUS,
      EnemyB.COLOR,
      game,
      spriteOptions);
  };

  EnemyB.RADIUS = 120;
  EnemyB.COLOR = "red";
  EnemyB.HEALTH = 300;

  BHGame.Util.inherits(EnemyB, BHGame.EnemyObject);

  EnemyB.prototype.getAttackPattern = function (){
    if(!this.attackTimeoutIds[0]){
      this.attackTimeoutIds[0] = window.setTimeout( function (){
        if(!this.attackIntervalIds[0]){
          this.attackIntervalIds[0] = window.setInterval( function (){
            for (var i = 0; i < 360; i = i+45){
              this.fireBullet(i, [-this.radius, 0]);
              this.fireBullet(i);
              this.fireBullet(i, [+this.radius, 0]);
            };
          }.bind(this), 3000);
        };

        if(!this.attackIntervalIds[1]){
          this.attackIntervalIds[1] = window.setInterval( function (){
              for(var i = -60; i <= 60; i = i+20){
                this.fireBullet(180, [i, +this.radius]);
              };
          }.bind(this), 5000);
        };

      }.bind(this), 700);

    };
    if(this.health < EnemyB.HEALTH/1.5 && !this.attackIntervalIds[2]){
      this.attackIntervalIds[2] = window.setInterval( function (){
        for (var i = 0; i < 360; i = i+30){
          var that = this;
          (function(j){
            window.setTimeout( function (){ that.fireBullet(j, [0, 0]);}, j);
          })(i);
        };
      }.bind(this), 2000);
    };

    //stop moving when it hits the middle
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/3){
      this.vel[1] = 0;
    };
  };

  EnemyB.prototype.draw = function (){
    var img = window.BHGame.Resources.get('img/boss.png');
    window.BHGame.MovingObject.prototype.render.call(this, ctxt, img);

    // for debugging the hitbox
    // window.BHGame.MovingObject.prototype.draw.call(this, ctxt);
  };

})();
