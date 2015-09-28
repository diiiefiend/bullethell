(function () {
  window.Asteroids = window.Asteroids || {};

  var Asteroid = window.Asteroids.Asteroid = function (pos, game) {
    var vel = [];
    vel[0] = Math.random() * 9 + 1;
    vel[1] = Math.random() * 9 + 1;
    window.Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR, game);
  };

  Asteroid.COLOR = "blue";
  Asteroid.RADIUS = 25;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


  Asteroid.prototype.collideWith = function (otherObject){
    if (otherObject instanceof window.Asteroids.Ship){
      this.game.ship.relocate();
    }else if(otherObject instanceof window.Asteroids.Bullet){
      this.game.remove(otherObject);
      this.game.remove(this);
    };
  };

})();
