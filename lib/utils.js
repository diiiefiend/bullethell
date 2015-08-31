(function () {
  window.Asteroids = window.Asteroids || {};
  window.Asteroids.Util = {};  //new namespace
  
  var inherits = window.Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate ();
  }
})();
