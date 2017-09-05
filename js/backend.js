'use strict';

(function () {
  var url = 'https://1510.dump.academy/kekstagram';

  var backendSetup = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      var errorMessage;

      switch (xhr.status) {
        case 200:
          successHandler(xhr.response);
          break;
        case 400:
          errorMessage = 'Неправильный запрос';
          break;
        case 401:
          errorMessage = 'Пользователь не авторизован';
          break;
        case 404:
          errorMessage = 'Ничего не найдено';
          break;

        default:
          errorMessage = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (errorMessage) {
        errorHandler(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    load: function (loadHandler, errorHandler) {
      var xhr = backendSetup(loadHandler, errorHandler);

      xhr.open('GET', url + '/data');
      xhr.send();
    },

    save: function (data, loadHandler, errorHandler) {
      var xhr = backendSetup(loadHandler, errorHandler);

      xhr.open('POST', url);
      xhr.send(data);
    },

    displayError: function (errorMessage) {
      var closeButtonClickHandler = function () {
        document.body.removeChild(errorDiv);

        closeButton.removeEventListener('click', closeButtonClickHandler);
      };

      var closeButtonKeydownHandler = function (evt) {
        if (evt.keyCode === window.utils.ENTER_KEYCODE) {
          document.body.removeChild(errorDiv);

          closeButton.removeEventListener('keydown', closeButtonClickHandler);
        }
      };

      var errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = errorMessage;

      var closeButton = document.createElement('button');
      closeButton.classList.add('error-message__button');

      closeButton.addEventListener('click', closeButtonClickHandler);
      closeButton.addEventListener('keydown', closeButtonKeydownHandler, closeButtonClickHandler);

      errorDiv.appendChild(closeButton);
      document.body.appendChild(errorDiv);
    }
  };
})();
