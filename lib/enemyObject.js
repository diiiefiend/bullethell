(function () {
  window.BHGame = window.BHGame || {};

  var EnemyObject = window.BHGame.EnemyObject = function (pos, vel, health, radius, color, game) {
    this.health = health;
    this.bulletIntervalIds = [];

    window.BHGame.MovingObject.call(this, pos, vel, radius, color, game);
  };

  BHGame.Util.inherits(EnemyObject, BHGame.MovingObject);

  EnemyObject.prototype.move = function (){
    this.getAttackPattern();

    window.BHGame.MovingObject.prototype.move.call(this);
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
      this.game.score += 10;
      this.game.remove(otherObject);
      this.health -= 5;
      if(this.health <= 0){
        this.game.remove(this);
      } else {
        var oldColor = this.color;
        //set color "flicker" -- change it to an opacity flicker later
        this.color = "gray";
        window.setTimeout( function (){
          this.color = oldColor;
        }.bind(this), 100);
      };
    };
  };

  EnemyObject.prototype.getAttackPattern = function (){
    //to be defined in specific enemy classes
  };

  EnemyObject.prototype.fireBullet = function (dir){
    var bulletPos = [this.pos[0], this.pos[1] + this.radius];
    var eBullet = new window.BHGame.EnemyBullet(bulletPos, [2, 2], dir, this.game);
    this.game.add(eBullet);
  };

  EnemyObject.prototype.clearBulletIntervals = function (){
    for(var i = 0; i < this.bulletIntervalIds.length; i++){
      clearInterval(this.bulletIntervalIds[i]);
    };
  };

})();
