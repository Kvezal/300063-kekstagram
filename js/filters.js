'use strict';

(function () {
  window.filters = {
    recommend: function (data) {
      return data.slice(0, 10);
    },

    popular: function (data) {
      return data.slice().sort(function (first, second) {
        return second.likes - first.likes;
      });
    },

    discussed: function (data) {
      return data.slice().sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
    },

    random: function (data) {
      return data.slice().sort(function () {
        return 0.5 - Math.random();
      });
    }
  };
})();
