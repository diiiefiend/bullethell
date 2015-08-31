(function (){
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function(game, ctxt){
    this.game = game;
    this.ctxt = ctxt;
  };

  GameView.prototype.start = function(){
    key('up', function (){ this.game.ship.power([0, -1]); }.bind(this) );
    key('left', function (){ this.game.ship.power([-1, 0]); }.bind(this) );
    key('right', function (){ this.game.ship.power([1, 0]); }.bind(this) );
    key('down', function (){this.game.ship.power([0, 1]); }.bind(this) );


    window.setInterval(( function (){
        this.game.step();
        this.game.draw(ctxt);
    }).bind(this), 20);
  };

})();
