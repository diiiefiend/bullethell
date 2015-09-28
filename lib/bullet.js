(function () {
  window.Asteroids = window.Asteroids || {};

  var Bullet = window.Asteroids.Bullet = function (pos, vel, game) {
    var vel1 = []

    if (vel[0] > 0){
      vel1[0] = vel[0] + 2;
    }else if (vel[0] < 0){
      vel1[0] = vel[0] - 2;
    }else{
      vel1[0] = vel[0];
    };

    if (vel[1] > 0){
      vel1[1] = vel[1] + 2;
    }else if (vel[1] < 0){
      vel1[1] = vel[1] - 2;
    }else{
      vel1[1] = vel[1];
    };

    window.Asteroids.MovingObject.call(this, pos, [vel1[0], vel1[1]], Bullet.RADIUS, Bullet.COLOR, game);

    this.isWrappable = false;
  };

  Bullet.RADIUS = 3;
  Bullet.COLOR = "yellow";

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

})();
