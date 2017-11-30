Hotel'use strict';

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'flat',
  'house',
  'bungalo'
];

var FEATUES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

function getFeaturesList() {
  var featuresList = [];
  featuresList.length = Math.ceil(Math.random() * FEATUES_LIST.length);
  for (var i = 0; i < featuresList.length; i++) {
    featuresList[i] = FEATUES_LIST[Math.floor(Math.random() * FEATUES_LIST.length)];
  }
  return featuresList;
}

function renderHotel() {
  var hotel = {};
  hotel.author = 'img/avatars/user0' + Math.ceil(Math.random() * 8) + '.png';
  hotel.offer = {};
  hotel.location = {};
  hotel.location.x = Math.floor(300 + Math.random() * (900 + 1 - 300));
  hotel.location.y = Math.floor(100 + Math.random() * (500 + 1 - 100));
  hotel.offer.title = TITLES[Math.floor(Math.random() * TITLES.length)];
  hotel.offer.address = hotel.location.x + ', ' + hotel.location.y;
  hotel.offer.price = (Math.floor(10 + Math.random() * (10000 + 1 - 10))) * 100;
  hotel.offer.type = TYPES[Math.floor(Math.random() * TYPES.length)];
  hotel.offer.rooms = Math.ceil(Math.random() * 5);
  hotel.offer.guests = Math.ceil(Math.random() * 15);
  hotel.offer.checkin = CHECK_TIMES[Math.floor(Math.random() * CHECK_TIMES.length)];
  hotel.offer.checkout = CHECK_TIMES[Math.floor(Math.random() * CHECK_TIMES.length)];
  hotel.offer.feature = getFeaturesList();
  hotel.offer.description = '';
  hotel.offer.photos = [];
  return hotel;
}

function renderHotelList() {
  var hotelList = [];
  for (var i = 0; i < 8; i++) {
    hotelList[i] = renderHotel();
    for (var j = 0; j < i; j++) {
      if (hotelList[i].author === hotelList[j].author) {
        i--;
      }
    }
    console.log(hotelList[i].author);
  }
  return hotelList;
}

var map = document.querySelector('.map');
map.classList.remove('.map--fadded');

var mapPins = map.querySelector('.map__pins');
var mapPinButton = document.querySelector('.map__pin');

function getPins(hotel) {
  var similarHotel = mapPinButton.cloneNode(true);
  similarHotel.classList.remove('.map__pin--main');

  mapPinButton.setAttribute('style', 'left: ' + hotel.location.x + 'px;' + 'top: ' + hotel.location.y + 'px;');
  mapPinButton.querySelector('img').setAttribute('src', hotel.author);

  return similarHotel;
}

// console.log(mapPinButton);

var hotelList = renderHotelList();
console.log(hotelList);

var fragment = document.createDocumentFragment();
for (var i = 0; i < hotelList.length; i++) {
  fragment.appendChild(getPins(hotelList[i]));
}

mapPins.appendChild(fragment);
