(function () {
  window.Asteroids = window.Asteroids || {};

  var Asteroid = window.Asteroids.Asteroid = function (pos, game) {
    var vel = [];
    vel[0] = Math.random() * 2 + 1;
    vel[1] = Math.random() * 2 + 1;

    var random;
    for(var i = 0; i < 2; i++){
      random = Math.random() * 2;
      if(random > 1){
        vel[i] = vel[i] * -1;
      };
    };

    window.Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR, game);
  };

  Asteroid.COLOR = "blue";
  Asteroid.RADIUS = 25;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


  Asteroid.prototype.collideWith = function (otherObject){
    if (otherObject instanceof window.Asteroids.Ship){
      this.game.deaths += 1;
      this.game.ship.relocate();
    }else if(otherObject instanceof window.Asteroids.Bullet){
      this.game.score += 10;
      this.game.remove(otherObject);
      this.game.remove(this);
      window.setTimeout(function (){
        var aster = new Asteroid(this.game.randomEdgePosition(), this.game);
        this.game.asteroids.push(aster);
      }.bind(this), 300);
    };
  };

})();
