(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.score = 0;
    this.deaths = 0;
    // Game.DIM_X = window.innerWidth;
    // Game.DIM_Y = window.innerHeight;

    this.populateAsteroids();
    this.ship = new Asteroids.Ship([Asteroids.Game.DIM_X/2, Asteroids.Game.DIM_Y/2], this);
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 7;

  Game.prototype.populateAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++){
      var aster = new Asteroids.Asteroid(this.randomPosition(), this);
      this.asteroids.push(aster);
    };
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.randomEdgePosition = function () {
    var random = Math.random() * 2;
    if(random > 1){
      return [1, Math.random() * Game.DIM_Y];
    } else {
      return [Math.random() * Game.DIM_X, 1];
    };
  };

  Game.prototype.randomSize = function (max){
    return Math.random() * (max-7) + 7;
  };

  Game.prototype.draw = function (ctxt) {
    ctxt.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    //"HUD"
    ctxt.font = "16px serif";
    ctxt.fillStyle = "white";
    ctxt.textAlign = "start";

    ctxt.fillText("Orientation: "+this.ship.direction, 50, 50);
    ctxt.fillText("Lateral drift: "+ Math.round(this.ship.vel[0]), 50, 70);
    ctxt.fillText("Thrust: "+ Math.round(this.ship.vel[1]), 50, 90);

    ctxt.textAlign = "right";
    ctxt.fillText("SCORE: "+this.score, Game.DIM_X-50, 50);
    ctxt.fillText("Crashes: "+this.deaths, Game.DIM_X-50, 70);

    this.allObjects().forEach(function (object) {
      object.draw(ctxt);
    });
  };

  Game.prototype.allObjects = function () {
    var arr = this.asteroids.concat(this.ship).concat(this.bullets);
    return arr;
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
    if (!(x < Game.DIM_X && x > 0)){
      x = Game.DIM_X - x;
    };
    if (!(y < Game.DIM_Y && y > 0)){
      y = Game.DIM_Y - y;
    };
    return [x, y];
  };

  Game.prototype.checkCollisions = function (){
    var arr = this.allObjects();

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

  Game.prototype.add = function (object) {
    if (object instanceof window.Asteroids.Asteroid){
      this.asteroids.push(object);
    }
    else if (object instanceof window.Asteroids.Bullet){
      this.bullets.push(object);
    };
  };

  Game.prototype.remove = function (object) {
    if (object instanceof window.Asteroids.Asteroid){
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    }
    else if (object instanceof window.Asteroids.Bullet){
      this.bullets.splice(this.bullets.indexOf(object), 1);
    };
  };

  Game.prototype.isOutOfBounds = function (pos){
    return !(pos[0] < Game.DIM_X && pos[0] > 0) || !(pos[1] < Game.DIM_Y && pos[1] > 0);
  };

})();
