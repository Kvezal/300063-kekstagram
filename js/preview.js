'use strict';

(function () {
  var showGalleryOverlay = function () {
    window.utils.showElement(galleryOverlay);

    closePreview.addEventListener('keydown', closePreviewEnterPressHandler);
    document.addEventListener('keydown', documentEscPressHandler);
  };

  var hiddenGalleryOverlay = function () {
    window.utils.hiddenElement(galleryOverlay);

    closePreview.removeEventListener('keydown', closePreviewEnterPressHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
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

  var galleryOverlay = document.querySelector('.gallery-overlay');

  var closePreview = galleryOverlay.querySelector('.gallery-overlay-close');
  closePreview.addEventListener('click', closePreviewClickHandler);

  var fileChooser = document.querySelector('#upload-file');
  var previewImages = document.querySelector('.effect-image-preview');
  var effectImages = document.querySelectorAll('.upload-effect-preview');

  var addAvatarPhoto = function (reader) {
    previewImages.src = reader.result;
    Array.prototype.forEach.call(effectImages, function (item) {
      item.style.backgroundImage = 'url(' + reader.result + ')';
    });
  };

  window.uploadPhoto(fileChooser, addAvatarPhoto);

  window.preview = {
    showPhoto: function (elementNumber, photos) {
      showGalleryOverlay();

      galleryOverlay.querySelector('.gallery-overlay-image').src = photos[elementNumber].url;
      galleryOverlay.querySelector('.likes-count').textContent = photos[elementNumber].likes;
      galleryOverlay.querySelector('.comments-count').textContent = photos[elementNumber].comments.length;
    }
  };
})();
