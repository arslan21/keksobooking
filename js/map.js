'use strict';

(function () {
  var hotelList = window.data.getHotelList();

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');

  var noticeBlock = document.querySelector('.notice');
  var noticeForm = noticeBlock.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  var typeField = noticeForm.querySelector('#type');
  var typeSelectedValue = typeField.options[typeField.selectedIndex].value;

  function insertPins() {
    var mapPinsLength = mapPins.children.length;
    for (var p = mapPinsLength; p > 0; p--) {
      if (mapPins.children[mapPinsLength - 1].classList === 'map__pin' || mapPins.children[mapPinsLength - 1].classList === 'map__pin map__pin--active') {
        mapPins.children[mapPinsLength - 1].remove();
        mapPinsLength--;
      }
    }
    var fragment = document.createDocumentFragment();
    for (var l = 0; l < hotelList.length; l++) {
      var pinForInsert = window.pin.renderPin(hotelList[l]);
      fragment.appendChild(pinForInsert);
    }
    mapPins.appendChild(fragment);
  }

  function activateNotice() {
    noticeForm.classList.remove('notice__form--disabled');
    for (var f = 0; f < noticeFields.length; f++) {
      noticeFields[f].disabled = false;
    }
    map.classList.remove('map--faded');
  }

  mapPinMain.addEventListener('mouseup', function () {
    activateNotice();
    insertPins();
    window.form.disabeledCapacityOptions();
    window.form.setPriceRange(typeSelectedValue);
  });
})();
