'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');


  function getAddress(evt) {
    var pinStyle = getComputedStyle(evt.currentTarget);
    var afterPinStyle = getComputedStyle(evt.currentTarget, '::after');

    var pinStyeLeft = parseInt(pinStyle.left, 10);
    var pinStyeTop = parseInt(pinStyle.top, 10);
    var pinStyeHeight = parseInt(pinStyle.height, 10);
    var afterPinStyeHeight = parseInt(afterPinStyle.borderTopWidth, 10);

    var mapPinMainX = pinStyeLeft;
    var mapPinMainY = pinStyeTop + (pinStyeHeight + afterPinStyeHeight) / 2;

    var address = 'x: ' + mapPinMainX + ', y: ' + mapPinMainY;
    return address;
  }

  window.map = {
    initialize: function () {
      mapPinMain.addEventListener('mouseup', function (evt) {
        map.classList.remove('map--faded');
        window.filter.sorting(window.backend.data);
        // var hotelList = window.filter.sortedHotels;
        window.map.insertPins();
        window.controller.placeNotice(evt, getAddress(evt));
        window.filter.active();
      });
    },

    insertPins: function () {
      window.map.removePins();
      var hotelList = window.filter.sortedHotels;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < hotelList.length; i++) {
        var pinForInsert = window.pin.renderPin(hotelList[i]);
        fragment.appendChild(pinForInsert);
        if (i === 4) {
          break;
        }
      }
      mapPins.appendChild(fragment);
    },

    removePins: function () {
      var mapPinsLength = mapPins.children.length;
      for (var p = mapPinsLength; p > 0; p--) {
        var pinClassList = mapPins.children[mapPinsLength - 1].classList.value;
        if (pinClassList === 'map__pin' || pinClassList === 'map__pin map__pin--active') {
          mapPins.children[mapPinsLength - 1].remove();
          mapPinsLength--;
        }
      }
    },

    mapFaded: function () {
      map.classList.add('map--faded');
    }

  };
})();
