(function () {
  window.Asteroids = window.Asteroids || {};

  var Asteroid = window.Asteroids.Asteroid = function (pos, game) {
    this.COLOR = "purple";
    this.RADIUS = 15;
    var vel = [];
    vel[0] = Math.random() * 9 + 1;
    vel[1] = Math.random() * 9 + 1;
    window.Asteroids.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR, game);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


})();
