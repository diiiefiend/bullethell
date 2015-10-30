(function () {
  window.BHGame = window.BHGame || {};

  var Game = window.BHGame.Game = function () {
    this.enemies = [];
    this.bullets = [];
    this.eBullets = [];
    this.gameTime = 0;
    this.score = 0;
    this.deaths = 0;
    this.gameOver = false;
    this.won = false;
    this.bossStage = false;
    this.activeTimeoutIds = [];

    this.waveNum = -1;
    this.enemiesRemaining = 0;

    this.populateBHGame();

    this.ship = new BHGame.Ship([BHGame.Game.DIM_X/2, BHGame.Game.DIM_Y/2], this);

  };

  Game.DIM_X = window.innerWidth-50;
  Game.DIM_Y = window.innerHeight-200;
  Game.WAVES = [2, 2, 2, 1, 2, 1];
  //denotes X position of the sprite
  Game.WAVE_POSITIONS = [
      [window.BHGame.Game.DIM_X/4, window.BHGame.Game.DIM_X/4 * 3],
      [window.BHGame.Game.DIM_X/8 + 100, window.BHGame.Game.DIM_X/8 * 7 - 100],
      [window.BHGame.Game.DIM_X/8 * 3, window.BHGame.Game.DIM_X/8 * 5,],
      [window.BHGame.Game.DIM_X/2],
      [window.BHGame.Game.DIM_X/3, window.BHGame.Game.DIM_X/3 * 2],
      [-1]
    ];

  Game.prototype.populateBHGame = function () {
    //consider making 3 types of enemies, each progressively harder
    // first wave: 2 normal enemies
    // second wave: 4 normal enemies
    // third wave: 2 medium enemies that shoot 3 bullets at a time -- stop in the middle of the screen (do a check on position--if position > Game.DIM_Y/2, vel = 0)
    // fourth wave: boss (planet) --bullets in 8 directions, a laser? a spray of small bullets? something

    // if(this.gameTime >= 10){
    //   this.waveNum++;
    //   this.callWave();
    // };

    var checkEnemiesId = window.setInterval( function (){
      if(this.enemiesRemaining <= 0){
        if(this.waveNum < Game.WAVES.length){
          if(this.activeTimeoutIds.length === 0){
            this.waveNum++;
            this.callWave();
          };
        } else {
          this.gameOver = true;
          this.won = true;
          this.bossStage = false;
        };
      };
    }.bind(this), 500);

  };

  Game.prototype.callWave = function (){
    //first & second wave
    if(this.waveNum <= 1){
      var pos;
      this.waveNum === 0 ? pos = 0 : pos = 50;
      var timeoutId = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new BHGame.Enemy1([Game.WAVE_POSITIONS[this.waveNum][j], -window.BHGame.Enemy1.RADIUS], this, pos);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId);
      }.bind(this), 1000);

      this.activeTimeoutIds.push(timeoutId);
    };

    if(this.waveNum === 1){
      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum+1]; j++){
          var enemy = new BHGame.Enemy1([Game.WAVE_POSITIONS[this.waveNum+1][j], -window.BHGame.Enemy1.RADIUS], this, -50);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId2);
        this.waveNum++;
      }.bind(this), 2500);

      this.activeTimeoutIds.push(timeoutId2);
    };

    //third wave
    if(this.waveNum === 3){
      var timeoutId = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new BHGame.Enemy2([Game.WAVE_POSITIONS[this.waveNum][j], -window.BHGame.Enemy2.RADIUS], this, 50);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId);
      }.bind(this), 1000);
      this.activeTimeoutIds.push(timeoutId);

      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum+1]; j++){
          var enemy = new BHGame.Enemy2([Game.WAVE_POSITIONS[this.waveNum+1][j], -window.BHGame.Enemy2.RADIUS], this, 0);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.waveNum++;
        this.activeTimeoutIds.pop(timeoutId2);
      }.bind(this), 4000);
      this.activeTimeoutIds.push(timeoutId2);
    };

    //boss
    if(this.waveNum === Game.WAVES.length - 1){
      var enemy = new BHGame.EnemyB(this);
      this.enemies.push(enemy);
      this.enemiesRemaining++;
      this.bossStage = true;
    };
  };

  Game.prototype.update = function (dt) {
    this.gameTime += dt;
    this.populateBHGame();

    this.step(dt);
  };

  Game.prototype.step = function (dt) {
    this.moveObjects(dt);
    this.checkCollisions();
  };

  Game.prototype.moveObjects = function (dt) {
    var arr = this.allObjects();
    arr.forEach(function (object) {
      object.move(dt);
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

  Game.prototype.draw = function (ctxt) {
    // ctxt.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var pattern = ctxt.createPattern(window.BHGame.Resources.get('img/bg.png'), 'repeat');
    ctxt.fillStyle = pattern;
    ctxt.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.renderHUD(ctxt);

    this.allObjects().forEach(function (object) {
      object.draw(ctxt);
    });
  };

  Game.prototype.renderHUD = function (ctxt){
    //"HUD"
    ctxt.font = "16px sans-serif";
    ctxt.fillStyle = "white";
    ctxt.textAlign = "start";

    ctxt.fillText("Invincible: " + this.ship.invincible, 30, 30);

    if(this.bossStage && this.enemies.length > 0){
      ctxt.fillText("BOSS: " + this.enemies[0].health, Game.DIM_X/2 - 40, 30);
    };

    ctxt.textAlign = "right";
    ctxt.fillText("SCORE: "+this.score, Game.DIM_X-30, 30);
    ctxt.fillText("Lives left: "+(3-this.deaths), Game.DIM_X-30, 50);
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
