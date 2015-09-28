(function() {
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (pos, game){
    window.Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR, game);
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "red";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctxt) {
    ctxt.fillStyle = this.color;

    var path = new Path2D();
    var x = this.pos[0];
    var y = this.pos[1];
    path.moveTo(x, y);
    path.lineTo(x + this.radius, y + this.radius);
    path.lineTo(x + this.radius, y - this.radius);

    ctxt.fill(path);      //try to get ship to rotate!!!
    // ctxt.rotate((Math.PI) * vel[0]);
  }

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse, lastDir, currentDir) {
    if(lastDir !== currentDir){
      this.vel[0] -= this.vel[0]/3;
      this.vel[1] -= this.vel[1]/3;
    };
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet (this.pos, this.vel, this.game);
    this.game.add(bullet);
  };

})();
