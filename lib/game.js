(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.asteroids = [];
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.NUM_ASTEROIDS = 10;
    this.addAsteroids();
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    alert("ship at : " + this.ship.pos);
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

    this.allObjects().forEach(function (object) {
      object.draw(ctxt);
    });
  };

  Game.prototype.moveObjects = function () {
    var arr = this.allObjects();
    arr.forEach(function (object) {
      object.move();
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
    arr = this.allObjects();

    for (var i = 0; i < arr.length-1; i++){
      for (var j = i+1; j < arr.length; j++){
        if (arr[i].isCollidedWith(arr[j])){
          arr[i].collideWith(arr[j]);
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

  Game.prototype.allObjects = function () {
    var arr = this.asteroids.concat(this.ship);
    return arr;
  };

})();
