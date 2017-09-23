'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

  var uploadPhoto = function (field, callback) {
    var fieldChangeHandler = function () {
      var file = field.files[0];
      var fileName = file.name.toLowerCase();
      var fileFormat = fileName.slice(fileName.lastIndexOf('.') + 1);

      var matches = FILE_TYPES.some(function (item) {
        return fileFormat === item;
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          callback(reader);
        });

        reader.readAsDataURL(file);
      }
    };

    field.addEventListener('change', fieldChangeHandler);
  };

  window.uploadPhoto = uploadPhoto;
})();
