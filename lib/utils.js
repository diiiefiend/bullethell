(function () {
  window.BHGame = window.BHGame || {};
  window.BHGame.Util = {};  //new namespace

  var inherits = window.BHGame.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate ();
  };

  var sign = window.BHGame.Util.sign = function (num){
    return num > 0 ? 1 : num < 0 ? -1 : 0;
  };
})();
