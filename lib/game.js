(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.score = 0;
    this.deaths = 0;
    this.gameOver = false;
    this.won = false;
    this.bossStage = false;
    this.boss = null;

    this.populateAsteroids();
    this.ship = new Asteroids.Ship([Asteroids.Game.DIM_X/2, Asteroids.Game.DIM_Y-25], this);
  };

  Game.DIM_X = window.innerWidth-50;
  Game.DIM_Y = window.innerHeight-200;
  Game.NUM_ASTEROIDS = 15;

  Game.prototype.populateAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++){
      var aster = new Asteroids.Asteroid(this.randomPosition(), this);
      this.asteroids.push(aster);
    };
  };

  Game.prototype.draw = function (ctxt) {
    ctxt.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    //insert cool background here

    //"HUD"
    ctxt.font = "16px sans-serif";
    ctxt.fillStyle = "white";
    ctxt.textAlign = "start";

    ctxt.fillText("Shields: 100", 30, 30);

    ctxt.textAlign = "right";
    ctxt.fillText("SCORE: "+this.score, Game.DIM_X-30, 30);
    ctxt.fillText("Lives left: "+(3-this.deaths), Game.DIM_X-30, 50);

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
    if(this.score > 100 && !this.bossStage){
     this.bossStage = true;
     this.add(new window.Asteroids.Planet([Game.DIM_X/2, 1], this));
    };
  };

  Game.prototype.add = function (object) {
    if (object instanceof window.Asteroids.Asteroid){
      this.asteroids.push(object);
    } else if (object instanceof window.Asteroids.Bullet){
      this.bullets.push(object);
    } else if (object instanceof window.Asteroids.Planet){
      this.boss = object;
    };
  };

  Game.prototype.remove = function (object) {
    if (object instanceof window.Asteroids.Asteroid){
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
      if(!this.bossStage){
        //for now, add new asteroids to shoot
        this.add(new window.Asteroids.Asteroid(this.randomTopPosition(), this));
      };
    } else if (object instanceof window.Asteroids.Bullet){
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof window.Asteroids.Planet){
      //trigger some sort of boss blow up animation here
      this.gameOver = true;
      this.won = true;
    };
  };

  //helper methods
  Game.prototype.randomPosition = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y/2;
    return [x, y];
  };

  Game.prototype.randomTopPosition = function () {
    return [Math.random() * Game.DIM_X, 1];
  };

  Game.prototype.randomSize = function (max){
    return Math.random() * (max-7) + 7;
  };

  Game.prototype.allObjects = function () {
    var arr = [];
    if(this.bossStage){
      arr.push(this.boss);
    };
    arr = arr.concat(this.asteroids).concat(this.ship).concat(this.bullets);
    return arr;
  };

  Game.prototype.bound = function (pos) {
    var x = pos[0];
    var y = pos[1];
    var offset = 10;
    if (!(x < Game.DIM_X-offset && x > offset)){
      x = (x <= offset ? offset : Game.DIM_X-offset);
    };
    if (!(y < Game.DIM_Y-offset && y > offset)){
      y = (y <= offset ? offset : Game.DIM_Y-offset);
    };
    return [x, y];
  };

  Game.prototype.isOutOfBounds = function (pos){
    return !(pos[0] < Game.DIM_X && pos[0] > 0) || !(pos[1] < Game.DIM_Y && pos[1] > 0);
  };

})();
