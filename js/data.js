'use strict';

(function () {
  var PHOTO_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

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
    var amountPhrases = window.utils.generateIntegerNumber(1, maxNumberOfPhrases);

    for (var i = 0; i < amountPhrases; i++) {
      var comment = PHOTO_COMMENTS[window.utils.generateIntegerNumber(0, maxNumber)];

      if (resultComment.indexOf(comment) !== -1) {
        i--;
        continue;
      }

      resultComment[i] = comment;
    }

    return resultComment;
  };

  window.data = {
    generatePhotos: function (amount) {
      var photosList = [];

      for (var i = 0; i < amount; i++) {
        var photo = {
          'url': 'photos/' + (i + 1) + '.jpg',
          'likes': window.utils.generateIntegerNumber(15, 200),
          'comment': generateComment(2)
        };

        if (checkSimilarityPhotoComments(photo, photosList)) {
          i--;
          continue;
        }

        photosList[i] = photo;
      }

      return photosList;
    }

//    photos: generatePhotos(25).sort(function () {
//      return 0.5 - Math.random();
//    })
  };
})();
