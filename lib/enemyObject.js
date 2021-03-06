(function () {
  window.BHGame = window.BHGame || {};

  var EnemyObject = window.BHGame.EnemyObject = function (pos, vel, health, radius, color, game, spriteOptions, dir) {
    this.health = health;
    this.attackIntervalIds = [];
    this.attackTimeoutIds = [];

    window.BHGame.MovingObject.call(this,
      pos,
      vel,
      radius,
      color,
      game,
      spriteOptions,
      dir);
  };

  BHGame.Util.inherits(EnemyObject, BHGame.MovingObject);

  EnemyObject.prototype.move = function (dt){
    this.getAttackPattern(dt);

    window.BHGame.MovingObject.prototype.move.call(this, dt);
  },

  EnemyObject.prototype.collideWith = function (otherObject){
    if (otherObject instanceof window.BHGame.Ship){
      if(!otherObject.invincible){
        this.game.deaths += 1;
        this.game.ship.relocate();
        if(this.game.deaths >= 3){
          this.game.gameOver = true;
        };
      };
    } else if(otherObject instanceof window.BHGame.Bullet){
      this.game.remove(otherObject);
      if(!this.invincible){
        this.game.score += 10;
        this.health -= 10;
        if(this.health <= 0){
          this.game.remove(this, true);
        } else {
          this.alpha = 0.5
          window.setTimeout( function (){
            this.alpha = 1;
          }.bind(this), 100);
        };
      };
    };
  };

  EnemyObject.prototype.getAttackPattern = function (){
    //to be defined in specific enemy classes
  };

  EnemyObject.prototype.fireBullet = function (dir, pos, type){
    if(pos){
      var bulletPos = [this.pos[0] + pos[0], this.pos[1] + pos[1]];
    } else {
      var bulletPos = [this.pos[0], this.pos[1] + this.radius];
    };
    var vel = [2, 2];
    if(type){
      if(type === "homing"){
        var bulletType = "EnemyHomingBullet";
      };
    } else {      //otherwise just standard bullet
      var bulletType = "EnemyBullet";
    };
    var eBullet = new BHGame[bulletType](bulletPos, vel, dir, this.game);
    this.game.add(eBullet);
  };

  EnemyObject.prototype.clearAttackIntervals = function (){
    for(var i = 0; i < this.attackIntervalIds.length; i++){
      window.clearInterval(this.attackIntervalIds[i]);
    };
  };

  EnemyObject.prototype.clearAttackTimeouts = function (){
    for(var i = 0; i < this.attackTimeoutIds.length; i++){
      window.clearTimeout(this.attackTimeoutIds[i]);
    };
  };

})();
