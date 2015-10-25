(function () {
  window.BHGame = window.BHGame || {};

  var Game = window.BHGame.Game = function () {
    this.enemies = [];
    this.bullets = [];
    this.score = 0;
    this.deaths = 0;
    this.gameOver = false;
    this.won = false;
    this.bossStage = false;
    this.boss = null;

    window.setTimeout( function (){
      this.populateBHGame();
    }.bind(this), 1000);
    this.ship = new BHGame.Ship([BHGame.Game.DIM_X/2, BHGame.Game.DIM_Y-25], this);
  };

  Game.DIM_X = window.innerWidth-50;
  Game.DIM_Y = window.innerHeight-200;
  Game.NUM_ENEMIES = 2;

  Game.prototype.populateBHGame = function () {
    for (var i = 0; i < Game.NUM_ENEMIES; i++){
      var enemy = new BHGame.Enemy(this.randomTopPosition(), this);
      this.enemies.push(enemy);
    };
  };

  Game.prototype.draw = function (ctxt) {
    ctxt.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    //insert cool background here

    //"HUD"
    ctxt.font = "16px sans-serif";
    ctxt.fillStyle = "white";
    ctxt.textAlign = "start";

    ctxt.fillText("Invincible: " + this.ship.invincible, 30, 30);

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
     this.add(new window.BHGame.Planet(this));
    };
  };

  Game.prototype.add = function (object) {
    if (object instanceof window.BHGame.Enemy){
      this.enemies.push(object);
    } else if (object instanceof window.BHGame.Bullet){
      this.bullets.push(object);
    } else if (object instanceof window.BHGame.Planet){
      this.boss = object;
    };
  };

  Game.prototype.remove = function (object) {
    if (object instanceof window.BHGame.Enemy){
      this.enemies.splice(this.enemies.indexOf(object), 1);
      if(!this.bossStage){
        //for now, add new enemies to shoot
        this.add(new window.BHGame.Enemy(this.randomTopPosition(), this));
      };
    } else if (object instanceof window.BHGame.Bullet){
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof window.BHGame.Planet){
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
    arr = arr.concat(this.enemies).concat(this.ship).concat(this.bullets);
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

  Game.prototype.isOutOfBounds = function (pos, obj){
    return !(pos[0] < (Game.DIM_X + obj.radius) && pos[0] > (0 - obj.radius)) ||
            !(pos[1] < (Game.DIM_Y + obj.radius) && pos[1] > (0 - obj.radius));
  };

})();
