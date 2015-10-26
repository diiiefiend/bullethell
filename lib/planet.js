(function () {
  window.BHGame = window.BHGame || {};

  var Planet = window.BHGame.Planet = function (game) {
    var vel = [0, 1];
    window.BHGame.MovingObject.call(this, [window.BHGame.Game.DIM_X/2, -Planet.RADIUS], vel, Planet.RADIUS, Planet.COLOR, game);
    this.health = 100;
  };

  Planet.COLOR = "red";
  Planet.RADIUS = 100;

  BHGame.Util.inherits(Planet, BHGame.MovingObject);

  Planet.prototype.move = function (){
    //stop moving when it hits the middle
    if(this.pos[1] >= window.BHGame.Game.DIM_Y/2){
      this.vel[1] = 0;
    };

    window.BHGame.MovingObject.prototype.move.call(this);
  },

  Planet.prototype.collideWith = function (otherObject){
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
        //set color "flicker"
        this.color = "yellow";
        window.setTimeout( function (){
          this.color = "red";
        }.bind(this), 100);
      };
    };
  };

})();
