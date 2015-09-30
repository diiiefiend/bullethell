(function() {
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (pos, game){
    window.Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR, game);
    this.direction = 0;     //direction ship is pointing in
  };

  Ship.RADIUS = 15;
  Ship.SQUARE = 10;
  Ship.COLOR = "red";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctxt) {
    ctxt.fillStyle = this.color;

    ctxt.save();

    var x = this.pos[0];
    var y = this.pos[1];
    ctxt.translate(x, y);
    ctxt.rotate((Math.PI)/180 * this.direction);

    var path = new Path2D();
    path.moveTo(0, 0);
    path.lineTo(this.radius, this.radius);
    path.lineTo(-this.radius, +this.radius);
    ctxt.fill(path);

    ctxt.fillStyle = "red";
    ctxt.fillRect(-Ship.SQUARE/2, -Ship.SQUARE, Ship.SQUARE, Ship.SQUARE);

    ctxt.restore();

    ctxt.font = "16px serif";
    ctxt.fillStyle = "blue";
    ctxt.fillText("direction: "+this.direction, 50, 50);
    ctxt.fillText("vel[0]: "+this.vel[0], 50, 70);
    ctxt.fillText("vel[1]: "+this.vel[1], 50, 90);
  }

  Ship.prototype.relocate = function () {
    this.pos = [Asteroids.Game.DIM_X+100, Asteroids.Game.DIM_Y+100];
    this.vel=[0,0];

    window.setTimeout(function (){
      this.pos = [Asteroids.Game.DIM_X/2, Asteroids.Game.DIM_Y/2];
    }.bind(this), 500);
  };

  Ship.prototype.power = function (impulse, lastDir, currentDir) {
    if(lastDir !== currentDir){
      this.vel[0] -= this.vel[0]/3;
      this.vel[1] -= this.vel[1]/3;
    };

    var dir = this.direction * (Math.PI/180);

    this.vel[0] += impulse * -1 * Math.sin(dir);
    this.vel[1] += impulse * Math.cos(dir);
  };

  Ship.prototype.turn = function (deltaDir) {
    var newDir = this.direction + deltaDir;
    this.direction = (newDir >= 360 || newDir <= -360) ? newDir % 360 : newDir;
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet (this.pos, this.vel, this.direction, this.game);
    this.game.add(bullet);
  };

})();
