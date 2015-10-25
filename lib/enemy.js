(function () {
  window.BHGame = window.BHGame || {};

  var Enemy = window.BHGame.Enemy = function (pos, game) {
    var vel = [0, 2];
    // vel[0] = Math.random() * 2 + 1;
    // vel[1] = Math.random() * 2 + 1;
    //
    // var random;
    // for(var i = 0; i < 1; i++){
    //   random = Math.random() * 2;
    //   if(random > 1){
    //     vel[i] = vel[i] * -1;
    //   };
    // };

    window.BHGame.MovingObject.call(this, pos, vel, game.randomSize(Enemy.RADIUS), Enemy.COLOR, game);
  };

  Enemy.COLOR = "white";
  Enemy.RADIUS = 25;

  BHGame.Util.inherits(Enemy, BHGame.MovingObject);


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

})();
