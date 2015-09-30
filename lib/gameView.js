(function (){
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function(game, ctxt){
    this.game = game;
    this.ctxt = ctxt;
    this.lastPress = null;
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

  GameView.prototype.start = function(){
    this.addKeyBindings();

    window.setInterval(( function (){
        this.game.step();
        this.game.draw(ctxt);
    }).bind(this), 20);

    window.setInterval(( function (){
        this.executeKeys();
    }).bind(this), 80)
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

  GameView.prototype.executeKeys = function (){
    if(this.pKeys["up"]){ this.game.ship.power(-1, this.lastPress, "up"); this.lastPress = "up"; };
    if(this.pKeys["left"]){ this.game.ship.turn(-15); };
    if(this.pKeys["down"]){ this.game.ship.power(+1, this.lastPress, "down"); this.lastPress = "down"; };
    if(this.pKeys["right"]){ this.game.ship.turn(+15); };
    if(this.pKeys["space"]){ this.game.ship.fireBullet(); };
    if(this.pKeys["z"]){ this.game.ship.vel = [0,0]; };
  };

})();
