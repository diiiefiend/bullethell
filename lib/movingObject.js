(function () {
  window.BHGame = window.BHGame || {};

  var MovingObject = window.BHGame.MovingObject = function (pos, vel, radius, color, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.isBounded = false;
    this.game = game || {};
  };

  MovingObject.prototype.draw = function (ctxt) {
    // ctxt.fillStyle = this.color;
    ctxt.strokeStyle = this.color;
    ctxt.beginPath();

    ctxt.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctxt.stroke();
    // ctxt.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.isBounded){
      if(!(this instanceof window.BHGame.Ship && this.relocating)){
        this.pos = this.game.bound(this.pos);
      };
    } else {
      if(this.game.isOutOfBounds(this.pos, this)){
        this.game.remove(this);
      };
    };
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var x = this.pos[0];
    var y = this.pos[1];
    var otherX = otherObject.pos[0];
    var otherY = otherObject.pos[1];

    var dist = Math.sqrt(Math.pow(x - otherX, 2) + Math.pow(y - otherY, 2));

    return (this.radius + otherObject.radius) >= (dist);
  };

  MovingObject.prototype.collideWith = function (otherObject){
  }
})();
