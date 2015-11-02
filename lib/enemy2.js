(function () {
  window.BHGame = window.BHGame || {};

  var Enemy2 = window.BHGame.Enemy2 = function (pos, game, stopPosition) {
    var vel = [0, 2];

    this.stopPosition = stopPosition;

    var spriteOptions = [
      0, 0,
      340, 120,
      -43, -47,
      85, 120,
      4, 6,
      false,
      "small"
    ];

    window.BHGame.EnemyObject.call(this,
      pos,
      vel,
      Enemy2.HEALTH,
      Enemy2.RADIUS,
      Enemy2.COLOR,
      game,
      spriteOptions);
  };

  Enemy2.RADIUS = 40;
  Enemy2.COLOR = "yellow";
  Enemy2.HEALTH = 100;

  BHGame.Util.inherits(Enemy2, BHGame.EnemyObject);

  Enemy2.prototype.getAttackPattern = function (){
    if(!this.attackTimeoutIds[0]){
      this.attackTimeoutIds[0] = window.setTimeout( function (){
        if(!this.attackIntervalIds[0]){
          this.attackIntervalIds[0] = window.setInterval( function (){
            this.fireBullet(180);
            this.fireBullet(135);
            this.fireBullet(225);
          }.bind(this), 800);
        };
      }.bind(this), 500);
    };

    //stop moving
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/4 + this.stopPosition){
      this.vel[1] = 0;
    };
  };

  Enemy2.prototype.draw = function (){
    var img = window.BHGame.Resources.get('img/enemy2.png');
    window.BHGame.MovingObject.prototype.render.call(this, ctxt, img);

    // for debugging the hitbox
    // window.BHGame.MovingObject.prototype.draw.call(this, ctxt);
  };

})();
