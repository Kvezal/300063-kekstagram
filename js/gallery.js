'use strict';

(function () {
  var photos = window.data.generatePhotos(25).sort(function () {
    return 0.5 - Math.random();
  });

  var pictureTemplate = document.querySelector('#picture-template').content;

  var picturesFragment = window.picture.create(photos, pictureTemplate, photos.length);

  var pictures = document.querySelector('.pictures');
  pictures.appendChild(picturesFragment);

  window.preview.showPhoto(0, photos);
})();
