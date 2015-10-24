(function() {
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (pos, game){
    window.Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR, game);
    this.direction = 0;     //direction ship is pointing in
    this.isBounded = true;
    this.relocating = false;
  };

  Ship.RADIUS = 15;
  Ship.SQUARE = 10;
  Ship.COLOR = "red";
  Ship.MAXSPEED = 7;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctxt) {
    ctxt.fillStyle = this.color;

    ctxt.save();

    var x = this.pos[0];
    var y = this.pos[1];
    ctxt.translate(x, y);
    ctxt.rotate((Math.PI)/180 * this.direction);

    var shipSprite = new Image();
    //source : http://opengameart.org/content/spaceship-fighter-ipod1
    shipSprite.src = "img/ship_sprite.png";
    ctxt.drawImage(shipSprite, 0, 0, 100, 88, -25, 0, 50, 44);

    ctxt.restore();
  }

  Ship.prototype.relocate = function () {
    this.relocating = true;
    this.pos = [Asteroids.Game.DIM_X+100, Asteroids.Game.DIM_Y+100];
    this.vel=[0,0];

    if(!this.game.gameOver){
      window.setTimeout(function (){
        this.pos = [Asteroids.Game.DIM_X/2, Asteroids.Game.DIM_Y-25];
        this.relocating = false;
      }.bind(this), 500);
    };
  };

  Ship.prototype.power = function (x, y) {
    this.pos[0] += x * 5;
    this.pos[1] += y * 5;
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet (this.pos, [2, 2], this.direction, this.game);
    this.game.add(bullet);
  };

})();
