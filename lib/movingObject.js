(function () {
  window.BHGame = window.BHGame || {};

  var MovingObject = window.BHGame.MovingObject = function (pos, vel, radius, color, game, spriteDetails, direction) {
    this.pos = pos;

    this.vel = vel;

    this.radius = radius;
    this.color = color;
    this.alpha = 1;
    this.isBounded = false;
    this.game = game || {};

    this.direction = direction || 0;

    if(spriteDetails){
      this.imgX = spriteDetails[0];
      this.imgY = spriteDetails[1];
      this.imgWidth = spriteDetails[2];
      this.imgHeight = spriteDetails[3];
      this.drawX = spriteDetails[4];
      this.drawY = spriteDetails[5];
      this.drawWidth = spriteDetails[6];
      this.drawHeight = spriteDetails[7];

      this.numberOfFrames = spriteDetails[8] || 1;
      this.ticksPerFrame = spriteDetails[9] || 1;
      this.once = spriteDetails[10] || false;
      this.explosionSize = spriteDetails[11] || "med";
    };

    this.frameIndex = 0;
    this.tickCount = 0;
    this.done = false;
  };

  MovingObject.prototype.draw = function (ctxt) {
    ctxt.save();
    ctxt.globalAlpha = this.alpha;
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
    ctxt.restore();
  };

  MovingObject.prototype.render = function (ctxt, img) {
    ctxt.save();
    ctxt.globalAlpha = this.alpha;

    ctxt.translate(this.pos[0], this.pos[1]);
    ctxt.rotate((Math.PI)/180 * this.direction);

    var img = img;

    ctxt.drawImage(img,
      this.frameIndex * this.imgWidth / this.numberOfFrames,
      this.imgY,
      this.imgWidth / this.numberOfFrames,
      this.imgHeight,
      this.drawX,
      this.drawY,
      this.drawWidth,
      this.drawHeight);

    ctxt.restore();
  };

  MovingObject.prototype.update = function (dt) {
    this.tickCount++;

    if(this.tickCount > this.ticksPerFrame){
      this.tickCount = 0;
      if(this.frameIndex < this.numberOfFrames - 1){
        this.frameIndex++;
      } else {
        if(this.once){
          this.done = true;
        } else {
          this.frameIndex = 0;
        };
      };
    };
  };

  MovingObject.prototype.move = function (dt) {
    var speed = [];

    speed[0] = this.vel[0] * 75;
    speed[1] = this.vel[1] * 75;

    this.pos[0] += speed[0] * dt;
    this.pos[1] += speed[1] * dt;

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
