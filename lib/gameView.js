var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
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

  GameView.prototype.main = function (){
    // var now = Date.now();
    // var dt = (now - this.lastTime) / 1000.0;
    //
    // // update(dt);
    // // render();
    //
    // this.lastTime = now;
    // requestAnimFrame(this.main.bind(this));

    if(this.replayId){
      clearInterval(this.replayId);
      this.game = new window.BHGame.Game();
    };

    this.drawId = window.setInterval(( function (){
        this.game.step();
        this.game.draw(ctxt);
    }).bind(this), 20);

    this.controlId = window.setInterval(( function (){
      if(!this.game.gameOver){
            this.executeMoves();
      } else {
        this.displayGameOver();
      };
    }).bind(this), 20);

    this.shootId = window.setInterval(( function (){
      if(!this.game.gameOver){
        this.executeShoot();
      };
    }).bind(this), 100);
  };

  GameView.prototype.start = function(){
    debugger
    this.addKeyBindings();
    this.main();
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
    clearInterval(this.drawId);
    clearInterval(this.controlId);
    clearInterval(this.shootId);
    clearInterval(this.game.checkEnemiesId);

    this.ctxt.font = "36px sans-serif";
    this.ctxt.fillStyle = "red";
    this.ctxt.textAlign = "center";

    if (this.game.won){
      var text = "CONGRATS YOU HAVE DEFEATED THE HORDE";
    } else {
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
      this.game.remove(this.game.enemies[0]);
    };
  };

})();
