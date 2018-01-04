'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(evt);
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action(evt);
      }
    },

    getRandomCeil: function (number) {
      return Math.ceil(Math.random() * number);
    },

    getRandomFloor: function (minNumber, maxNumber) {
      return Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));
    },

    getRandomElem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getValuesFromOptions: function (selectField) {
      var optionsValues = [];
      for (var i = 0; i < selectField.options.length; i++) {
        optionsValues[i] = selectField.options[i].value;
      }
      return optionsValues;
    },

    checkArray: function (array1, array2) {
      if (array1 < array2) {
        return false;
      }
      for (var i = 0; i < array2.length; i++) {
        var value = array2[i];
        if (array1.indexOf(value) === -1) {
          return false;
        }
      }
      return true;
    },

    debounce: function (func, time) {
      var prevTimer;
      window.clearTimeout(prevTimer);
      prevTimer = window.setTimeout(func, time);
    }

  };
})();
