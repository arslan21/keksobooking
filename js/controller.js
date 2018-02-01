'use strict';

(function () {
  window.form.initFields();
  window.map.initialize();

  window.controller = {
    placeNotice: function () {
      window.form.activateNotice();
      window.drag.dragPin();
      window.form.setAddress();
      window.form.disabeledCapacityOptions();
    }
  };
})();
