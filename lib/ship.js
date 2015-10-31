(function() {
  window.BHGame = window.BHGame || {};

  var Ship = window.BHGame.Ship = function (pos, game){
    var spriteOptions = [
      0, 0,
      100, 88,
      -25, -22,
      50, 44
    ];

    this.direction = 0;     //direction ship is pointing in
    window.BHGame.MovingObject.call(this,
      pos,
      [0,0],
      Ship.RADIUS,
      Ship.COLOR,
      game,
      spriteOptions,
      this.direction);
    this.isBounded = true;
    this.relocating = false;
    this.invincible = false;
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "red";
  Ship.MAXSPEED = 7;

  BHGame.Util.inherits(Ship, BHGame.MovingObject);

  Ship.prototype.draw = function (ctxt) {
    var img = window.BHGame.Resources.get('img/ship_sprite.png');
    window.BHGame.MovingObject.prototype.render.call(this, ctxt, img);

    // for debugging the hitbox
    // window.BHGame.MovingObject.prototype.draw.call(this, ctxt);
  }

  Ship.prototype.collideWith = function (otherObject){
    if (otherObject instanceof window.BHGame.EnemyBullet){
      if(!this.invincible){
        this.game.deaths += 1;
        this.relocate();
        if(this.game.deaths >= 3){
          this.game.gameOver = true;
        };
      };
    };
  };

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
        this.alpha = 0.5;

        window.setTimeout( function (){
          this.invincible = false;
          this.alpha = 1;
        }.bind(this), 1000);
      }.bind(this), 500);
    };
  };

  Ship.prototype.power = function (x, y) {
    this.pos[0] += x * 5;
    this.pos[1] += y * 5;
  };

  Ship.prototype.fireBullet = function () {
    document.getElementById('shootFX').play();
    var bullet = new window.BHGame.Bullet (this.pos,
      [5, 5],
      this.direction,
      this.game);
    this.game.add(bullet);
  };

})();
