var requestAnimFrame = (function(){
  return window.requestAnimationFrame    ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback){
          window.setTimeout(callback, 1000 / 60);
      };
})();

(function (){
  window.BHGame = window.BHGame || {};

  var GameView = window.BHGame.GameView = function(game, ctxt){
    this.game = game;
    this.ctxt = ctxt;

    this.lastTime;
    this.counter = 0;

    this.addKeyMap();
  };

  GameView.prototype.addKeyMap = function(){
    this.pKeys = {
      "up": false,
      "left": false,
      "right": false,
      "down": false,
      "space": false,
      "z": false
    };

    this.$el = $(document);
  };

  GameView.prototype.addKeyBindings = function (){
    this.$el.keydown(function (e){
      var code = e.keyCode;
      if (code === 38) {this.pKeys["up"] = true; };
      if (code === 37) {this.pKeys["left"] = true; };
      if (code === 40) {this.pKeys["down"] = true; };
      if (code === 39) {this.pKeys["right"] = true; };
      if (code === 32) {this.pKeys["space"] = true; };
      if (code === 90) {this.pKeys["z"] = true; };
    }.bind(this));

    this.$el.keyup(function (e){
      var code = e.keyCode;
      if (code === 38) {this.pKeys["up"] = false; };
      if (code === 37) {this.pKeys["left"] = false; };
      if (code === 40) {this.pKeys["down"] = false; };
      if (code === 39) {this.pKeys["right"] = false; };
      if (code === 32) {this.pKeys["space"] = false; };
      if (code === 90) {this.pKeys["z"] = false; };
    }.bind(this));
  };

  GameView.prototype.start = function(){
    this.addKeyBindings();
    this.lastTime = Date.now();

    if(this.replayId){
      clearInterval(this.replayId);
      document.getElementById('bossm').pause();
      this.game = new window.BHGame.Game();
    };

    document.getElementById('bgm').play();
    this.main();
  };

  GameView.prototype.main = function (){
    var now = Date.now();
    var dt = (now - this.lastTime) / 1000.0;

    if(!this.game.gameOver){
      this.executeMoves();
      this.game.update(dt);
      this.game.draw(this.ctxt);

      if(this.counter % 5 === 0){
        this.executeShoot();
      };

      this.counter++;

      this.lastTime = now;
      requestAnimFrame(this.main.bind(this));
    } else {
      this.displayGameOver();
    };
  };

  GameView.prototype.executeMoves = function (){
    if(this.pKeys["up"]){ this.game.ship.power(0, -1); };
    if(this.pKeys["left"]){ this.game.ship.power(-1, 0); };
    if(this.pKeys["down"]){ this.game.ship.power(0, +1); };
    if(this.pKeys["right"]){ this.game.ship.power(+1, 0); };

    //for debugging
    if(this.pKeys["z"]){ this.clearEnemyWave(); };
  };

  GameView.prototype.executeShoot = function (){
    if(this.pKeys["space"]){ this.game.ship.fireBullet(); };
  };

  GameView.prototype.displayGameOver = function (){

    this.ctxt.font = "36px sans-serif";
    this.ctxt.fillStyle = "red";
    this.ctxt.textAlign = "center";

    if (this.game.won){
      document.getElementById('bgm').play();

      var text = "CONGRATS YOU HAVE DEFEATED THE HORDE";
    } else {
      document.getElementById('loseFX').play();
      var text = "YOU HAVE FALLEN TO THE DIRE";
    };

    this.ctxt.fillText(text, BHGame.Game.DIM_X/2, BHGame.Game.DIM_Y/2);

    this.ctxt.font = "20px sans-serif";
    this.ctxt.fillStyle = "gray";
    this.ctxt.textAlign = "center";
    this.ctxt.fillText("press z to play again", BHGame.Game.DIM_X/2, BHGame.Game.DIM_Y/2+ 40);

    this.replayId = window.setInterval(( function (){
      if(this.pKeys["z"]){ this.start(); };
    }).bind(this), 80);
  };

  //for debugging purposes
  GameView.prototype.clearEnemyWave = function (){
    while(this.game.enemiesRemaining > 0){
      this.game.remove(this.game.enemies[0], false);
    };
  };

})();
