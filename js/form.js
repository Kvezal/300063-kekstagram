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
    resetCurrentEffect();
  };

  var checkUploadFormHashtags = function () {
    var hashtags = uploadFormHashtags.value.split(' ');
    var hashtagsLength = hashtags.length;

    return hashtags.some(function (item, index) {
      for (var i = index + 1; i < hashtagsLength; i++) {
        return hashtags[i] === item;
      }

      return false;
    });
  };

  var formSubmitHandler = function (evt) {
    if (uploadFormDescription.value.length >= 30 && uploadFormHashtags.validity.valid && !checkUploadFormHashtags()) {
      hiddenUploadOverlay();

      resizeImage(effectImagePreview, +uploadResizeControlsValue.value.replace(/%/, ''));
    }

    evt.preventDefault();
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

  var resetCurrentEffect = function () {
    if (effectImagePreview.classList.contains(currentEffect)) {
      effectImagePreview.classList.remove(currentEffect);
    }
  };

  var applyEffectImagePreview = function (elem) {
    resetCurrentEffect();

    currentEffect = 'effect-' + elem.value;
    effectImagePreview.classList.add(currentEffect);
  };

  var checkLimits = function (currentValue, minValue, maxValue) {
    if (currentValue >= maxValue) {
      return maxValue;
    }

    if (currentValue <= minValue) {
      return minValue;
    }

    return currentValue;
  };

  var resizeImage = function (image, value) {
    image.style.transform = 'scale(' + value / 100 + ')';
  };

  var changeUploadResizeControlsValue = function (target) {
    var resultValue;
    var valueField = +uploadResizeControlsValue.value.replace(/%/, '');
    var stepField = +uploadResizeControlsValue.step.replace(/%/, '');
    var minValueField = +uploadResizeControlsValue.min.replace(/%/, '');
    var maxValueField = +uploadResizeControlsValue.max.replace(/%/, '');

    switch (target.textContent) {
      case '–':
        resultValue = valueField - stepField;
        break;
      case '+':
        resultValue = valueField + stepField;
        break;
    }

    resultValue = checkLimits(resultValue, minValueField, maxValueField);

    resizeImage(effectImagePreview, resultValue);

    uploadResizeControlsValue.value = resultValue + '%';
  };

  var uploadEffectClickHandler = function (evt) {
    if (evt.target.tagName === 'INPUT' && evt.target.type === 'radio') {
      applyEffectImagePreview(evt.target);
    }

    if (evt.target.classList.contains('upload-resize-controls-button')) {
      changeUploadResizeControlsValue(evt.target);
    }
  };

  var uploadEffectKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      if (evt.target.tagName === 'LABEL') {
        var input = uploadEffect.querySelector('#' + evt.target.htmlFor);

        if (input.type === 'radio') {
          applyEffectImagePreview(input);
        }
      }

      if (evt.target.classList.contains('upload-resize-controls-button')) {
        changeUploadResizeControlsValue(evt.target);
      }
    }
  };

  var uploadEffect = document.querySelector('.upload-effect');
  var effectImagePreview = uploadEffect.querySelector('.effect-image-preview');

  var currentEffect = '';
  uploadEffect.addEventListener('click', uploadEffectClickHandler);
  uploadEffect.addEventListener('keydown', uploadEffectKeydownHandler);

  var uploadResizeControlsValue = uploadEffect.querySelector('.upload-resize-controls-value');
})();
