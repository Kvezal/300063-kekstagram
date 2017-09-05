'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,

    generateIntegerNumber: function (minNumber, maxNumber) {
      return Math.floor((maxNumber - minNumber + 1) * Math.random()) + minNumber;
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    hiddenElement: function (elem) {
      if (!elem.classList.contains('hidden')) {
        elem.classList.add('hidden');
      }
    },

    showElement: function (elem) {
      if (elem.classList.contains('hidden')) {
        elem.classList.remove('hidden');
      }
    }
  };
})();
