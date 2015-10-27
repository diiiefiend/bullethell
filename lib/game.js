(function () {
  window.BHGame = window.BHGame || {};

  var Game = window.BHGame.Game = function () {
    this.enemies = [];
    this.bullets = [];
    this.eBullets = [];
    this.score = 0;
    this.deaths = 0;
    this.gameOver = false;
    this.won = false;
    this.bossStage = false;

    this.waveNum = -1;
    this.enemiesRemaining = 0;

    this.populateBHGame();

    this.ship = new BHGame.Ship([BHGame.Game.DIM_X/2, BHGame.Game.DIM_Y-25], this);
  };

  Game.DIM_X = window.innerWidth-50;
  Game.DIM_Y = window.innerHeight-200;
  Game.WAVES = [2, 1];
  //denotes X position of the sprite
  Game.WAVE_POSITIONS = [
      [window.BHGame.Game.DIM_X/4, window.BHGame.Game.DIM_X/4 * 3],
      [-1, -1]
      // [200, 0]
    ];

  Game.prototype.populateBHGame = function () {
    //consider making 3 types of enemies, each progressively harder
    // first wave: 2 normal enemies that move in a straight line and shoot likewise
    // second wave: 4 normal enemies
    // third wave: 2 medium enemies that shoot 3 bullets at a time -- stop in the middle of the screen (do a check on position--if position > Game.DIM_Y/2, vel = 0)
    // fourth wave: boss (planet) --bullets in 8 directions, a laser? a spray of small bullets? something

    var checkEnemiesId = window.setInterval( function (){
      if(this.enemiesRemaining <= 0){
        if(this.waveNum < Game.WAVES.length){
          this.waveNum++;
          this.callWave();
        } else {
          this.gameOver = true;
          this.won = true;
        };
      };
    }.bind(this), 1500);

  };

  Game.prototype.callWave = function (){
    //make this a case-switch statement later
    if(this.waveNum === 0){
      window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new BHGame.Enemy1([Game.WAVE_POSITIONS[this.waveNum][j], 1], this);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
      }.bind(this), 1000);
    };

    if(this.waveNum === Game.WAVES.length - 1){
      var enemy = new BHGame.EnemyB(this);
      this.enemies.push(enemy);
      this.enemiesRemaining++;
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
  };

  Game.prototype.add = function (object) {
    if (object instanceof window.BHGame.EnemyObject){
      this.enemies.push(object);
    } else if (object instanceof window.BHGame.Bullet){
      this.bullets.push(object);
    } else if (object instanceof window.BHGame.EnemyBullet){
      this.eBullets.push(object);
    };
  };

  Game.prototype.remove = function (object) {
    if (object instanceof window.BHGame.EnemyObject){
      this.enemies.splice(this.enemies.indexOf(object), 1);
      object.clearAttackTimeouts();
      object.clearAttackIntervals();
      this.enemiesRemaining--;
    } else if (object instanceof window.BHGame.Bullet){
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof window.BHGame.EnemyBullet){
      this.eBullets.splice(this.eBullets.indexOf(object), 1);
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
    arr = arr.concat(this.enemies).concat(this.ship).concat(this.bullets).concat(this.eBullets);
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
