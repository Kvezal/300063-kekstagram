'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  var randeringPhotos = function (photos) {
    while (pictures.firstChild) {
      pictures.removeChild(pictures.firstChild);
    }

    var picturesFragment = window.picture.create(photos, pictureTemplate, photos.length);

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
  };

  var filtersBlockClickHandler = function (evt) {
    var target = evt.target;

    if (!target.classList.contains('filters-radio')) {
      return;
    }

    window.debounce(function () {
      randeringPhotos(window.filters[target.value](photos));
    });
  };

  var filterPhotos = function () {
    var filtersBlock = document.querySelector('.filters');
    filtersBlock.classList.remove('hidden');

    filtersBlock.addEventListener('click', filtersBlockClickHandler);
  };

  var seccessHandler = function (data) {
    photos = data;
    randeringPhotos(data);
    filterPhotos();
  };

  var photos;
  window.backend.load(seccessHandler, window.backend.displayError);

  var pictureTemplate = document.querySelector('#picture-template').content;
})();
