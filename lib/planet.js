(function () {
  window.Asteroids = window.Asteroids || {};

  var Planet = window.Asteroids.Planet = function (pos, game) {
    var vel = [0, 1];
    window.Asteroids.MovingObject.call(this, pos, vel, Planet.RADIUS, Planet.COLOR, game);
    this.isBounded = true;

    this.health = 100;
  };

  Planet.COLOR = "red";
  Planet.RADIUS = 100;

  Asteroids.Util.inherits(Planet, Asteroids.MovingObject);


  Planet.prototype.collideWith = function (otherObject){
    if (otherObject instanceof window.Asteroids.Ship){
      this.game.deaths += 1;
      this.game.ship.relocate();
      if(this.game.deaths >= 3){
        this.game.gameOver = true;
      };
    } else if(otherObject instanceof window.Asteroids.Bullet){
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
