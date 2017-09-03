'use strict';

(function () {

  window.utils = {
    generateIntegerNumber: function (minNumber, maxNumber) {
      return Math.floor((maxNumber - minNumber + 1) * Math.random()) + minNumber;
    }
  };
})();
