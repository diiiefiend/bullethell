(function () {
  window.BHGame = window.BHGame || {};

  var Enemy = window.BHGame.Enemy = function (pos, game) {
    var vel = [0, 2];

    window.BHGame.MovingObject.call(this, pos, vel, Enemy.RADIUS, Enemy.COLOR, game);
  };

  Enemy.COLOR = "white";
  Enemy.RADIUS = 25;

  BHGame.Util.inherits(Enemy, BHGame.MovingObject);

  Enemy.prototype.move = function (){
    if(this.pos[1] >= (window.BHGame.Game.DIM_Y/8 - 1) &&
      this.pos[1] <= (window.BHGame.Game.DIM_Y/8 + 1)){
      this.vel[1] = 0;

      var firstAttackId = window.setTimeout(this.fireBullet.bind(this), 2000);

      window.setTimeout( function (){
        this.pos[1] = window.BHGame.Game.DIM_Y/8 + 2;
        clearInterval(firstAttackId);
        this.vel[1] = 1;
      }.bind(this), 6000);
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
    // debugger
    var bulletPos = [this.pos[0], this.pos[1] + Enemy.RADIUS];
    var eBullet = new window.BHGame.EnemyBullet(bulletPos, [2, 2], 180, this.game);
    this.game.add(eBullet);
  };

})();
