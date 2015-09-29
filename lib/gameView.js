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
      impulse = [-1, -1];                               //not exactly right--when it's starting, it shouldn't move diagonal
      this.game.ship.power(impulse, this.lastPress, 'up');
      this.lastPress = 'up';
    }.bind(this) );

    key('down', function (){                          //move backward
      impulse = [+1, +1];
      this.game.ship.power(impulse, this.lastPress, 'down');
      this.lastPress = 'down';
    }.bind(this) );

    key('left', function (){                        //turn ccw
      this.game.ship.turn(-15);
    }.bind(this) );

    key('right', function (){                     //turn cw
      this.game.ship.turn(15);
    }.bind(this) );

    key('space', function (){
      this.game.ship.fireBullet();
    }.bind(this) );
  };

})();
