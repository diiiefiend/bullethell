(function () {
  window.Asteroids = window.Asteroids || {};
  window.Asteroids.Util = {};  //new namespace

  var inherits = window.Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate ();
  };

  var sign = window.Asteroids.Util.sign = function (num){
    return num > 0 ? 1 : num < 0 ? -1 : 0;
  };
})();
