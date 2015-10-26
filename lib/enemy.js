(function () {
  window.BHGame = window.BHGame || {};

  var Enemy = window.BHGame.Enemy = function (pos, game) {
    var vel = [0, 2];

    this.bulletIntervalIds = [];

    window.BHGame.MovingObject.call(this, pos, vel, Enemy.RADIUS, Enemy.COLOR, game);
  };

  Enemy.COLOR = "white";
  Enemy.RADIUS = 25;

  BHGame.Util.inherits(Enemy, BHGame.MovingObject);

  Enemy.prototype.move = function (){
    if(this.pos[1] >= (window.BHGame.Game.DIM_Y/8 - 1) &&
      this.pos[1] <= (window.BHGame.Game.DIM_Y/8 + 1)){
      this.vel[1] = 0;

      if(!this.bulletIntervalIds[0]){
        this.bulletIntervalIds[0] = window.setInterval(this.fireBullet.bind(this), 750);
      };

      window.setTimeout( function (){
        this.pos[1] = window.BHGame.Game.DIM_Y/8 + 2;
        clearInterval(this.bulletIntervalIds[0]);
        if(!this.bulletIntervalIds[1]){
          this.bulletIntervalIds[1] = window.setInterval(this.fireBullet.bind(this), 250);
        };
        this.vel[1] = 1;
      }.bind(this), 5000);
    };

    //stop moving when it hits the middle
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/2){
      this.vel[1] = 0;
    };

    window.BHGame.MovingObject.prototype.move.call(this);
  },

  Enemy.prototype.collideWith = function (otherObject){
    if (otherObject instanceof window.BHGame.Ship){
      if(!otherObject.invincible){
        this.game.deaths += 1;
        this.game.ship.relocate();
        if(this.game.deaths >= 3){
          this.game.gameOver = true;
        };
      };
    } else if(otherObject instanceof window.BHGame.Bullet){
      this.game.score += 10;
      this.game.remove(otherObject);
      this.game.remove(this);
    };
  };

  Enemy.prototype.fireBullet = function (){
    var bulletPos = [this.pos[0], this.pos[1] + Enemy.RADIUS];
    var eBullet = new window.BHGame.EnemyBullet(bulletPos, [2, 2], 180, this.game);
    this.game.add(eBullet);
  };

  Enemy.prototype.clearBulletIntervals = function (){
    // if(this.firstAttackId){
    //   clearInterval(this.firstAttackId);
    // };
    // if(this.secondAttackId){
    //   clearInterval(this.secondAttackId);
    // };
    for(var i = 0; i < this.bulletIntervalIds.length; i++){
      clearInterval(this.bulletIntervalIds[i]);
    };
  };

})();
