(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.asteroids = [];
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.NUM_ASTEROIDS = 40;
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++){
      var aster = new Asteroids.Asteroid(this.randomPosition(), this);
      this.asteroids.push(aster);
    };
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctxt) {
    ctxt.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctxt);
    });
  };

  Game.prototype.moveObjects = function () {
    var test = this.asteroids;
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];
    if (!(x < this.DIM_X && x > 0)){
      x = this.DIM_X - x;
    };
    if (!(y < this.DIM_Y && y > 0)){
      y = this.DIM_Y - y;
    };
    return [x, y];
  };

  Game.prototype.checkCollisions = function (){
    for (var i = 0; i < this.asteroids.length-1; i++){
      for (var j = i+1; j < this.asteroids.length; j++){
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])){
          this.asteroids[i].collideWith(this.asteroids[j]);
        };
      };
    };
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  };

})();
