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

  window.synchronizeFields = function (element, SyncElement, valuesArr, syncValuesArr, callback) {
    var syncValuesObj = {};
    for (var i = 0; i < valuesArr.length; i++) {
      syncValuesObj[valuesArr[i]] = syncValuesArr[i];
    }
    var value = element.value;
    var syncValue = syncValuesObj[value];
    callback(SyncElement, syncValue);
  };
})();
