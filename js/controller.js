'use strict';

(function () {
  window.form.initFields();
  window.map.initialize();

  window.controller = {
    placeNotice: function (evt, address) {
      window.form.activateNotice();
      window.form.setAddress(address);
      window.form.disabeledCapacityOptions();
    }
  };
})();
