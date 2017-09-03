'use strict';

(function () {
  var photos = window.data.generatePhotos(25).sort(function () {
    return 0.5 - Math.random();
  });

  var pictureTemplate = document.querySelector('#picture-template').content;

  var picturesFragment = window.picture.create(photos, pictureTemplate, photos.length);

  var pictures = document.querySelector('.pictures');
  pictures.appendChild(picturesFragment);

  var galleryClickHandler = function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG') {
      var urlImage = target.src;
      var imageAddress = urlImage.slice(urlImage.indexOf('photos'));

      photos.some(function (item, index) {
        if (item.url === imageAddress) {
          window.preview.showPhoto(index, photos);
        }
      });
    }

    evt.preventDefault();
  };

  var gallery = document.querySelector('.pictures');
  gallery.addEventListener('click', galleryClickHandler);

  var images = gallery.querySelectorAll('.picture img');
  [].forEach.call(images, function (item) {
    item.parentElement.tabIndex = -1;
    item.tabIndex = 0;
  });
})();
