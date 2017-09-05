'use strict';

(function () {
  window.picture = {
    create: function (photos, pattern, amount) {
      var photosBlock = document.createDocumentFragment();

      for (var i = 0; i < amount; i++) {
        var photoElement = pattern.cloneNode('true');
        photoElement.querySelector('img').src = photos[i].url;
        photoElement.querySelector('.picture-likes').textContent = photos[i].likes;
        photoElement.querySelector('.picture-comments').textContent = photos[i].comments.length;

        photosBlock.appendChild(photoElement);
      }

      return photosBlock;
    }
  };
})();
