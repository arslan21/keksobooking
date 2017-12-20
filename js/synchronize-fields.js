'use strict';

(function () {
  window.syncValues = function (syncElement, syncValue) {
    syncElement.value = syncValue;
  };

  window.syncValuesMin = function (syncElement, syncValue) {
    syncElement.min = syncValue;
  };

  window.syncValuesMax = function (syncElement, syncValue) {
    syncElement.max = syncValue;
  };

  window.synchronizeFields = function (element, syncElement, valuesArr, syncValuesArr, callback) {
    element.addEventListener('change', function () {
      var syncValuesObj = {};
      for (var i = 0; i < valuesArr.length; i++) {
        syncValuesObj[valuesArr[i]] = syncValuesArr[i];
      }
      var value = element.value;
      var syncValue = syncValuesObj[value];
      callback(syncElement, syncValue);
    })
  };
})();
