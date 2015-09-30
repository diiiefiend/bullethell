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
    var impulse;

    key('up', function (){                              //move forward
      if(key.isPressed('space')){
        this.game.ship.fireBullet();
      };
      impulse = -1;
      this.game.ship.power(impulse, this.lastPress, 'up');
      this.lastPress = 'up';
    }.bind(this) );

    key('down', function (){                          //move backward
      if(key.isPressed('space')){
        this.game.ship.fireBullet();
      };
      impulse = +1;
      this.game.ship.power(impulse, this.lastPress, 'down');
      this.lastPress = 'down';
    }.bind(this) );

    key('left', function (){                        //turn ccw
      if(key.isPressed('space')){
        this.game.ship.fireBullet();
      };
      this.game.ship.turn(-15);
    }.bind(this) );

    key('right', function (){                       //turn cw
      if(key.isPressed('space')){
        this.game.ship.fireBullet();
      };
      this.game.ship.turn(15);
    }.bind(this) );

    key('space', function (){
      this.game.ship.fireBullet();
    }.bind(this) );
  };

})();
