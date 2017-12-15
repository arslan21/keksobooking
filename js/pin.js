'use strict'

var template = document.querySelector('template').content;
var templatePinButton = template.querySelector('.map__pin');
var buttonImage = templatePinButton.querySelector('img');
var templateCloseButton = template.querySelector('.popup__close');

function insertPins() {
  var mapPinsLength = mapPins.children.length;
  for (var p = mapPinsLength; p > 0; p--) {
    if (mapPins.children[mapPinsLength - 1].classList === 'map__pin' || mapPins.children[mapPinsLength - 1].classList === 'map__pin map__pin--active') {
      mapPins.children[mapPinsLength - 1].remove();
      mapPinsLength--;
    }
  }

  var fragment = document.createDocumentFragment();
  for (var l = 0; l < window.list.length; l++) {
    fragment.appendChild(renderPin(window.list[l]));
  }
  mapPins.appendChild(fragment);
}

function renderPin(hotel) {
  var mapPin = templatePinButton.cloneNode(true);
  mapPin.setAttribute('style', 'left: ' + (hotel.location.x - 3) + 'px;' + 'top: ' + (hotel.location.y - buttonImage.height) + 'px;');
  mapPin.querySelector('img').setAttribute('src', hotel.author.avatar);

  mapPin.addEventListener('click', function (evt) {
    activatePin(evt);
    getMapCard(hotel);
  });
  mapPin.addEventListener('keydown', function (evt) {
    util.isEnterEvent(evt, activatePin);
  });
  return mapPin;
}

function activatePin(evt) {
  var mapPinActive = map.querySelector('.map__pin--active');
  if (mapPinActive !== null) {
    mapPinActive.classList.remove('map__pin--active');
  }
  if (map.querySelector('.popup') !== null) {
    map.querySelector('.popup').remove();
  }

  evt.currentTarget.classList.add('map__pin--active');
}
