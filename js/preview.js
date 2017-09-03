'use strict';

(function () {
  var showGalleryOverlay = function () {
    var uploadOverlay = document.querySelector('.upload-overlay');
    uploadOverlay.classList.add('hidden');
  };

  window.preview = {
    showPhoto: function (elementNumber, photos) {
      showGalleryOverlay();

      var galleryOverlay = document.querySelector('.gallery-overlay');
      galleryOverlay.classList.remove('hidden');

      galleryOverlay.querySelector('.gallery-overlay-image').src = photos[elementNumber].url;
      galleryOverlay.querySelector('.likes-count').textContent = photos[elementNumber].likes;
      galleryOverlay.querySelector('.comments-count').textContent = photos[elementNumber].comment.length;
    }
  };
})();
