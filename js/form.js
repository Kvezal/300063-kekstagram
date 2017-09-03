'use strict';

(function () {
  var documentEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, hiddenUploadOverlay);
  };

  var showUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');

    document.addEventListener('keydown', documentEscPressHandler);
    uploadFormCancel.addEventListener('keydown', uploadFormCancelEnterPressHandler);
  };

  var hiddenUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');

    document.removeEventListener('keydown', documentEscPressHandler);
    uploadFormCancel.removeEventListener('keydown', uploadFormCancelEnterPressHandler);

    uploadForm.reset();
  };

  var formSubmitHandler = function (evt) {
    if (uploadFormDescription.value.length >= 30) {
      uploadFormDescription.value = '';
      evt.preventDefault();
    }
  };

  var uploadForm = document.querySelector('#upload-select-image');
  uploadForm.addEventListener('submit', formSubmitHandler);

  var uploadFileChangeHandler = function () {
    showUploadOverlay();
  };

  var uploadFile = uploadForm.querySelector('#upload-file');
  uploadFile.addEventListener('change', uploadFileChangeHandler);

  var uploadOverlay = uploadForm.querySelector('.upload-overlay');

  var uploadFormCancelClickHandler = function () {
    hiddenUploadOverlay();
  };

  var uploadFormCancelEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, hiddenUploadOverlay);
  };

  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  uploadFormCancel.addEventListener('click', uploadFormCancelClickHandler);

  var fieldFocusHandler = function () {
    document.removeEventListener('keydown', documentEscPressHandler);
  };

  var fieldFocusoutHandler = function () {
    document.addEventListener('keydown', documentEscPressHandler);
  };

  var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');
  uploadFormHashtags.addEventListener('focus', fieldFocusHandler);
  uploadFormHashtags.addEventListener('focusout', fieldFocusoutHandler);

  var uploadFormDescription = uploadForm.querySelector('.upload-form-description');
  uploadFormDescription.addEventListener('focus', fieldFocusHandler);
  uploadFormDescription.addEventListener('focusout', fieldFocusoutHandler);
})();
