'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEnterEvent: function(evt, action, secondAction, secondParam) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(evt);
        secondAction(secondParam)
      }
    },
    isEscEvent: function(evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action(evt);
      }
    },
    getRandomCeil: function (number) {
      return Math.ceil(Math.random() * number)
    },
    getRandomFloor: function (minNumber, maxNumber) {
      return Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));
    },
    getRandomElem: function (array) {
      return array[Math.floor(Math.random() * array.length)]
    }
  };
})();
