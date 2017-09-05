'use strict';

(function () {
  var FILTERS = {
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
  };

  var documentEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, hiddenUploadOverlay);
  };

  var showUploadOverlay = function () {
    window.utils.showElement(uploadOverlay);

    document.addEventListener('keydown', documentEscPressHandler);
    uploadFormCancel.addEventListener('keydown', uploadFormCancelEnterPressHandler);
  };

  var hiddenUploadOverlay = function () {
    document.removeEventListener('keydown', documentEscPressHandler);
    uploadFormCancel.removeEventListener('keydown', uploadFormCancelEnterPressHandler);

    uploadForm.reset();
    resizeImage(effectImagePreview, 100);

    pinPositionX = uploadEffectLevelLine['offsetWidth'];
    window.initializeScale(uploadEffectLevelPin, setValueScale);

    var uploadEffectNone = uploadEffect.querySelector('#upload-effect-none');
    window.initializeFilter(uploadEffectNone, applyEffectImagePreview);

    window.utils.hiddenElement(uploadOverlay);
  };

  var checkUniquenessHashtags = function () {
    var hashtags = uploadFormHashtags.value.split(' ');
    var hashtagsLength = hashtags.length;

    return !hashtags.some(function (item, index) {
      for (var i = index + 1; i < hashtagsLength; i++) {
        return hashtags[i] === item;
      }

      return false;
    });
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();

    if (!(uploadFormDescription.value.length >= 30)) {
      return;
    }

    if (!uploadFormHashtags.validity.valid) {
      return;
    }

    if (!checkUniquenessHashtags()) {
      return;
    }

    uploadFormHashtags.removeEventListener('change', fieldChangeHandler);
    uploadFormDescription.removeEventListener('change', fieldChangeHandler);

    hiddenUploadOverlay();

    resizeImage(effectImagePreview, +uploadResizeControlsValue.value.replace(/%/, ''));
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

  var fieldInvalidHandler = function (evt) {
    if (!evt.target.validity.valid) {
      evt.target.style.outline = '2px solid #ff0000';
      evt.target.addEventListener('change', fieldChangeHandler);
    }
  };

  var fieldChangeHandler = function (evt) {
    if (evt.target.validity.valid) {
      evt.target.style.outline = '';
    } else {
      evt.target.style.outline = '2px solid #ff0000';
    }
  };

  var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');
  uploadFormHashtags.addEventListener('focus', fieldFocusHandler);
  uploadFormHashtags.addEventListener('focusout', fieldFocusoutHandler);
  uploadFormHashtags.addEventListener('invalid', fieldInvalidHandler);

  var uploadFormDescription = uploadForm.querySelector('.upload-form-description');
  uploadFormDescription.addEventListener('focus', fieldFocusHandler);
  uploadFormDescription.addEventListener('focusout', fieldFocusoutHandler);
  uploadFormDescription.addEventListener('invalid', fieldInvalidHandler);

  var resetCurrentEffect = function () {
    if (effectImagePreview.classList.contains(currentEffect)) {
      effectImagePreview.classList.remove(currentEffect);
    }
  };

  var changeFilter = function (effect, value) {
    var effectValue;

    switch (effect) {
      case 'phobos':
        effectValue = FILTERS[effect] + '(' + (3 * value) + 'px)';
        break;
      case 'heat':
        effectValue = FILTERS[effect] + '(' + (3 * value) + ')';
        break;
      case 'none':
        effectValue = '';
        window.utils.hiddenElement(uploadEffectLevel);
        break;

      default:
        effectValue = FILTERS[effect] + '(' + (1 * value) + ')';
        break;
    }

    effectImagePreview.style.filter = effectValue;
    pinPositionX = uploadEffectLevelLine['offsetWidth'];
  };

  var applyEffectImagePreview = function (elem) {
    currentRadio = elem.value;

    resetCurrentEffect();

    currentEffect = 'effect-' + currentRadio;

    window.utils.showElement(uploadEffectLevel);

    changeFilter(currentRadio, 1);

    if (currentRadio === 'none') {
      currentEffect = '';
      return;
    }
    effectImagePreview.classList.add(currentEffect);

    window.initializeScale(uploadEffectLevelPin, setValueScale);
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

    if (value === 100) {
      image.style.transform = '';
    }
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
      window.initializeFilter(evt.target, applyEffectImagePreview);
    }

    if (evt.target.classList.contains('upload-resize-controls-button')) {
      window.initializeScale(evt.target, changeUploadResizeControlsValue);
    }
  };

  var uploadEffectKeyDownHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      if (evt.target.tagName === 'LABEL') {
        var input = uploadEffect.querySelector('#' + evt.target.htmlFor);

        if (input.type === 'radio') {
          window.initializeFilter(input, applyEffectImagePreview);
        }
      }
    }
  };

  var uploadEffect = document.querySelector('.upload-effect');
  var effectImagePreview = uploadEffect.querySelector('.effect-image-preview');

  var currentEffect = '';
  var currentRadio = 'none';

  uploadEffect.addEventListener('click', uploadEffectClickHandler);
  uploadEffect.addEventListener('keydown', uploadEffectKeyDownHandler);

  var uploadResizeControlsValue = uploadEffect.querySelector('.upload-resize-controls-value');

  var setScaleWidth = function (scale, value, maxValue) {
    var scaleValue = value / maxValue;

    scale.style.width = scaleValue * 100 + '%';

    return scaleValue;
  };

  var setPinPosition = function (elem, position) {
    var minLocationPositionX = 0;
    var maxLocationPositionX = uploadEffectLevelLine.offsetWidth;

    elem.style.left = position + 'px';

    if (elem.offsetLeft < minLocationPositionX) {
      position = 0;
    }

    if (elem.offsetLeft > maxLocationPositionX) {
      position = maxLocationPositionX;
    }

    elem.style.left = position + 'px';

    var scaleValue = setScaleWidth(uploadEffectLevelVal, position, maxLocationPositionX);
    changeFilter(currentRadio, scaleValue);
  };

  var uploadEffectLevel = uploadEffect.querySelector('.upload-effect-level');
  var uploadEffectLevelLine = uploadEffectLevel.querySelector('.upload-effect-level-line');

  var pinPositionX = uploadEffectLevelLine['offsetWidth'];

  var setValueScale = function (elem) {
    setPinPosition(elem, pinPositionX);
  };

  var uploadEffectLevelVal = uploadEffectLevel.querySelector('.upload-effect-level-val');
  var uploadEffectLevelPin = uploadEffectLevelLine.querySelector('.upload-effect-level-pin');
  uploadEffectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      evt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;

      startCoordsX = moveEvt.clientX;

      pinPositionX = uploadEffectLevelPin.offsetLeft - shiftX;

      window.initializeScale(uploadEffectLevelPin, setValueScale);
    };

    var mouseUpHandler = function (upEvt) {
      evt.preventDefault();

      uploadEffect.removeEventListener('mousemove', mouseMoveHandler);
      uploadEffect.removeEventListener('mouseup', mouseUpHandler);
    };

    uploadEffect.addEventListener('mousemove', mouseMoveHandler);
    uploadEffect.addEventListener('mouseup', mouseUpHandler);
  });
})();
