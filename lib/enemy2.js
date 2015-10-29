(function () {
  window.BHGame = window.BHGame || {};

  var Enemy2 = window.BHGame.Enemy2 = function (pos, game, stopPosition) {
    var vel = [0, 2];

    this.stopPosition = stopPosition;

    window.BHGame.EnemyObject.call(this, pos, vel, Enemy2.HEALTH, Enemy2.RADIUS, Enemy2.COLOR, game);

    this.enemySprite = new Image();
    //source : http://shmuproom.deviantart.com/art/Four-Spaceship-172821952
    this.enemySprite.src = "img/enemy2.png";
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
    ctxt.save();

    ctxt.globalAlpha = this.alpha;

    var x = this.pos[0];
    var y = this.pos[1];
    ctxt.translate(x, y);
    ctxt.rotate((Math.PI)/180 * this.direction);

    // ctxt.drawImage(this.enemySprite, 0, 0, 85, 92, -43, -47, 85, 92);

    //add animated thrusters sprite behind ship

    ctxt.restore();

    // for debugging the hitbox
    window.BHGame.MovingObject.prototype.draw.call(this, ctxt);
  };

})();
