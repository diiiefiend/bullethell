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
    this.explosions = [];

    this.waveNum = -1;
    this.enemiesRemaining = 0;

    //for scrolling bg
    this.bg_y = 400;
    this.bg_speed = 10;

    this.ship = new BHGame.Ship([BHGame.Game.DIM_X/2, BHGame.Game.DIM_Y/2], this);

  };

  Game.DIM_X = window.innerWidth;
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
    if(this.enemiesRemaining <= 0){
      if(this.waveNum < Game.WAVES.length){
        if(this.activeTimeoutIds.length === 0){
          this.waveNum++;
          this.callWave();
        };
      } else {
        document.getElementById('bossm').pause();
        document.getElementById('winFX').play();
        window.setTimeout( function (){
          this.gameOver = true;
          this.won = true;
          this.bossStage = false;
        }.bind(this), 1000);
      };
    };
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
      var timeoutId = window.setTimeout( function (){

        document.getElementById('bgm').pause();
        document.getElementById('bossm').play();

        var enemy = new BHGame.EnemyB(this);
        this.enemies.push(enemy);
        this.enemiesRemaining++;
        this.bossStage = true;
        this.activeTimeoutIds.pop(timeoutId);
      }.bind(this), 500);
      this.activeTimeoutIds.push(timeoutId);
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
      object.update(dt);    //update the sprite
      object.move(dt);      //update the position
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

  Game.prototype.draw = function (bgctxt, fgctxt, tempCanvas) {
    var img = window.BHGame.Resources.get('img/bg.png');
    // "scrolling" bg here
    var tempCtxt = tempCanvas.getContext('2d');

    this.bg_y = this.bg_y - this.bg_speed;
    if(this.bg_y <= 0){
      this.bg_y = 400;
    };

    tempCtxt.drawImage(img,
                      0, tempCanvas.height - this.bg_y,
                      tempCanvas.width, tempCanvas.height);
    tempCtxt.drawImage(img,
                      0, -this.bg_y,
                      tempCanvas.width, tempCanvas.height);

    var pattern = bgctxt.createPattern(tempCanvas, 'repeat');
    bgctxt.fillStyle = pattern;
    bgctxt.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    fgctxt.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.renderHUD(fgctxt);

    this.allObjects().forEach(function (object) {
      object.draw(fgctxt);
      if(object instanceof window.BHGame.Explosion && object.done){
        this.remove(object);
        if(object.enemyId !== null){
          this.enemies.splice(object.enemyId, 1); //remove the associated enemy as well
          this.enemiesRemaining--;
        };
      };
    }.bind(this));
  };

  Game.prototype.renderHUD = function (fgctxt){
    //"HUD"
    fgctxt.font = "300 16px helvetica neue, arial";
    fgctxt.fillStyle = "white";
    fgctxt.textAlign = "start";

    fgctxt.fillText("LIVES: "+(3-this.deaths), 30, 30);
    fgctxt.fillText("Invincible: " + this.ship.invincible, 30, 50);

    if(this.bossStage && this.enemies.length > 0){
      fgctxt.fillText("BOSS: " + this.enemies[0].health, Game.DIM_X/2 - 40, 30);
    };

    fgctxt.textAlign = "right";
    fgctxt.fillText("SCORE: "+this.score, Game.DIM_X-30, 30);
  };

  Game.prototype.add = function (object) {
    if (object instanceof window.BHGame.EnemyObject){
      this.enemies.push(object);
    } else if (object instanceof window.BHGame.Bullet){
      this.bullets.push(object);
    } else if (object instanceof window.BHGame.EnemyBullet){
      this.eBullets.push(object);
    } else if (object instanceof window.BHGame.Explosion){
      this.explosions.push(object);
    };
  };

  Game.prototype.remove = function (object, addExplosion) {
    if (object instanceof window.BHGame.EnemyObject){
      object.clearAttackTimeouts();
      object.clearAttackIntervals();
      if(addExplosion){
        object.invincible = true;
        document.getElementById('xplodeFX').play();
        this.add(new window.BHGame.Explosion(
          object.pos,
          object.vel,
          object.direction,
          this,
          this.enemies.indexOf(object),
          object.explosionSize
        ));
        if(this.bossStage){
          var pos2 = [object.pos[0], object.pos[1]+50];
          this.add(new window.BHGame.Explosion(
            pos2,
            object.vel,
            object.direction,
            this,
            null,
            "med"
          ));
        };
      } else {
        this.enemies.splice(this.enemies.indexOf(object), 1);
        this.enemiesRemaining--;
      };
    } else if (object instanceof window.BHGame.Bullet){
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof window.BHGame.EnemyBullet){
      this.eBullets.splice(this.eBullets.indexOf(object), 1);
    } else if (object instanceof window.BHGame.Explosion){
      this.explosions.splice(this.explosions.indexOf(object), 1);
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
    arr = arr.concat(this.enemies).concat(this.ship).concat(this.bullets).concat(this.eBullets).concat(this.explosions);
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
