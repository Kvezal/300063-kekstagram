'use strict';

(function () {
  var showGalleryOverlay = function () {
    galleryOverlay.classList.remove('hidden');

    closePreview.addEventListener('keydown', closePreviewEnterPressHandler);
    document.addEventListener('keydown', documentEscPressHandler);
  };

  var documentEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, hiddenGalleryOverlay);
  };

  var closePreviewClickHandler = function () {
    hiddenGalleryOverlay();
  };

  var closePreviewEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, hiddenGalleryOverlay);
  };

  var hiddenGalleryOverlay = function () {
    galleryOverlay.classList.add('hidden');

    closePreview.removeEventListener('keydown', closePreviewEnterPressHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
  };

  var galleryOverlay = document.querySelector('.gallery-overlay');

  var closePreview = galleryOverlay.querySelector('.gallery-overlay-close');
  closePreview.addEventListener('click', closePreviewClickHandler);

  window.preview = {
    showPhoto: function (elementNumber, photos) {
      showGalleryOverlay();

      galleryOverlay.querySelector('.gallery-overlay-image').src = photos[elementNumber].url;
      galleryOverlay.querySelector('.likes-count').textContent = photos[elementNumber].likes;
      galleryOverlay.querySelector('.comments-count').textContent = photos[elementNumber].comment.length;
    }
  };
})();
