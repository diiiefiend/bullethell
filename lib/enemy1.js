(function () {
  window.BHGame = window.BHGame || {};

  var Enemy1 = window.BHGame.Enemy1 = function (pos, game, stopPosition) {
    var vel = [0, 2];

    this.attackCounter = 0;

    this.lifetime = 0;

    this.stopPosition = stopPosition;

    var spriteOptions = [
      0, 0,
      365, 93,
      -36, -47,
      73, 93,
      5, 6
    ];

    window.BHGame.EnemyObject.call(this,
      pos,
      vel,
      Enemy1.HEALTH,
      Enemy1.RADIUS,
      Enemy1.COLOR,
      game,
      spriteOptions);
  };

  Enemy1.RADIUS = 35;
  Enemy1.COLOR = "white";
  Enemy1.HEALTH = 50;

  BHGame.Util.inherits(Enemy1, BHGame.EnemyObject);

  Enemy1.prototype.getAttackPattern = function (dt){
    this.lifetime += dt;

    if(Math.round(this.lifetime * 10)/10 === 0.8){
      this.vel[1] = 0;
    };

    if(Math.floor(this.lifetime) === 2){
      this.vel[1] = 1;
    };

    if(!this.attackIntervalIds[0]){
        this.attackIntervalIds[0] = window.setInterval( function (){
          this.fireBullet(135);
          this.fireBullet(225);
        }.bind(this), 600);
    };

    if(!this.attackTimeoutIds[0]){
      this.attackTimeoutIds[0] = window.setTimeout( function (){
        window.clearInterval(this.attackIntervalIds[0]);
        if(!this.attackIntervalIds[1]){
          this.attackIntervalIds[1] = window.setInterval( function (){
            if(this.attackCounter % 2 === 0){
              this.fireBullet(135);
              this.fireBullet(225);
            } else {
              this.fireBullet(180);
            };
            this.attackCounter++;
          }.bind(this), 600);

        };
        this.vel[1] = 1;
        if(this.pos[0] > window.BHGame.Game.DIM_X/2){
          this.vel[0] = -1;
        } else {
          this.vel[0] = +1;
        };
      }.bind(this), 2000);
    };

    //stop moving
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/3 + this.stopPosition){
      this.vel = [0, 0];
    };
  };

  Enemy1.prototype.draw = function (){
    var img = window.BHGame.Resources.get('img/enemy1.png');
    window.BHGame.MovingObject.prototype.render.call(this, ctxt, img);

    //add animated thrusters sprite behind ship

    // for debugging the hitbox
    // window.BHGame.MovingObject.prototype.draw.call(this, ctxt);
  };

})();
