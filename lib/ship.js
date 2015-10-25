(function() {
  window.BHGame = window.BHGame || {};

  var Ship = window.BHGame.Ship = function (pos, game){
    window.BHGame.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR, game);
    this.direction = 0;     //direction ship is pointing in
    this.isBounded = true;
    this.relocating = false;
    this.invincible = false;
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "red";
  Ship.MAXSPEED = 7;

  BHGame.Util.inherits(Ship, BHGame.MovingObject);

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
    ctxt.drawImage(shipSprite, 0, 0, 100, 88, -25, -22, 50, 44);

    // for debugging the hitbox
    // ctxt.strokeStyle = this.color;
    // ctxt.beginPath();
    //
    // ctxt.arc(
    //   0, 0, this.radius, 0, 2 * Math.PI, false
    // );
    //
    // ctxt.stroke();

    //add animated thrusters sprite behind ship

    ctxt.restore();
  }

  Ship.prototype.relocate = function () {
    this.relocating = true;
    var lastPos = this.pos;

    this.pos = [BHGame.Game.DIM_X+100, BHGame.Game.DIM_Y+100];
    this.vel=[0,0];

    if(!this.game.gameOver){
      window.setTimeout( function (){
        this.pos = lastPos;
        this.relocating = false;
        this.invincible = true;

        window.setTimeout( function (){
          this.invincible = false;
        }.bind(this), 1000);
        //figure out a way to indicate visually invincibility frames
      }.bind(this), 500);
    };
  };

  Ship.prototype.power = function (x, y) {
    this.pos[0] += x * 5;
    this.pos[1] += y * 5;
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new window.BHGame.Bullet (this.pos, [2, 2], this.direction, this.game);
    this.game.add(bullet);
  };

})();
