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

  var addressField = noticeForm.querySelector('#address');

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

  function getAddress(evt) {
    var pinStyle = getComputedStyle(evt.currentTarget);
    var afterPinStyle = getComputedStyle(evt.currentTarget, '::after');

    var pinStyeLeft = parseInt(pinStyle.left, 10);
    var pinStyeTop = parseInt(pinStyle.top, 10);
    var pinStyeHeight = parseInt(pinStyle.height, 10);
    var afterPinStyeHeight = parseInt(afterPinStyle.borderTopWidth, 10);

    var mapPinMainX = pinStyeLeft;
    var mapPinMainY = pinStyeTop + (pinStyeHeight + afterPinStyeHeight) / 2;

    addressField.value = 'x: ' + mapPinMainX + ', y: ' + mapPinMainY;
    addressField.disabled = false;
    addressField.readOnly = true;
  }

  function locateNotice(evt) {
    activateNotice();
    insertPins();
    getAddress(evt);
    window.form.disabeledCapacityOptions();
    window.form.setPriceRange(typeSelectedValue);
  }


  window.form.initFields();
  mapPinMain.addEventListener('mouseup', function (evt) {
    locateNotice(evt);
  });
})();
