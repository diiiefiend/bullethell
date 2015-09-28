(function (){
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function(game, ctxt){
    this.game = game;
    this.ctxt = ctxt;
    this.lastPress = null;
  };

  GameView.prototype.start = function(){

    this.addKeyBindings();

    window.setInterval(( function (){
        this.game.step();
        this.game.draw(ctxt);
    }).bind(this), 20);
  };

  GameView.prototype.addKeyBindings = function (){
    var impulse = [0,0];

    key('up', function (){
      // if(key.isPressed('left')){
      //   impulse[0] = -0.5;
      // } else if(key.isPressed('right')){
      //   impulse[0] = 0.5;
      // };
      impulse[1] = -0.5;
      this.game.ship.power(impulse, this.lastPress, 'up');
      this.lastPress = 'up';
    }.bind(this) );

    key('left', function (){
      // if(key.isPressed('up')){
      //   impulse[1] = -0.5;
      // } else if(key.isPressed('down')){
      //   impulse[1] = 0.5;
      // };
      impulse[0] = -0.5;
      this.game.ship.power(impulse, this.lastPress, 'left');
      this.lastPress = 'left';
    }.bind(this) );

    key('right', function (){
      // if(key.isPressed('up')){
      //   impulse[1] = -0.5;
      // } else if(key.isPressed('down')){
      //   impulse[1] = 0.5;
      // };
      impulse[0] = 0.5;
      this.game.ship.power(impulse, this.lastPress, 'right');
      this.lastPress = 'right';
    }.bind(this) );

    key('down', function (){
      // if(key.isPressed('left')){
      //   impulse[0] = -0.5;
      // } else if(key.isPressed('right')){
      //   impulse[0] = 0.5;
      // };
      impulse[1] = 0.5;
      this.game.ship.power(impulse, this.lastPress, 'down');
      this.lastPress = 'down';
    }.bind(this) );

    key('space', function (){
      this.game.ship.fireBullet();
    }.bind(this) );
  };

})();
