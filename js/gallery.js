'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  var randeringPhotos = function (photos) {
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
  };

  var randeringFilters = function (photos) {
    var filtersBlock = document.querySelector('.filters');
    filtersBlock.classList.remove('hidden');

    filtersBlock.addEventListener('click', function (evt) {
      var target = evt.target;

      if (!target.classList.contains('filters-radio')) {
        return;
      }
      while (pictures.firstChild) {
        pictures.removeChild(pictures.firstChild);
      }
      randeringPhotos(window.filters[target.value](photos));
    });
  };

  var seccessHandler = function (data) {
    randeringPhotos(data);
    randeringFilters(data);
  };

  window.backend.load(seccessHandler, window.backend.displayError);

  var pictureTemplate = document.querySelector('#picture-template').content;
})();
