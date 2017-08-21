'use strict';

var PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var generateIntegerNumber = function (minNumber, maxNumber) {
  return Math.floor((maxNumber - minNumber + 1) * Math.random()) + minNumber;
};

var checkSimilarityPhotoComments = function (generatedPhoto, newPhotos) {
  for (var i = 0, newPhotosLength = newPhotos.length; i < newPhotosLength; i++) {
    if (newPhotos[i].comment === generatedPhoto.comment) {
      return true;
    }
  }

  return false;
};

var generateComment = function (maxNumberOfPhrases) {
  var maxNumber = PHOTO_COMMENTS.length - 1;

  var resultComment = [];
  var amountPhrases = generateIntegerNumber(1, maxNumberOfPhrases);

  for (var i = 0; i < amountPhrases; i++) {
    var comment = '';

    if (!resultComment.length) {
      comment += PHOTO_COMMENTS[generateIntegerNumber(0, maxNumber)];
    } else {
      comment += PHOTO_COMMENTS[generateIntegerNumber(0, maxNumber)];
    }

    if (resultComment.indexOf(comment) !== -1) {
      i--;
      continue;
    }

    resultComment[i] = comment;
  }

  return resultComment;
};

var generatePhotos = function (amount) {
  var photosList = [];

  for (var i = 0; i < amount; i++) {
    var photo = {
      'url': 'photos/' + (i + 1) + '.jpg',
      'likes': generateIntegerNumber(15, 200),
      'comment': generateComment(2)
    };

    if (checkSimilarityPhotoComments(photo, photosList)) {
      i--;
      continue;
    }

    photosList[i] = photo;
  }

  return photosList;
};

var createPictures = function (photos, pattern, amount) {
  var photosBlock = document.createDocumentFragment();

  for (var i = 0; i < amount; i++) {
    var photoElement = pattern.cloneNode('true');
    photoElement.querySelector('img').src = photos[i].url;
    photoElement.querySelector('.picture-likes').textContent = photos[i].likes;
    photoElement.querySelector('.picture-comments').textContent = photos[i].comment.length;

    photosBlock.appendChild(photoElement);
  }

  return photosBlock;
};

var showGalleryOverlay = function (elementNumber) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.remove('hidden');

  galleryOverlay.querySelector('.gallery-overlay-image').src = photos[0].url;
  galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes;
  galleryOverlay.querySelector('.comments-count').textContent = photos[0].comment.length;
};

var photos = generatePhotos(25).sort(function () {
  return 0.5 - Math.random();
});

var pictureTemplate = document.querySelector('#picture-template').content;

var picturesFragment = createPictures(photos, pictureTemplate, photos.length);
var pictures = document.querySelector('.pictures');
pictures.appendChild(picturesFragment);

var uploadOverlay = document.querySelector('.upload-overlay');
uploadOverlay.classList.add('hidden');

showGalleryOverlay(0);
